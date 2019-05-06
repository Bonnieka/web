import http from "./http.js"
import { Message } from 'element-ui'
import router from "@/router/index.js"

export async function newsAdd(params) {
    let {data} = await http.post('/news/add',params);
    if (data == '1') {
        Message({
            message: "添加成功",
            type: 'success'
        })
        router.go(-1);
    } else {
        Message.error({
            message: "添加失败！"
        })
    }
}



//查询新闻
export async function news_select(params) {
    let { data } = await http.post('/news/',params);
    return data;
}

// 按id查询新闻
export async function news_select_id(params) {
    let { data } = await http.post('/news/id',params);
    return data[0];
}

//删除作品
export async function delete_news(params) {
    let { data } = await http.post('/news/delete',params);
    if (data == 1) {
        Message({
            message: "删除成功",
            type: 'success'
        })
        return 1;
    } else {
        Message.error({
            message: "删除失败！"
        })
        return 0;
    }
}

//编辑新闻
export async function news_edit(params) {
    let { data } = await http.post('/news/edit',params);
    if (data == '1') {
        Message({
            message: "编辑成功",
            type: 'success'
        })
        router.go(-1);
    } else {
        Message.error({
            message: "编辑失败！"
        })
    }
}