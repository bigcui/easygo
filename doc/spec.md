ARA 扩展组件规范
==============


源文件仓库
--------

ara 扩展组件的中央仓库是 [https://github.com/araengine/ara-extensions](https://github.com/araengine/ara-extensions)。中央仓库 master 分支下的代码永远是稳定的。根目录下，每个 `ara-` 前缀的目录为一个扩展组件。


开发方式
--------

ara 扩展组件开发采用 [ara-cli](https://github.com/araengine/ara-cli)方式
1. 开发者需要 ara-cli 生成组件
2. 开发者在自己的仓库下开发
3. 开发完成后通过 pull-request 提交修改，由 ara 开发小组审核与合并

不允许在中央仓库 [https://github.com/araengine/ara-extensions](https://github.com/araengine/ara-extensions) 下开发。


组件结构
--------

[ara 扩展组件仓库](https://github.com/araengine/ara-extensions) 下，每个 `ara-` 前缀的目录为一个扩展组件。其中：

- 目录名称为组件名称
- 目录名称（组件名称）必须是 `ara-` 为前缀的全小写字符串
- 必须包含符合 [ara 扩展组件 index.json 规范](./spec-package-json.md) 的 `index.json` 文件
- 必须包含主模块文件，可以是 `[组件名].vue`
- 可以包含主样式文件，可以是 `[组件名].css`、`[组件名].less`、`main.css` 或 `main.less` 
- 可以包含js文件，可以是 `[组件名].js`、 或 `main.js` 


审核标准
--------

ara 开发小组在审核扩展组件时，将首先检查组件结构是否符合要求，然后根据下面的规范文档中的要求进行检查。

- [ara 扩展组件 index.json 规范](./spec-index-json.md)
- [ara 扩展组件脚本开发规范](./spec-script.md)
- [ara 扩展组件样vue开发规范](./spec-vue.md)
- [ara 扩展组件样式开发规范](./spec-style.md)

上线
--------


### 上线时间

待续


### 上线地址

目前线上的文件地址不会使用小版本，即组件上线后，线上在用的组件会立即更新

待续

示例
```
#待续
```
###  对ara组件注意事项
- `ara组件最大的特点是：具有两种数据能力功分别是移动页面展示能力和pc端的数据管理能力`
- `保证ara组件数据结构的完整性 否则是无法提交到ara平台`
- `保证ara组件代码规范性 遵循百度代码开发规范`[百度前端开发规范](https://github.com/ecomfe/spec)
#### 对于ara组件版本的说明  
  
1、目前线上地址只会保留大版本，但是组件代码中package.json仍需保留和更新。

2、对于以前使用小版本的页面，代码仍然保留。但是使用新增功能或者组件代码有升级，需要页面整体符合最新规则，

