# Booru MCP 
This is an MCP server that invokes a set of Callers to various Boorus to retrieve anime images given a set of tags. Currently it works with Gelbooru.


## Requirements
- Bun atleast V1.3.4
- [modelcontextprotocol's typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk/tree/v1.x) make sure to grab the v1.x branch. This is for running the MCP 
- an API key and user id at the booru that you will want to use
## How to use
- Update 'booruConfigs.json' and add the API key and user ID for the booru that you will be using. 
- Start up the MCP server with `bun run BooruMcp.ts`
- Connect the MCP server to your local AI platform of choice, I was using LM studio.
  [![Add MCP Server booru-caller to LM Studio](https://files.lmstudio.ai/deeplink/mcp-install-light.svg)](https://lmstudio.ai/install-mcp?name=booru-caller&config=eyJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjQ1ODgifQ%3D%3D)
- From your LLM platform, ask the LLM to fetch an image from the booru, give it some tags delimited by a comma for the kind of image you want to find, ex: `'princess_connect!,swimsuit,blonde_hair'`, you MUST follow the search standards that all boorus expect.
- Wait for the LLM to reach out to the MCP server, if everything is successful, you will get back a 'success' message from the AI, and the MCP server will have saved the image in the project's root.

This project was created using `bun init` in bun v1.3.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
