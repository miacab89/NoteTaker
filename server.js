const express = require("express");
const path = require("path"); 
const fs = require ("fs");
const PORT = process.env.PORT || 3200;
let app = express();
let db = require("./db/db.json"); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let dbNotes = JSON.parse;
   
  fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => { 
      dbNotes = JSON.parse(data);
       if (err) 
       throw err;
   });
   


const dbUpdate = dbNotes => {
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(dbNotes),
        err => { 
          if (err) throw err}
    );
    };

// these first app.get requests are for the html pages
app.get("/assets:css/style.css", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets.css/style.css"));
  });
  
  app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
  });


// HTML Routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html" ));
}); 

// API Get Route
app.get("/api/notes", function(req, res) { 
  console.log(req); 
  console.log(db);
  return res.json(db);
});

// API POST Routes


app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  let id = dbNotes.length;
  newNote.id = id + 1;

  console.log(id); 
  console.log(newNote); 
  console.log(dbNotes);
  console.log(db);
  db.push(newNote);

  dbUpdate(dbNotes);
  return res.json(dbNotes);
}); 



//  API Delete Route

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;
  let x = 1;
  delete dbNotes[id - 1];
  dbUpdate(dbNotes);
  res.send(dbNotes);
}); 

// Start the server on the port
app.listen(PORT, function() {
  console.log("http://localhost:" + PORT);
  });

