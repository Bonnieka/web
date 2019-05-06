import http from "./http.js"
import { Message } from 'element-ui'
import router from "@/router/index.js"

export async function worksAdd(params) {
    let {data} = await http.post('/works/add',params);
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

//查询作品
export async function work_select(params) {
    let { data } = await http.post('/works',params);
    return data;
}

//查询首页需要展示的作品
export async function work_home_show(params) {
    let { data } = await http.post('/works/home_show');
    return data;
}

// 按id查询作品
export async function work_select_id(params) {
    let { data } = await http.post('/works/id',params);
    return data[0];
}


//保存编辑
export async function work_edit(params) {
    let { data } = await http.post('/works/edit',params);
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


//删除图片
export async function delete_pic(params) {
    let { data } = await http.post('/works/delete_pic',params);
    if (data == '1') {
        Message({
            message: "删除成功",
            type: 'success'
        })
    }else if(data == '0'){
        Message.error({
            message: "删除失败！"
        })
    }
}

//删除作品
export async function delete_work(params) {
    let { data } = await http.post('/works/delete',params);
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
