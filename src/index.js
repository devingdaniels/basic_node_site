const http = require('http')
const path = require('path')
const fs = require('fs')


const PORT = process.env.PORT || 8080

// Create a server
const server = http.createServer((req, res) => { 
    if (req.url === '/') { 
        fs.readFile('public/index.html', (err, content) => { 
            if (err) {
                console.log(err)
                throw new Error(err)
            } else {
                // Set the headers
                res.writeHead(200, { 'Content-type': 'text/html' })
                // Send back the content
                res.end(content)
             }
        })
    }
})




server.listen(PORT, ()=> console.log(`Listening on port --> ${PORT}`))