
import { Application, Router, send } from "@oak/oak";
import { GazBoltConfig, CompilerOption, RunnerPath } from './config.ts';

const router = new Router();

router.get("/", async (ctx) => {
  try {
    await send(ctx, "index.html", {
      root: "./static", // Directory where static files are located
    });
  } catch (_error) {
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error.";
  };
});

router.get("/compiler-options", (ctx) => {

  const generateOptions = (options: CompilerOption[]) => {
    return options
      .map((option) => `<option value="${option.value}">${option.label}</option>`)
      .join("\n");
  }
  ctx.response.status = 200;
  ctx.response.body = generateOptions(GazBoltConfig.compilers);
})

router.get("/static/:path+", async (ctx) => { 
  try {
    const filePath = ctx.params.path; // Dynamic part of the URL
    
    // ensure request file exists
    if (!filePath) {
      ctx.response.status = 404;
      ctx.response.body = "File Not Found";
      return;
    }
    await send(ctx, filePath, {
      root: "./static", // Directory where static files are located
    });
  } catch (_error) {
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error.";
  }
});

router.post("/run", async (ctx) => {
  
  try {
    const payload = await ctx.request.body.json();
    const program = payload["input-program"];
    const compiler = payload["compiler"];
    const compilerConfig = GazBoltConfig.compilers.find(c => c.value == compiler);

    console.log(compiler, program, RunnerPath);
  
    const command = new Deno.Command(RunnerPath, {
      args: [compilerConfig.configPath, "--exec", program]
    });
  
    const { stdout, stderr } = await command.output();

    console.log("STDOUT: ", new TextDecoder().decode(stdout));
    console.log("STDERR: ", new TextDecoder().decode(stderr));
    ctx.response.status = 200;
  } catch (_e) {
    ctx.response.status = 500; 
    ctx.response.body = "Internal Server Error.";
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running at http://localhost:8000");
app.listen({port: 8000});

