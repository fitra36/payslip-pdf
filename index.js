const fs = require("fs");
const http = require("http");
const pdf = require("html-pdf");
const tmpl = fs.readFileSync(require.resolve("./template.html"), "utf8");

const server = http.createServer(function (req, res) {
  if (req.url === "/favicon.ico") return res.end("404");
  // Do replacement here or use handlebars
  const html = tmpl;

  pdf
    .create(html, {
      width: "595px",
      height: "842px",
      header: {
        height: "68px",
      },
      footer: {
        height: "111px",
      },
    })
    .toStream((err, stream) => {
      if (err) return res.end(err.stack);
      res.setHeader("Content-type", "application/pdf");
      stream.pipe(res);
    });
});

server.listen(8080, function (err) {
  if (err) throw err;
  console.log("Listening on http://localhost:%s", server.address().port);
});
