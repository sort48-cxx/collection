* 安装 Vue Cli

  ` npm install -g @vue/cli `

* 创建项目 

  ` vue create xxx

* 运行项目

  ` npm run serve `

* 打包命令

  ` npm run build `





------

记录：

* 组件传地址

  component: () => import('../views/About.vue')

* 配置代码格式检查

  <img src="F:\md\images\微信截图_20191212165216.png" alt="微信截图_20191212165216" style="zoom:50%;" />

* 关于vs code 格式代码-“单引号变双引号”的问题

  * 按图打开vscode中设置

  * ```javascript
    "vetur.format.defaultFormatterOptions": {
       "prettier": {
         "semi": false,
         "singleQuote": true
       }
     }
    ```



* 引入‘vant’组件

  ###### 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```

<img src="F:\md\images\微信截图_20191224111731.png" alt="微信截图_20191224111731" style="zoom: 67%;" />

<img src="F:\md\images\微信截图_20191225101413.png" alt="微信截图_20191225101413" style="zoom: 80%;" />

* 封装 svg

  *  安装 svg-sprite-loader

  *  在components公共组件文件夹下创建SvgIcon文件夹，并创建index.vue文件并加入以下组件配置代码

    ```vue
    <template>
      <svg :class="svgClass"
           aria-hidden="true"
           v-on="$listeners">
        <use :xlink:href="iconName" />
      </svg>
    </template>
    
    <script>
    export default {
      name: 'SvgIcon',
      props: {
        iconClass: {
          type: String,
          required: true
        },
        className: {
          type: String,
          default: ''
        }
      },
      computed: {
        iconName () {
          return `#icon-${this.iconClass}`
        },
        svgClass () {
          if (this.className) {
            return 'svg-icon ' + this.className
          } else {
            return 'svg-icon'
          }
        }
      }
    }
    </script>
    <style scoped>
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    </style>
    
    ```

* 在src目录下创建icon文件夹及子文件夹svg和index.js并配置从svg文件夹中读取svg文件

  * 在index.js中

  ```
  import Vue from 'vue'
  import SvgIcon from '@/components/SvgIcon' // svg组件
  
  // register globally
  Vue.component('svg-icon', SvgIcon)
  const req = require.context('./svg', false, /\.svg$/)
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  requireAll(req)
  
  ```

  

* 配置webpage

  * 在`vue.config.js`中加入以下代码:（如没有则新建一个文件）

    ```
    const path = require('path')
    
    function resolve(dir) {
        return path.join(__dirname, dir)
    }
    
    
    module.exports = {
        chainWebpack(config) {
            // config.plugins.delete('preload') // TODO: need test
            // config.plugins.delete('prefetch') // TODO: need test
            // set svg-sprite-loader
            config.module
                .rule('svg')
                .exclude.add(resolve('src/icons'))
                .end()
            config.module
                .rule('icons')
                .test(/\.svg$/)
                .include.add(resolve('src/icons'))
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]'
                })
                .end()
        },
    
    
    }
    ```

    

* 在main.js中全局引入icon

  ```
  import './icons' // icon
  ```

* 将复制好的svg图标代码放到src下icon文件夹的子文件svg下
* 全局使用组件svg-icon

```
<svg-icon iconClass="backtotop"/>
```

// svg 图标示例	

```
<svg viewBox="0 2 30 30" class="icon iconSearch">
	<path fill="#999" fill-rule="evenodd"
    d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z">
    </path>
</svg>
```

* 使用百度地图

  * 安装  $ npm install vue-baidu-map --save

    ```javascript
    import Vue from 'vue'
    import BaiduMap from 'vue-baidu-map'
    
    Vue.use(BaiduMap, {
      // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
      ak: 'YOUR_APP_KEY'
    })
    
    <template>
    <baidu-map
          :center="center"
          :zoom="zoom"
          @ready="handler"
          style="height:300px"
          @click="getClickInfo"
        >
      </baidu-map>
    </template>
    
    export default {
      data () {
        return {
          center: {
            lng: 0,
            lat: 0
          },
          zoom: 13
        }
      },
      methods: {
        handler ({ BMap, map }) {
          console.log(BMap, map)
          this.center.lng = 113.822348
          this.center.lat = 22.635538
          this.zoom = this.zoom
        },
        getClickInfo (e) {
          console.log(e)
          console.log(e.point.lng)
          console.log(e.point.lat)
          this.center.lng = e.point.lng
          this.center.lat = e.point.lat
          var point = new BMap.Point(e.point.lng, e.point.lat)
          var gc = new BMap.Geocoder()
          let _this = this
          gc.getLocation ( point, function(rs) {
            var addComp = rs.addressComponents
            console.log(rs.surroundingPois[0].title)
          })
        }
      }
    }
    </script>
    ```


* 使用 swiper插件

  * 安装 npm install vue-awesome-swiper --save

  * ```vue
    <template>
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" class="swipe-top">
        <!-- slides -->
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide>
        <swiper-slide>I'm Slide 5</swiper-slide>
        <swiper-slide>I'm Slide 6</swiper-slide>
        <swiper-slide>I'm Slide 7</swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </template>
    
    <script>
    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    
    Vue.use(VueAwesomeSwiper)
    
    export default {
      data () {
        return {
          swiperOption: {
            // 进来就加载
            notNextTick: true,
            pagination: {
              el: '.swiper-pagination'
            },
            loop: true,
            //  配置自动播放
            autoplay: {
              delay: 3000,
              // 最后一个是否停止
              stopOnLastSlide: false,
              // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            },
            observer: true,
            observeParents: true,
            // 配置速度
            speed: 600,
            // 滑动后回调函数
            on: {
              slideChangeTransitionEnd () {}
            }
          }
        }
      }
    }
    </script>
    ```

* 滚动插件 安装 “npm install @better-scroll/core@next --save ”

```vue
<template>
<div class="flashItemwrapper">
    <ul class="f-ul" ref="ulWrapper">
        <li>
            <div class="item-img">
            	<img src="https://ddimg.ddxq.mobi/abf3023fb51611526109391551.jpg" />
            </div>
            <div>四季宝柔滑花生酱 340g/瓶</div>
            <div class="flex flex-a-c">
                <div class="flex-1">
                    <p>¥16.90</p>
                    <p>¥19.90</p>
                </div>
                <div>
                	<svg-icon iconClass="car"></svg-icon>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import { CountDown } from 'vant'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      time: 30 * 60 * 1000 * 100
    }
  },
  components: {
    [CountDown.name]: CountDown
  },
  mounted () {
    this.$nextTick(() => {
      // 给ul设置值
      this.$refs.ulWrapper.style.width = '720px'
      if (!this.scroll) {
        // 名字一定要唯一 和父组件独立
        this.scroll = new BScroll('.flashItemwrapper', {
          probeType: 2,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style scoped>
.layout {
  margin: 0 1rem;
  line-height: 21px;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.timedowm {
  margin-left: 1rem;
  text-align: left;
}
.name {
  font-size: 1rem;
  color: #333;
  border-left: seagreen 2px solid;
  padding-left: 1rem;
}
.more {
  text-align: right;
  font-size: 0.8rem;
  color: #3cb963;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
.f-ul {
  display: flex;
}
.f-ul li {
  flex: 1;
  margin-right: 0.5rem;
}
.f-ul li img {
  width: 6rem;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-a-c {
  align-items: center;
}
.flashItemwrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
```