// Create web server that can accept any request to any path
// and respond with the word "Hello World!".
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (request, response) {
	var path = url.parse(request.url).pathname;
	console.log(path);
	if (path == "/comments.json") {
		fs.readFile("comments.json", function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/json'});
			response.write(data);
			response.end();
		});
	} else if (path == "/form.html") {
		fs.readFile("form.html", function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		});
	} else if (path == "/form.js") {
		fs.readFile("form.js", function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.write(data);
			response.end();
		});
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.write("404 Page Not Found");
		response.end();
	}
});

server.listen(8001);

// Path: form.js
// Create a web page that displays a form with a textarea.
// When the user types characters into the textarea, they should
// be saved as a list of strings in local storage.
// When the user refreshes the page, the contents of the textarea
// should be restored to the last saved state.
// (You can use JSON.stringify and JSON.parse to convert between
// strings and lists of strings.)
window.onload = function() {
	var commentList = JSON.parse(localStorage.getItem("comments"));
	if (commentList == null) {
		commentList = [];
	}
	var commentBox = document.getElementById("commentBox");
	var submitButton = document.getElementById("submitButton");
	var commentListElement = document.getElementById("commentList");
	for (var i = 0; i < commentList.length; i++) {
		var commentElement = document.createElement("li");
		commentElement.innerHTML = commentList[i];
		commentListElement.appendChild(commentElement);
	}
	submitButton.onclick = function() {
		commentList.push(commentBox.value);
		localStorage.setItem("comments", JSON.stringify(commentList));
		var commentElement = document.createElement("li");
		commentElement.innerHTML = comment
