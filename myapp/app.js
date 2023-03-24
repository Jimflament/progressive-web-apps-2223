// import routie pages
const Handlebars = require('handlebars');
const source = '<h1>{{title}}</h1><p>{{description}}</p>';
const template = Handlebars.compile(source);
const data = {
  title: 'Welcome to my website!',
  description: 'This is a sample page generated using Handlebars.'
};
const html = template(data);

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});