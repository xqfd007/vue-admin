let fs = require("fs");
const path = "./data/admin_permission.json";
let express = require("express");
let router = express.Router();

// 添加
router.post("/students/new", function(req, res) {
  save(req.body, function(err) {
    if (err) {
      return res.status(500).send("添加学生失败");
    }
  });
  res.send({ code: 0 });
});

const save = (student, callback) => {
  fs.readFile(path, "utf8", function(err, dataa) {
    if (err) {
      return callback(err);
    }
    let students = JSON.parse(dataa).data;
    const menuList = [
      {
        name: student.menuname,
        icon: student.menuicon,
        url: student.menuurl,
      },
    ];
    student["menuList"] = menuList;
    students.push(student);

    let stuObj = {
      data: students,
      code: 0,
      message: "获取权限数据成功",
    };
    let ret = JSON.stringify(stuObj);
    //写入数据
    fs.writeFile(path, ret, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
module.exports = router;
