const { json } = require("express");

let data = [];

const handleCreate = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log(body);
    let item = JSON.parse(body);
    data.push(item);

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "created" }));
  });
};

const handeleReade = (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(data));
};

const handleUpdate = (req, res, requestURL) => {
  const id = requestURL.pathname.split("/")[2];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const updatedData = JSON.parse(body);

    let flag = false;

    data = data.map((item) => {
      if (item[id]) {
        flag = true;
        return { ...item, ...updatedData };
      }

      return item;
    });
    if (flag) {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(updatedData));
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "not updated" }));
    }
  });
};

const handleDelete = (req, res, parsedURL) => {
  const id = parsedURL.pathname.split("/")[2];

  let flag = false;
  data = data.map((item) => {
    if (item[id]) {
      delete item[id];
      flag = true;
      return item;
    }
    return item;
  });
  if (flag) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "deleted" }));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "not deleted" }));
  }
};

module.exports = {
  handeleReade,
  handleCreate,
  handleDelete,
  handleUpdate,
};
