/**
        Creates a basic API that returns two different time types depending on the endpoint        
**/            

 

 var http = require("http")
 var url = require("url")
 
 var server = http.createServer((req, res) => {
       var urlObj = url.parse(req.url, true)
       var date = new Date(urlObj.query.iso)
       //Check if client wants response in parse time format
       if (urlObj.pathname === "/api/parsetime") {
            var json = JSON.stringify({
                'hour': date.getHours(),
                'minute': date.getMinutes(),
                'second': date.getSeconds()
            })
            res.end(json)
       }
       //Check if client wants response in UTC format
       else if (urlObj.pathname === '/api/unixtime') {
           var json = JSON.stringify({'unixtime': date.getTime()})
           res.end(json)
       }
       else {
            res.writeHead(404)
            res.end(json)  
       }
 })
 
 server.listen((process.argv[2]))





/**
        Professional Solution        
**/     



    var http = require('http')
    var url = require('url')
    
    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }
    
    function unixtime (time) {
      return { unixtime: time.getTime() }
    }
    
    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result
    
      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))