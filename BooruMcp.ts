import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Request, Response } from "express";
import { GelbooruCaller } from "./GelbooruCaller";
import * as z from 'zod/v4';
import { ConfigLoader } from "./ConfigLoader";
const getServer = async () => {
    let config : any = new ConfigLoader();
    let gelbooruConfig = await config.retrieveConfiguration("gelbooru");
    const server = new McpServer({
        name: "simple-server",
        version: "1.0.0"
    });

    server.registerTool(
        'greet',
        {
            title: 'Returns a greeting',
            inputSchema: {
                name: z.string().describe('Name to include in greeting')
            }
        },
        async () => {
            return {content: [
                {
                    type: 'text',
                    text: 'heyaaaaa'
                }
            ]
        };
    }
    );

    server.registerTool(
        'call-gelbooru',
        {
            description: 'Make a call to gelbooru\'s API and fetch images',
            inputSchema: {
                tags: z.string().describe('List of tags to send to gelbooru for images delimited by a comma').default(""),
            }
        },
        async ({tags},extra) => {
            console.log(gelbooruConfig);
            let caller = new GelbooruCaller(gelbooruConfig);
            var response = (await caller.call(tags)).text();
            console.log((await response).toString);
            if(response){
                await caller.fetchImage((await response).toString());
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully reached gelbooru`
                    }
                ]
            };
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: `failed to hit gelbooru`
                    }
                ]
            };
        }
    );

    return server;
}

const app = createMcpExpressApp();

app.post('/mcp', async(req: Request, res: Response) => {
    const server = await getServer();
    try {
        const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({ sessionIdGenerator : undefined});
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);

        res.on('close', () => {
            transport.close();
            server.close();
        });
    } catch(error){
        console.error('Error handling MCP request', error);

    }
});

app.get('/mcp', async (req: Request, res: Response) => {
    console.log('Received GET MCP request');
    res.writeHead(405).end(
        JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32000,
                message: 'Method not allowed.'
            },
            id: null
        })
    );
});

const PORT = 4588;
app.listen(PORT, (error: any) => {
    if (error) console.error('error', error)
    console.log('listening');}
)