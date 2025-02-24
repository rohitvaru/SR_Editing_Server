const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// set view engine
app.set('view engine', 'ejs'); // set view engine to ejs
// set views directory
// console.log(path.join(__dirname, 'public'));


app.get('/', (req, res) => {
  fs.readdir("./files", (err, files) => {
    console.log(files.length);
    res.render('index', { files });
  });
});
app.get('/profile/:username', (req, res) => {
  console.log(req.params.username);
  res.send(`${req.params.username}`);

});
app.get('/file/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
    console.log(data);
    res.render('file', { fileName: req.params.filename, fileData: data });
  });
});
app.post("/create", (req, res) => {
  console.log(req.body)
  fs.writeFile(`./files/${req.body.tittle.split(" ").join("")}.txt`, req.body.description, (err) => {
    res.redirect("/");
  });

});

app.post("/edit/:fileName", (req, res) => {
  if (fs.existsSync('./files/' + req.params.fileName)) {
      console.log(req.body);
      if (req.body.newName != req.params.fileName) {
        fs.rename(`./files/${req.params.fileName}`, `./files/${req.body.newName}`, (err) => {
          console.log(err);
        });
        fs.writeFile(`./files/${req.body.newName}`, req.body.description, (err) => {
          res.redirect("/");
          return;
        });
      } else {
        fs.writeFile(`./files/${req.params.fileName}`, req.body.description, (err) => {
          res.redirect("/");
        });
      }
  } else {
    res.send("File not found");
  }
});
app.post("/file/:filename", (req, res) => {
  fs.writeFile(`./files/${req.body.tittle.split(" ").join("")}.cpp`, req.body.description, (err) => {
    res.redirect("/");
  });
});


app.get('/edit/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
    console.log(data);
    res.render('edit', { fileName: req.params.filename, fileData: data });
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});