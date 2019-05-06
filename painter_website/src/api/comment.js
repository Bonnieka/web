import http from "./http.js"
import { Message } from 'element-ui'
import router from "@/router/index.js"

//查询全部评论
export async function comment_all(params) {
    let { data } = await http.post('/comment',params);
    return data;
}

//删除评论
export async function comment_delete(params) {
    let { data } = await http.post('/comment/delete',params);
    if (data == '1') {
        Message({
            message: "删除成功",
            type: 'success'
        })
        return '1'
    } else {
        Message.error({
            message: "删除失败！"
        })
        return '0'
    }
}

//删除作品的全部评论
export async function comment_delete_all(params) {
    let { data } = await http.post('/comment/deleteAll',params);
    if (data == '1') {
        return '1'
    } else {
        return '0'
    }
}

//增加作品评论
export async function comment_add(params) {
    let {data} = await http.post('/comment/add',params);
    if (data != '0') {
        Message({
            message: "评论成功！",
            type: 'success'
        })
        return data
    } else {
        Message.error({
            message: "评论失败！"
        })
        return '0'
    }
}