ARA 扩展组件规范 - index.json
==============


在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字"MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL"被定义在rfc2119中。

文件
----

### package.json 文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

`解释`: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。


字段 **必须(MUST)**
----

```json
{
    "name": "label",
    "title": "文字",
    "type": "label",
    "group": "third",
    "propeditor": ["rich-editor", "margins", "elink", "props-table"],
    "properties": [{
        "name": "content",
        "value": "内容"
    }, {
        "name": "href",
        "value": {
            "type": "none",
            "page": "",
            "pageParams": [{
                "name": "",
                "value": ""
            }],
            "url": "",
            "phone": "",
            "pages": []
        }
    }, {
        "name": "margin",
        "value": "0px 0px 0px 0px"
    }, {
        "name": "width",
        "value": "80px"
    }, {
        "name": "height",
        "value": "40px"
    }, {
        "name": "backgroundColor",
        "value": "transparent"
    }, {
        "name": "visible",
        "value": "true"
    }]
}
```

## 字段解释：

|名称 | 类型 | 描述 | 默认值 | 
|---|---|---|---|
|name |string  | 组件名称 |  | 
|title |string  | 组件标题，用于显示在IDE左侧的组件区域 |  | 
|type |string  | 组件类型，与name保持一致 |  | 
|group |string  | 组件所属的组 | third | 
|propeditor|array  | 属性编辑组件库列表，可视化组件与属性编辑组件建立连接的桥梁，它描述当前组件需要哪些属性编辑组件|  | 
|properties|array  | 组件的属性 |  | 

## 特别说明

 1. propeditor：目前可配置的属性编辑组件可以有：rich-editor、margins、elink、props-table、ebutton、align、fixed、options、list-container、nav-editor、checkbox-type、upimage、js-comp、ajax-comp、carousel-editor、title-editor，每种组件都提供对properties中各属性值的修改功能。
 2. properties：properties中配置了有关于组件的所有属性与行为，如长宽height、width，背景backgroundColor，是否可见visible，以及组件点击后的行为href等等，配置之后需要配合属性编辑组件一起使用，在开发时需要根据组件的外观和功能量身配置。



