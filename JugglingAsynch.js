/**
	A solution to the Juggling Asynch problem in the Learn You Node excercises. The code's function is to collect data from three seperate http transaction and then print the data when each transaction completes. 
	This is my first time actually using node and asynchronous programming, so I give myself a pad on the back :)
**/

var http = require("http")
var urls = process.argv.slice(2)
var answer = ""
var idNum = 0

//Create buckets
var answer0 = ""
var answer1 = ""
var answer2 = ""


for (var i=0; i < urls.length; i++) {
    http.get(urls[i], (response) => {
        response.uniqueID = idNum
        response.setEncoding('utf8')
        response.on("data", (chunk) => {
            //Sort chunks into their respective buckets.
            switch(response.uniqueID) {
                case 0:
                    answer0 += chunk
                    break
                case 1:
                    answer1 += chunk
                    break
                case 2:
                    answer2 += chunk
                    break
            }
        })
        response.on("end", () => {
            //Print each bucket after done sorting
            switch(response.uniqueID) {
                case 0:
                    console.log(answer0)
                    break
                case 1:
                    console.log(answer1)
                    break
                case 2:
                    console.log(answer2)
                    break
            }
        })
        idNum += 1
    })
}