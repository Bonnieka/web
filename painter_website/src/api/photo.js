import http from "./http.js"
import { Message } from 'element-ui'
import router from "@/router/index.js"

// 添加照片
export async function photoAdd(params) {
    let {data} = await http.post('/photo/add',params);
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

//删除图片
export async function delete_pic(params) {
    let { data } = await http.post('/photo/delete_pic',params);
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

//查询相册图片
export async function photo_select(params) {
    let { data } = await http.post('/photo',params);
    return data;
}


//删除相片
export async function delete_photo(params) {
    let { data } = await http.post('/photo/delete',params);
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

// 按id查询作品
export async function photo_select_id(params) {
    let { data } = await http.post('/photo/id',params);
    return data[0];
}

//保存编辑
export async function photo_edit(params) {
    let { data } = await http.post('/photo/edit',params);
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