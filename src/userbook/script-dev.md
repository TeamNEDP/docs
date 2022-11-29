# 脚本开发环境

Valyria 为用户提供了**全套**的脚本开发环境，以期能为用户提供更好的脚本开发体验。

当然，如果你的代码水平足够高超的话，你也**可以**跳过这个部分。

## 前置

在开始安装环境前，你/你的系统需要拥有：
- 一个支持 JavaScript 的 IDE
- 一个 github 账号
- yarn

## 安装环境

我们已经将所有你将会使用到的打包在一个[模板](https://github.com/TeamNEDP/script-dev)里。

#### 如果你

有将你的脚本上传到 GitHub 的需求，你需要做的只是点击 `Use this template`，建立一个你的脚本代码仓库。

（这里应该是一个 .gif 或者是什么的，cyx 说不要是图片）

之后将你的脚本仓库克隆到本地。

#### 但如果你

有将你的脚本上传到 GitHub 的需求，你仅需要将包下载到本地即可。

（这里应该是一个 .gif 或者是什么的，cyx 说不要是图片）

做完以上工作后，我们在路径下终端输入：

```
yarn install
```

现在你就能在 `./src/tick.js` 下编写你的 Valyria 脚本。

## 开始编写

在本环境下，你可以使用 API 相关的类型推断和代码补全。

但是**更方便**的是，你可以利用 `npm` 命令依赖 `node` 包或是网络上的一些算法实现。

对于这一特性，这里是一个例子：

### Example

假设你需要用到经典的 $dijkstra$ 算法，你进入到了[官网](https://www.npmjs.com/)搜索。

（这里应该是一个 gif）

从[官网](https://www.npmjs.com/package/dijkstra?activeTab=readme)上你得知可以通过 `yarn add dijkstra` 安装这一实现，于是你在控制台输入：

```
yarn add dijkstra
```

现在你在 `tick.js` 里就能使用 $dijkstra$ 相关内容了。

（这里应该是一个代码补全的 gif）

## 打包输出

现在你完成了你的 Valyria 脚本，现在你要将它打包为可以上传到 Valyria 脚本仓库的脚本，在终端输入：

```
yarn build
```

这时你的脚本就会打包输出到 `./main.js` 里，将其中内容上传到 Valyria 脚本仓库就完成了一个开发过程。