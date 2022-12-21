const http = require('http')
const path = require('path')
const fs = require('fs')

// Create a server
const server = http.createServer((req, res) => { 
    // Make serving static content dynamic by building a dynamic file path
    const filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    )
    
    console.log('filePath', filePath)
    // Get the extension of the file
    const extName = path.extname(filePath)

    console.log('extName',extName)
    // Set the init content type for the headers
    let contentType = 'text/html'

    switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

    // Nothing added from switch 
    if (contentType == 'text/html' && extName == '') { 
        filePath += '.html'
    }


    console.log('updated filePath', filePath)

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Check if error is of type 404
            if (err.code === 'ENOENT') {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, content) => {
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end(content, "utf8");
                    })
            } else {
                //  Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    })
})



const PORT = process.env.PORT || 8080
server.listen(PORT, ()=> console.log(`Listening on port --> ${PORT}`))