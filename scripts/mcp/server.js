import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import cors from 'cors';
import { execSync, exec } from 'child_process';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';
import { z } from 'zod';

const execAsync = promisify(exec);
const app = express();
app.use(cors());
app.use(express.json());

const server = new McpServer({
  name: 'hexastudio-server',
  version: '1.0.0'
});

server.tool('run-command', 'Execute a shell command on the server', { command: z.string() }, async ({ command }) => {
  try {
    const { stdout, stderr } = await execAsync(command, { timeout: 30000 });
    return { content: [{ type: 'text', text: stdout || stderr || 'Command executed successfully' }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('list-directory', 'List files in a directory', { path: z.string() }, async ({ path }) => {
  try {
    const files = readdirSync(path, { withFileTypes: true });
    const list = files.map(f => `${f.isDirectory() ? '[DIR]' : '[FILE]'} ${f.name}`).join('\n');
    return { content: [{ type: 'text', text: list || 'Empty directory' }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('read-file', 'Read contents of a file', { path: z.string() }, async ({ path }) => {
  try {
    const content = readFileSync(path, 'utf-8');
    return { content: [{ type: 'text', text: content }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('write-file', 'Write content to a file (creates directories if needed)', { 
  path: z.string(), 
  content: z.string() 
}, async ({ path, content }) => {
  try {
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, content, 'utf-8');
    return { content: [{ type: 'text', text: `File written successfully: ${path}` }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('edit-file', 'Replace text in a file', { 
  path: z.string(), 
  oldText: z.string(), 
  newText: z.string() 
}, async ({ path, oldText, newText }) => {
  try {
    if (!existsSync(path)) {
      return { content: [{ type: 'text', text: `Error: File not found: ${path}` }], isError: true };
    }
    let content = readFileSync(path, 'utf-8');
    if (!content.includes(oldText)) {
      return { content: [{ type: 'text', text: `Error: Text not found in file: ${path}` }], isError: true };
    }
    content = content.replace(oldText, newText);
    writeFileSync(path, content, 'utf-8');
    return { content: [{ type: 'text', text: `File edited successfully: ${path}` }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('docker-status', 'Get Docker containers status', {}, async () => {
  try {
    const { stdout } = await execAsync('docker ps -a --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"');
    return { content: [{ type: 'text', text: stdout }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('docker-compose', 'Run docker-compose command', { 
  action: z.enum(['up', 'down', 'restart', 'logs', 'ps']),
  service: z.string().optional()
}, async ({ action, service }) => {
  try {
    let cmd = `cd "${PROJECT_DIR}" && docker compose `;
    if (action === 'logs' && service) cmd += `logs -f ${service}`;
    else if (action === 'logs') cmd += 'logs -f --tail=50';
    else if (service) cmd += `${action} ${service}`;
    else cmd += action;
    
    const { stdout } = await execAsync(cmd, { timeout: 30000 });
    return { content: [{ type: 'text', text: stdout }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

server.tool('system-info', 'Get server system information', {}, async () => {
  try {
    const uptime = execSync('uptime -p').toString().trim();
    const disk = execSync('df -h / | tail -1').toString().trim();
    const mem = execSync('free -h | grep Mem').toString().trim();
    const cpu = execSync('nproc').toString().trim();
    return { content: [{ type: 'text', text: `Uptime: ${uptime}\nCPU Cores: ${cpu}\nMemory: ${mem}\nDisk: ${disk}` }] };
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
});

const transports = new Map();

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports.set(transport.sessionId, transport);
  res.on('close', () => transports.delete(transport.sessionId));
  await server.connect(transport);
});

app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports.get(sessionId);
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PROJECT_DIR = process.env.PROJECT_DIR || process.cwd();
const PORT = process.env.MCP_PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MCP Server running on http://0.0.0.0:${PORT}`);
  console.log(`Project directory: ${PROJECT_DIR}`);
});
