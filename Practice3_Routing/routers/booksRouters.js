import { Router } from "express";
import fs from "fs";

const router = Router();

let data = fs.readFileSync("data.json");
data = JSON.parse(data);
let dataBooks = data.books;

router.get("/", (req, res) => {
  try {
    res.send(dataBooks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const book = dataBooks.find((book) => book.id == id);
    res.status(200).send(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req, res) => {
  try {
    const book = req.body;
    dataBooks.push(book);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(201).send(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const book = req.body;
    dataBooks = dataBooks.map((item) => {
      if (item.id == id) {
        item = book;
      }
      console.log(item);
      return item;
    });
    data.books = dataBooks;
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    dataBooks = dataBooks.filter((book) => book.id != id);
    data.books = dataBooks;
    fs.writeFileSync("data.json", JSON.stringify(data));
    res.status(200).send(dataBooks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
