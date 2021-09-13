const express = require('express');
const path = require('path');
const fs = require('fs'); //
const { uuid } = require('uuidv4');
const { request } = require('http');
const app = express();

// const notes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf-8'));//turns json into object


const PORT = process.env.PORT || 3001;//setting up the port

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf-8'));//turns json into object

    res.json(notes)

})

app.post("/api/notes",(req,res)=>{
    console.log(req.body)
    const currentNotes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf-8',));
    console.log(currentNotes)
    // const newNote = req.body;
    const newNote = {  ...req.body, id: uuid()}
    currentNotes.push(newNote);
    console.log(currentNotes)

    const write = fs.writeFile(path.join(__dirname,'/db/db.json'), JSON.stringify(currentNotes, null, 2), err => {
        if (err) {
            console.log(err)
        }else {
            console.log('SUCCESS')
        }
    })
    res.json(write)
})

app.delete("/api/notes/:id",(req,res)=> {
    const currentNotes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf-8',));
    console.log(req.params)
    const newNotes = currentNotes.filter((item)=>{
        return item.id != req.params.id
    })
    const write = fs.writeFile(path.join(__dirname,'/db/db.json'), JSON.stringify(newNotes, null, 2), err => {
        if (err) {
            console.log(err)
        }else {
            console.log('SUCCESS')
        }
    })
    res.json(write)
})

app.listen(PORT, () => {
    console.log("listening to PORT 3001")
})