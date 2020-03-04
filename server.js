const express = require("express");
const path = require("path"); 
const notes = require ("notes"); 


// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3100;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML Routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/notes.html" ));
}); 

// API Get Route

  app.get("/api/notes", function(req, res) {
  return res.json(notes);
});



// API POST Routes

app.post("/api/notes", function(req, res) {

   const newNote = req.body.newNote; 

    notes.push(newNote); 

    return res.json(newNote); 

}); 
  


//  API Delete Route

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
}); 

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));



