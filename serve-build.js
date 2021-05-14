const http = require('http');
const path = require('path');
const fs = require('fs');

const basePath = '/web-showcase';
const buildDir = '/build';

const server = http.createServer(function (request, response) {
  if (request.url.startsWith(basePath)) {
    const url = request.url.substring(basePath.length);

    console.info('url: ', request.url);

    const urlPath = isFile(url)
      ? path.join(__dirname, buildDir, url)
      : path.join(__dirname, buildDir, '/index.html');

    fs.createReadStream(urlPath).pipe(response);
  }
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});

function isFile(pathname) {
  return pathname.split('/').pop().indexOf('.') > -1;
}
