var http = require("http")

var server = http.createServer((req, res) => {
       //If request has POST method
       if (req.method === "POST") {
              var body = []
              req.on("data", (chunk) => {
                     //Push each chunk to array 
                     body.push(chunk)
              })
              req.on("end", () => {
                     body = Buffer.concat(body).toString().toUpperCase()
                     res.end(body)
              })
       }
})

server.listen(process.argv[2])




Professional Implementation

    var http = require('http')
    var map = require('through2-map')
    
    var server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }
    
      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))