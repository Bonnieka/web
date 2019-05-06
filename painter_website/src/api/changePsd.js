import http from "./http.js"
import { Message } from 'element-ui'
import router from "@/router/index.js"

export default async function (params) {
    let {data} = await http.post('/users/change/',params);
    if (data == '1') {
        Message({
            message: "修改成功",
            type: 'success'
        })
        router.go(-1)
    } else {
        Message.error({
            message: "输入密码错误,请重新输入！"
        })
    }

}