import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const html = await readFile(path.join(__dirname, 'public', 'index.html'));

const server = http.createServer((req,res)=>{
  if(req.url === '/healthz'){
    res.writeHead(200, {'content-type':'application/json; charset=utf-8'});
    return res.end(JSON.stringify({ok:true,service:'DANVORA Public Preview'}));
  }
  res.writeHead(200, {
    'content-type':'text/html; charset=utf-8',
    'cache-control':'no-store',
    'x-content-type-options':'nosniff',
    'referrer-policy':'strict-origin-when-cross-origin'
  });
  res.end(html);
});

server.listen(PORT,'0.0.0.0',()=>console.log(`DANVORA listening on ${PORT}`));
