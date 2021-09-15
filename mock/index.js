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

var allowCors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
app.use(allowCors);

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

app.listen(3333, () => {
  console.log("服务器运行在3333");
});
