import http from "@/utils/httpRequest";
import { getToken } from "@/utils/auth";
import Qs from "qs";
/* 登录 */
export function login(user) {
  return http.get("/dev-api/login?user=" + user);
}
/* 菜单列表 */
export function fetchPermission() {
  return http.get("/dev-api/permission?user=" + getToken());
}
/* 退出登录 */
export function logout() {
  return http.get("/dev-api/logout");
}
/* 新增目录菜单 */
export function addmenu(data) {
  return http.post("dev-api/students/new", data);
}
