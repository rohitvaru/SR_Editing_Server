// const fs = require('node:fs');
const http = require('http');


//------------------------------- FS Module -------------------------------
// Create a file
// fs.appendFile('./public/message.txt', 'Hello Node.js I am Rohit Varu', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

// Delete a file
// fs.unlink('cors.config.js', (err) => {
//   if (err) throw err;
//   console.log('The file has been deleted!');
// });

// Remove Folder that contains files
// fs.rm('views', { recursive: true }, (err) => {
//   if (err) throw err;
//   console.log('Folder Deleted!');
// });
//------------------------------- FS Module End -------------------------------
//------------------------------- HTTP Module -------------------------------
// Create a server
const server = http.createServer(function(req,res){
  res.end('Hello World!');
  console.log('Server is running on port 3000');
})

server.listen(3000)
