const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const  http=require("http").createServer(app)

const PORT = process.env.PORT || 9000;

const viewpath = path.join(__dirname, "../Templet/views");
const publicPath = path.join(__dirname, "../Public");

app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", viewpath);

app.get("/", (req, resp) => {
  resp.render("index");
});


// soket 
const io=require("socket.io")(http)
io.on("connection",(socket)=>{
  console.log("connected....");

  socket.on("message",(msg)=>{
    // console.log(msg);
    socket.broadcast.emit("message",msg)

  })
})

http.listen(PORT, () => {
  console.log(`server is listing ${PORT}`);
});
