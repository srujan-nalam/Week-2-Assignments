/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const { log } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000

app.get('/files', (req,res) => {
  const testFolder = './files/'

  fs.readdir(testFolder, (err, files) => {
    if(err){
      return res.status(500).send("files not found")
    }
    jsonString = JSON.stringify(files);
  
    return res.status(200).send(jsonString)
  });
  
})

app.get('/files/:id',(req,res)=>{
  const id = req.params.id;

  var text = fs.readFileSync(`./files/${id}`,'utf8')

  console.log(text);
  
  if(text){
    return res.status(200).send(text)
  }else{
    return res.status(404).send("text not found")
  }
  
})

app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
