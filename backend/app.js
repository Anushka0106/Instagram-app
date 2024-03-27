// const http = require('http');
// //import http by using require keyword
// // three types of modules file based modules,build in modules, third party modules
// const server = http.createServer((req,res)=>{
//     console.log("Server is created");
//     res.end("hello ");
// });
// server .listen(5000,"localhost",()=>{
//     console.log("Server is running on 5000");
// });

const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const {mongoUrl} = require("./Keys");
const cors = require('cors');
app.use(cors())


require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
