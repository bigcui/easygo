# ARA CLI 工具
----------

### ara脚手架 (基于vue2的vue组件开发)
- `ara开发的组件是第三方开发的使用的 具备pc和移动端两种数据能力的vue组件`
-  `保证ara组件代码的规范性 遵循百度代码开发规范`[百度前端开发规范](https://github.com/ecomfe/spec)

### 安装

依赖环境: [Node.js](https://nodejs.org/en/) (>=4.x).

``` bash
$ [sudo] npm install -g ara-cli
```
*注意：*
nodejs 5.x, 6.x 安装模块时，可能会报`node-gyp`相关错误，需要使用如下命令安装

```
$ [sudo] npm install --unsafe-perm -g ara-cli
```
nodejs 5.x 安装`bufferutil`模块时可能会报编译错误，建议使用`4.4`或者`6.x`以上版本。

### 使用

在当前项目`根目录`中初始化ara配置：

``` bash
$ ara init
```
会创建`ara.config`文件，相关配置如下：

```
module.exports = {

    /**
     * ara server调试的端口号
     *
     * @type {number}
     */
    port: 8000,

    /**
     * 本地ara网页后缀名，会对ara网页动态添加调试脚本
     *
     * @type {RegExp}
     */
    araPageExt: /\.(?:html|htm|ara)$/i,
    /**
     * 启用调试页面自动刷新
     *
     * @type {boolean}
     */
    livereload: true
};
```

<!--![](./example/ara-init.png) -->

----
在当前项目创建一个ara模板网页：

``` bash
$ ara add index.html [ara-xxx...]
```

<!-- ![](./example/ara-add.png) -->

----
在`ara-extensions`仓库中创建一个ara组件：

``` bash
$ ara addelement ara-demo
```

<!--![](./example/ara-addelement.png)--><!--

----
验证ara网页：

``` bash
$ ara validate index.html [...]
```

<!--![](./example/ara-validate.png)-->

----
在当前项目或者`ara-extensions`仓库中启动ara网页调试器：

``` bash
$ ara server
```

注意：调试`ara-extensions`仓库组件时，会读取组件中`READEME.md`的使用示例，因此组件的`README.md`中
应至少包含一段使用示例：
<pre>
    使用示例
    ```html
        &lt;ara-xxx&gt;&lt;/ara-xxx&gt;
    ```
</pre>

配置了`araDir`之后可以调试`ara`引擎。

`ara server` 启动多个实例的话会报端口占用错误，需要关闭其他实例或者kill掉占用端口的进程后再启动。

```
➜  ~ ara server
INFO livereload server start at: http://172.20.128.110:35730
ERROR PORT 8000 already in use, please retry again!
```

<!--![](./example/ara-server.png)-->

----
在当前项目中，校验编写的ara组件，可以校验ara组件目录或者ara组件压缩包：

``` bash
# directory
$ ara validateelement ./ara-demo
# zip package
$ ara validateelement ./ara-demo.zip
```

<!-- ![](./example/ara-validateelement.png) -->

----
更新ara工具，将ara模板更新到最新版本：

``` bash
$ ara update
```

!<!-- [](./example/ara-update.png)-->

----

直接从官方 npm registry 安装，可能会由于网络原因，导致安装时间较长或安装失败。此时我们可以选择速度更快的 registry。

```
$ [sudo] npm install -g ara-cli --registry=https://registry.npm.taobao.org
```



### License

[MIT](http://opensource.org/licenses/MIT)
