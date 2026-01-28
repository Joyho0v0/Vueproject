<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card" style="width: 100%">
        <div class="user">
          <img src="../assets/images/2.jpg" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>苏州</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 460px">
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table> -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="(v, k, index) in columnData"
            :key="index"
            :prop="k"
            :label="v"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥ {{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>

      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import axios from 'axios'
import { getData } from "../api";
import * as echarts from "echarts";
import axios from 'axios';
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      columnData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "goods",
          color: "#5ab1ef",
        },
      ],
    };
  },

  mounted() {
    axios.get("http://localhost:5000/server.php?a=users").then(
      (Response) => {
        console.log("请求成功", Response.data.data.column);
        this.tableData = Response.data.data.data;
        this.columnData = Response.data.data.column;
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );








    console.log(this.$store.state);
    getData().then(({ data }) => {
      const { tableData } = data.data;
      console.log(data.data);
      // this.tableData = tableData

      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      var echarts1Option = {};
      //基于准备好的DOM，初始化echarts实例

      //折线图
      //-------------------------------------------------------------------------------------------------------------
      const echarts1 = echarts.init(this.$refs.echarts1);
      (echarts1Option.xAxis = {
        data: ["一月", "二月", "三月", "四月", "五月", "六月"],
      }),
        (echarts1Option.yAxis = {});
      echarts1Option.legend = {
        data: xAxis,
      };
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      console.log(echarts1Option);
      // echarts1Option.xAxis = {
      //     data:xAxis
      // }
      // echarts1Option.legend = {
      //     data:xAxis
      // }
      // echarts1Option.yAxis = {}
      // echarts1Option.series = []
      // xAxis.forEach(key => {
      //     echarts1Option.series.push({
      //         name:key,
      //         data: orderData.data.map(item => item[key]),
      //         type: 'line'
      //     })
      // })

      // ----------------------------------------------------------------------------------------------------------------

      //柱状图
      //-----------------------------------------------------------------------------------------------------------------------
      var echarts2 = echarts.init(this.$refs.echarts2);
      // const { userData} = data.data
      // const xtitle = []
      // const xdata = []
      // const xnew = []
      // userData.forEach(item => {
      //     xtitle.push(item.date)
      //     xdata.push(item.active)
      // });
      // console.log(xdata)

      // const echarts2Option = {
      //     legend:{
      //         data:xtitle
      //     },
      //     xAxis:{
      //         data:xtitle
      //     },
      //     yAxis:{},
      //     series:{
      //         name:xtitle,
      //         type:'bar',
      //         data:xdata
      //     }
      // }
      const echarts2Option = {
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
          trigger: "axis",
        },
        xAxis: {
          type: "category", //类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };

      // -----------------------------------------------------------------------------------------------------------------------------------
      // 饼状图
      var echarts3 = echarts.init(this.$refs.echarts3);

      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };

      //处理数据xAxis
      echarts1.setOption(echarts1Option);
      echarts2.setOption(echarts2Option);
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

.user {
  margin-left: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo {
    padding: 20px;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}

.loginInfo {
  margin-left: 40px;
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      margin-left: 60px;
      color: #666;
    }
  }
  // padding:20px
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    // width: 80px;
    // height: 80px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin-top: 0;
    }

    // .price {
    //     font-size: 30px;
    //     margin-bottom: 12px;
    //     margin-top: 10px;
    //     line-height: 30px;
    //     height: 30px;
    // }

    .desc {
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>