const express = require("express");
let router = require("./router");
let bodyParser = require("body-parser");
const app = express();
const vipLogin = require("./data/vip_login.json");
const adminLogin = require("./data/admin_login.json");
const adminPermission = require("./data/admin_permission.json");
const vipPermission = require("./data/vip_permission.json");
const allLogout = require("./data/logout.json");
const url = require("url");

app.get("/login", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(adminLogin);
  } else {
    res.send(vipLogin);
  }
});
app.get("/permission", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(adminPermission);
  } else {
    res.send(vipPermission);
  }
});
app.get("/logout", (req, res) => {
  res.send(allLogout);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(3300, () => {
  console.log("服务器运行在3300");
});
