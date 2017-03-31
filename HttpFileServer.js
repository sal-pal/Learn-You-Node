/**
		Retrieves file from fs and serves the file
**/ 

var http = require("http")
 var fs = require("fs")
 
//Create file stream from object passed as second command line argument
var fileStream = fs.createReadStream(process.argv[3])
 
 var idNum = 0
 var server = http.createServer((req, res) => {
     	// Sends file stream to destination
          fileStream.pipe(res)
        
	// As new chunks arrive write them to the response stream
	  fileStream.on('data', (chunk) => res.write(chunk))
         
	//When all chunks are written to response stream, close the connection along with the server
	  fileStream.on("end", () => {
               res.end()
		server.close()
          }) 
  
 })
 
 server.listen(process.argv[2])