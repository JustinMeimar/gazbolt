
import { serve } from "https://deno.land/std@0.205.0/http/server.ts";

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    try {
      console.log("Serving index.html...");
      const html = await Deno.readTextFile("./static/index.html");
      console.log("File read successfully.");
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    } catch (error) {
      console.error("Failed to read index.html:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  if (url.pathname === "/static/client.js" && request.method === "GET") {
    try {
      console.log("Serving client.js...");
      const js = await Deno.readTextFile("./static/client.js");
      return new Response(js, {
        headers: { "Content-Type": "application/javascript" },
      });
    } catch (error) {
      console.error("Failed to read client.js:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  if (request.method === "POST" && url.pathname === "/run") {
    console.log(request) 
    console.log(request.body) 
    const json = await request.json();
    const inputProgram = json["input-textarea"];
    const result = `Processed program:\n${inputProgram}`;

    return new Response(result, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Not Found", { status: 404 });
};

console.log("Server is running at http://localhost:8000");
serve(handler);

