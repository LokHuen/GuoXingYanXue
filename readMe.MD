### 基于 uni-app 搭建的常用工具

- 2.0-js 分支是目前项目开发中，主要使用的分支。
- 3.0-ts 还在构建中，目前还不太成型，还未在实际项目中跑过

### scss 处理器

- 需要做在 HBuilder 的 IDE 上，工具，插件安装。找到 sass 的预编译

### todo

- 完善经纬度地址解析
- 完善文档
- ~~预加载需要分版本，如果版本号不对，需要清空本地缓存，重新下载。~~
- lottie 的引入和使用 参考 https://github.com/landn172/lottie-miniapp
- 单页面，页面之间切换，fade 效果

### 2.0 的具体结构

├── App.vue
├── api
│ ├── error.js
│ ├── index.js
│ └── request.js
├── assets
│ ├── landing_logo.png
│ └── landing_power.png
├── components
│ ├── image
│ │ ├── index.js
│ │ ├── index.scss
│ │ └── index.vue
│ └── music
│ └── index.vue
├── config
│ ├── default.js
│ ├── develop.js
│ ├── release.js
│ └── trial.js
├── index.html
├── main.js
├── manifest.json
├── mixins
│ ├── downLoad.js
│ ├── index.js
│ ├── init.js
│ ├── openmini.js
│ ├── setting.js
│ └── upLoad.js
├── package.json
├── pages
│ ├── home
│ │ ├── index.js
│ │ ├── index.scss
│ │ └── index.vue
│ └── landing
│ ├── image.js
│ ├── index.js
│ ├── index.scss
│ └── index.vue
├── pages.json
├── readMe.MD
├── static
│ └── toast
│ ├── fail.png
│ └── success.png
├── store
│ ├── index.js
│ └── modules
│ ├── index.js
│ └── music.js
├── uni.scss
├── utils
│ ├── ali
│ │ └── aliyun-upload-sdk-1.0.1.min.js
│ ├── animate.css
│ ├── baidu
│ │ ├── mtj-wx-sdk.config.js
│ │ └── mtj-wx-sdk.js
│ └── common.js
└── yarn.lock

### api 请求部分

之所以改造 api 请求有如下原因

- 统一所有的请求入口，和接口，以及错误码列表。方便后续修改。在 api/error.js 中，message 会抛 toast 到前端页面。error_message 是服务器给的错误列表
- 统一在 header 头上埋 jwt 的 token
- 统一返回的格式，{ data: {}, isSuccess: true, message:''}
- 增加是否需要菊花转圈以及弹窗报错

### components 组件部分

- 在 pages.json 中配置了 easycom，所以都会以 rh-开头，可以自定义。组件主要封装了品牌底部的备案信息。图片还是建议放在服务器上有 cdn 会好一些
- 封装了 image 的组件，做<image>标签的统一入口。获取临时图片的地址，直接展示。以此来做到预加载的效果。改组件可以通过 id 去获取到具体的临时图片地址。

### config 配置部分

- 参考 egg 的结构，做了环境变量的判断。可以根据当前小程序的运行环境，加载不同的配置。
- 目前主要配置的 domain，网络请求地址。
- env 当前环境变量
- imagePath 图片前缀域名

### mixins

#### 下载流程。这部分需要再优化

- 通过 egg 的批量读取文件，生成出 landing 下的 image.js
- loading 页面混合 downLoad.js，目前只处理了图片，音频，视频暂时无法做缓存。
- downLoad 的整体流程如下
  - 先获取 Storage 的配置，如果配置存在，则说明已经缓存过。
  - 如果配置存在，拿临时图片去获取图片的信息，如果临时图片没有过期，是可以正常拿到。则可以继续使用。
  - 如何配置不存在，或者是临时图片已经被清理过。则走下载的流程，
  - 最终整合成一个图片对象，key 是 image.js 的 id，value 包含了图片的原始图片地址，宽高，临时图片地址
- 下载完成后，把临时图片对象，挂载到 store 的 imageInfo 对象中，供给全局使用。
- 封装了 rh-image 的统一图片加载类。根据 id 会去拿是否有缓存。
- rh-image 的宽高，如果指定了宽度，会根据临时图片的具体宽高去等比计算高度。高度亦是如此。
- 如果没有指定宽高则会拿图片的原始宽高，也就是切图的像素，拼上 rpx
