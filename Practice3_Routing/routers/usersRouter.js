import { Router } from "express";
import fs from "fs";

const router = Router();

let data = fs.readFileSync("data.json", "utf-8");
data = JSON.parse(data);
let usersData = data.users;

router.get("/", (req, res) => {
  try {
    res.send(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = usersData.find((user) => user.id == id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req, res) => {
  try {
    const user = req.body;
    usersData.push(user);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    usersData = usersData.map((item) => {
      if (item.id == id) {
        item = user;
      }
      return item;
    });
    data.users = usersData;
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    usersData = usersData.filter((user) => user.id != id);
    data.users = usersData;
    fs.writeFileSync("data.json", JSON.stringify(data));
    res.status(200).send(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
