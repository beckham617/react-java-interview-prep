const http = require("http");

function renderHomePage(data) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>SSR Example</title>
        </head>
        <body>
          <h1>Welcome!</h1>
          <p>This content is pre-rendered on the server.</p>
          <p>Data from server: ${JSON.stringify(data)}</p>
        </body>
        </html>
      `;
}

const server = http.createServer((req, res) => {
  const data = { message: "Hello from the server!" };
  const htmlContent = renderHomePage(data);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(htmlContent);
  res.end();
});

server.listen(5174, () => console.log("Server listening on port 5174"));