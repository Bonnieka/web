import http from "./http.js"
import { Message } from 'element-ui'
import md5 from "md5"
import router from "@/router/index.js"

export default async function (params) {
    let {data} = await http.post('/users/login',params);
    if (data == '1') {
        sessionStorage.setItem("login",md5("access"));
        Message({
            message: "登录成功",
            type: 'success'
        })
        router.push("/admin/home")
    } else {
        Message.error({
            message: "账号或者密码错误,请重新输入！"
        })
    }

}