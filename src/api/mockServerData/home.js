import Mock from 'mockjs'

//图表数据
let List = []
 
export default {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100~8000之间 保留小数 最小为0 最大0位
        for(let i = 0;i<7;i++){
            List.push(
                Mock.mock({
                    apple:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼状图
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: 'apple',
                        value: 1500
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1900
                    },
                    {
                        name: '魅族',
                        value: 2200
                    },
                    {
                        name: '三星',
                        value: 4500
                    },
                ],
                //柱状图
                userData:[
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 12,
                        active: 550
                    },
                    {
                        date: '周四',
                        new: 60,
                        active: 800
                    },
                    {
                        date: '周五',
                        new: 65,
                        active: 550
                    },
                    {
                        date: '周六',
                        new: 53,
                        active: 770
                    },
                    {
                        date: '周日',
                        new: 33,
                        active: 170
                    },
                ],
                //折线图
                orderData: {
                    date: ['20191001','20191002','20191003','20191004','20191005','20191006','20191007'],
                    data: List
                },
                tableData: [
                    {
                        name:'oppo',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy : 22000
                    },
                    {
                        name:'vivo',
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy : 24000
                    },
                    {
                        name:'apple',
                        todayBuy: 800,
                        monthBuy: 4500,
                        totalBuy : 65000
                    },
                    {
                        name:'小米',
                        todayBuy: 1200,
                        monthBuy: 6500,
                        totalBuy : 45000
                    },
                    {
                        name:'三星',
                        todayBuy: 300,
                        monthBuy: 2000,
                        totalBuy : 34000
                    },
                    {
                        name:'魅族',
                        todayBuy: 350,
                        monthBuy: 3000,
                        totalBuy : 22000
                    },
                ],
                // 柱状图配置
                user: {
                    legend: {
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    //提示框
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: {
                        type:'category',//类目轴
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333"
                        }
                    },
                    yAxis:[
                        {
                            type:"value",
                            axisLine: {
                                lineStyle: {
                                    color:"#17b3a3"
                                }
                            }
                        }
                    ],
                    color:["#2ec7c9","#b6a2de"],
                    series:[]
                },
                // 饼状图配置
                video: {
                    tooltip: {
                        trigger:"item"
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series:[]
                },
                operationFormLabel:[
                    {
                        model:'name',
                        label:'姓名',
                        type: 'input'
                    },
                    {
                        model:'age',
                        label:'年龄',
                        type: 'input'
                    },
                    {
                        model:'sex',
                        label:'性别',
                        type: 'select',
                        opts:[
                            {
                                label:"男",
                                value:1
                            },
                            {
                                label:"女",
                                value:0
                            }
                        ]
                    },
                    {
                        model:'birth',
                        label:"出生日期",
                        type:"date"
                    },
                    {
                        model:'address',
                        label:"地址",
                        type:"input"
                    },
                ]
            }
        }
    }
}