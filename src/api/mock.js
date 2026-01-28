import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from './mockServerData/permission'

//定义mock的请求拦截
// Mock.mock('/api/home/getData','get',function(){
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return []
// })

Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

//用户列表数据
Mock.mock('/api/user/add','post', user.creatUser)
Mock.mock('/api/user/edit','post', user.updateUser)
Mock.mock('/api/user/del','post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)

