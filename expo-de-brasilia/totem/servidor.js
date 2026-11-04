// Servidor local do totem: serve a pasta build/ sem internet e sem dependências.
// Uso: node totem/servidor.js [porta]
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORTA = Number(process.argv[2] || process.env.PORT || 3000);
const RAIZ = path.resolve(__dirname, '..', 'build');

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.map': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

if (!fs.existsSync(path.join(RAIZ, 'index.html'))) {
  console.error('[ERRO] Pasta build/ não encontrada. Rode "npm run build" antes.');
  process.exit(1);
}

function enviar(res, arquivo, req) {
  fs.stat(arquivo, (err, st) => {
    if (err || !st.isFile()) return enviar(res, path.join(RAIZ, 'index.html'), req); // SPA
    const tipo = TIPOS[path.extname(arquivo).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;                        // vídeos precisam de Range
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
      const ini = m[1] ? Number(m[1]) : 0;
      const fim = m[2] ? Number(m[2]) : st.size - 1;
      res.writeHead(206, { 'Content-Type': tipo, 'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${ini}-${fim}/${st.size}`, 'Content-Length': fim - ini + 1 });
      return fs.createReadStream(arquivo, { start: ini, end: fim }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': st.size, 'Accept-Ranges': 'bytes',
      'Cache-Control': arquivo.includes(`${path.sep}static${path.sep}`) ? 'max-age=31536000' : 'no-cache' });
    fs.createReadStream(arquivo).pipe(res);
  });
}

http.createServer((req, res) => {
  let caminho;
  try { caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400); return res.end(); }
  const arquivo = path.join(RAIZ, path.normalize(caminho));
  if (!arquivo.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
  enviar(res, arquivo, req);
}).listen(PORTA, '127.0.0.1', () => {
  console.log(`Totem servindo ${RAIZ} em http://localhost:${PORTA}`);
});
