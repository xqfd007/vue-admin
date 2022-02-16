<template>
  <div>
    <div
      id="container"
      style=" width:500px;height: 500px;margin-top: 80px;margin-left: 50px;"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'user',
  data() {
    return {
      lian: {
        name: '全部节点',
        children: [
          {
            name: '000',

            children: [{ name: 'd', children: [{ name: 'ds' }] }],
          },
          {
            name: '103',
          },
          {
            name: '800',
          },
          {
            name: '801',
          },
          {
            name: '803',
          },
          {
            name: '809',
          },
          {
            name: '810',
          },
          {
            name: '812',
          },
          {
            name: '816',
          },
          {
            name: '817',
          },
          {
            name: '818',
          },
          {
            name: '832',
          },
          {
            name: '861',
          },
          {
            name: '866',
          },
          {
            name: 'app2',
          },
          {
            name: 'dubbo',
          },
          {
            name: 'hsjry',
          },
          {
            name: 'hundsun',
          },
          {
            name: 'ibus-service',
          },
          {
            name: 'remoteconfig',
          },
          {
            name: 'testpassapiil',
          },
        ],
      },
      myChart: null,
      clickF: true,
    }
  },

  methods: {
    changdate(arr, nodeName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == nodeName) {
          arr[i].children = arr[i].children ? arr[i].children : []
          // arr[i].children.push({ name: Date.now() })
          arr[i].children = [{ name: Date.now() }]
          // arr[i].hasChild = arr[i].hasChild ? !arr[i].hasChild : true
          break
        } else if (arr[i].children && arr[i].children.length > 0) {
          this.changdate(arr[i].children, nodeName)
        }
      }
      return arr
    },
    initTree() {
      var dom = document.getElementById('container')
      this.myChart = echarts.init(dom)
      this.myChart.on('click', this.clickFun)
      this.myChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        title: {
          text: '节点结构图',
        },
        series: [
          {
            type: 'tree',
            data: [this.lian],
            // top: '8%',
            // bottom: '14%',
            layout: 'radial',
            symbol: 'emptyCircle',
            symbolSize: 9,
            initialTreeDepth: 3,
            animationDurationUpdate: 750,
            emphasis: {
              focus: 'descendant',
            },
          },
        ],
      })
    },
    clickFun(param) {
      console.log('@@', param.data.hasChild)
      if (param.data.hasChild) {
        console.log('return')
        if (param.data.collapsed == undefined || param.data.collapsed == true) {
          console.log('未定义或者是未展开，下次即将展开')
          param.data.collapsed = false
        } else {
          console.log('下次不展开')
          param.data.collapsed = true
        }
        return
      }
      param.data.hasChild = true
      param.data.collapsed = false
      // this.myChart.clear()
      let data = this.myChart.getOption().series[0].data
      this.lian.children = this.changdate(data[0].children, param.data.name)
      console.log(this.lian.children)
      // this.lian.children = this.changdate(this.lian.children, param.data.name)

      // if (!param.data.hasChild) {
      //   //param.data.collapsed=true;
      //   console.log('fff')
      //   if (param.data.collapsed == undefined || param.data.collapsed == true) {
      //     console.log('未定义或者是未展开，下次即将展开')
      //     param.data.collapsed = false
      //   } else {
      //     console.log('下次不展开')
      //     param.data.collapsed = true
      //   }
      //   return
      // }
      // param.data.hasChild = true
      // param.data.collapsed = false
      // let data = this.myChart.getOption().series[0].data
      // this.lian.children = this.changdate(data[0].children, param.data.name)

      this.$nextTick(() => {
        this.myChart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          title: {
            text: '节点结构图',
          },
          series: [
            {
              type: 'tree',
              data: [this.lian],
              // top: '8%',
              // bottom: '14%',
              layout: 'radial',
              symbol: 'emptyCircle',
              symbolSize: 9,
              initialTreeDepth: 3,
              animationDurationUpdate: 750,
              emphasis: {
                focus: 'descendant',
              },
            },
          ],
        })
      })
    },
  },
  mounted() {
    this.initTree()
  },
}
</script>

<style lang="scss" scoped></style>
