const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const serverWrite = (file,contentType) =>{
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

switch(page){
  case '/':
    serverWrite("index.html","text/html");
    break;

  case '/otherpage':
    serverWrite('otherpage.html','text/html');
    break;

  case '/otherotherpage':
    serverWrite('otherotherpage.html','text/html');
    break;

  case '/api':
    let flipResult =  "Type 'flip' in the input box",
        chooseFlip = "heads",
        flipComp = "";
    if(params["student"] == "flip"){
      flipResult = Math.random() <= .5 ? "heads" : "tails";
      if(flipResult == chooseFlip){
          flipComp = "You win";
      }else{
          flipComp = "You Lose";
      }
    } 
    else if(params["student"] == "heads" || params["student"] == "tails"){
      flipResult = Math.random() <= .5 ? "heads" : "tails";
      chooseFlip = params["student"];
      if(flipResult == chooseFlip){
        flipComp = "You win";
      }else{
        flipComp = "You lose";
      }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        flipResult: flipResult,
        chooseFlip: chooseFlip,
        flipComp: flipComp
      }
      res.end(JSON.stringify(objToJson));
    break;

  case '/css/style.css':
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
    break;

  case '/js/main.js':
    serverWrite('js/main.js','javascript');
    break;

  default:
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
    break;          
}
});

server.listen(8000);
