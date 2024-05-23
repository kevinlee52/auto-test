const express = require('express');
const app = express();

const port = 9000;


app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello Express /");
})

app.post("/", (req, res)=>{
    console.log(`request body: `, req.body);
    res.status(201).send();
})

app.listen(port, ()=>{
    console.log(`Express server listening at http://localhost:${port}`);
})

