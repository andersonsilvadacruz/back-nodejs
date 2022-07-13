const cors = require("cors")
require("./db/db");
const express = require("express");
require("dotenv").config();
const isAuth= require("./utils/isAhut");


const server = express();
//puedo pasar a cors la url de react para q sea de consumo exclusivo
server.use(cors())
//const port = process.env.PORT || 3000

//datos en formato json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//endpiont principal
server.get("/", (_req, res) => {
  res.send(" <h1>       API BRACK EN NODE  (login de usuarin con registro y un crud de posts protegido)</h1>");
});

server.use("/posts",isAuth, require("./posts/postsRoute"));

server.use("/customers", require("./customers/routeCustomers"));


server.get("*", (_req, res) => {
  res.send("RECURSO NO ENCONTRADO");
});


//manejor de errores NEXT
server.use((error, _req, res, _next) => {
  if (!error.status) {
    error.status = 500;
  }
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});

server.listen(process.env.PORT)
