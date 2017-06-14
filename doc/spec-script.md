ARA 扩展组件规范 - 脚本开发
==============

在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字"MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL"被定义在rfc2119中。


Style Guide
------
该脚本可手动添加import到vue组件中
组件的脚本开发 **必须(MUST)** 遵守 [JavaScript Style Guide](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)。

开发时，我们可以通过 [FECS](http://fecs.baidu.com/) 工具进行检查。
-	统一使用 ES6 开发；
-	需要完全遵循百度JavaScript编码规范；
- 可以$选择符，但仅限于jquery和zepto公用的方法；
- 组件属性放在配置文件的properties；
-	import 放在代码最前面；


文件
----

### 所有脚本文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

`解释`: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。



模块化
------

```javascript
// good
 /**
 * @file [描述]
 *
 * @author xx(xx@baidu.com)
 * @date   [xx]
 */
export default {
     init(){
       //todo
     }
}

```

