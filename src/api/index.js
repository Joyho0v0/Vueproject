import http from '../utils/request'

//定义请求首页数据接口
export const getData = () => {
    // 返回一个Promise对象
    return http.get('/home/getData')
} 

export const getUser = (params) => {
    return http.get('/user/getUser',params)
}

export const addUser = (data) => {
    return http.post('/user/add',data)
}

export const editUser = (data) => {
    return http.get('/user/edit',data)
}

export const delUser = (data) => {
    return http.get('/user/del',data)
}

export const getMenu = (data)=> {
    return http.post('/permission/getMenu',data)
}