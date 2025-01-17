/// file: main.ts
/// desc: routes for the Gazbolt backend

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

router.get("/program-defaults", async (ctx) => {
  
  try {

    const selectedCompiler = ctx.request.url.searchParams.get("cc");  
    const compilerConfig = GazBoltConfig.compilers.find(config => (config.value === selectedCompiler));
    
    if (!compilerConfig || !selectedCompiler) {
      ctx.response.status = 404;
      return;
    }

    const read_prog = async (path: string): Promise<string> => {
      return await Deno.readTextFile(path);
    };

    const format_path = (path: string): string => {
      const sanitizedPath = path.replace(/[\n\t\r]/g, "");
      return sanitizedPath.split("/").pop() || sanitizedPath;
    };
  
    const options = await Promise.all(
      compilerConfig.default_programs.map(async (path: string) => {
	const content = await read_prog(path);
	const safeContent = content
	  .replace(/&/g, "&amp;")
	  .replace(/"/g, "&quot;")
	  .replace(/</g, "&lt;")
	  .replace(/>/g, "&gt;");
	const safePath = format_path(path);
	return `<option value="${safeContent}">${safePath}</option>`;
      })
    );

    ctx.response.status = 200;
    ctx.response.body = options.join("\n");

  } catch (_error) {
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error.";
  }
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
  console.log("Hello ");
  
  // try {
    console.log("Received run: body: ", ctx.request.body);
    const payload = await ctx.request.body.json();
    console.log("Received run: body: ", payload);
  //   const program = payload["input-program"];
  //   const compiler = payload["compiler"];
  //   const compilerConfig: CompilerOption | undefined
	 //      = GazBoltConfig.compilers.find(c => c.value == compiler);
  // 
  //   if (compilerConfig === undefined) {
  //     /// bad
  //     return 
  //   }
  //
  //   console.log(compiler, program, RunnerPath);
  // 
  //   const command = new Deno.Command(RunnerPath, {
  //     args: [compilerConfig.configPath, "--exec", program]
  //   });
  // 
  //   const { stdout, stderr } = await command.output();
  //
  //   console.log("STDOUT: ", new TextDecoder().decode(stdout));
  //   console.log("STDERR: ", new TextDecoder().decode(stderr));
    ctx.response.status = 200;
  // } catch (_e) {
  //   ctx.response.status = 500; 
  //   ctx.response.body = "Internal Server Error.";
  // }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running at http://localhost:8001");
app.listen({port: 8001});

