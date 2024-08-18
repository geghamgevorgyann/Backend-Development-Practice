import express from "express";
import fs from "fs";

import  usersRouter  from "./routers/usersRouter.js";
import  booksRouter  from "./routers/booksRouters.js";


  const app = express();

  app.use(express.json());

  app.use("/users", usersRouter);
  app.use("/books", booksRouter);

  console.log("Hello World!");
  
  app.get("/", (req, res) => {
    let data = fs.readFileSync("data.json", "utf-8");
    data = JSON.parse(data);
    res.send(data);
  });

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
