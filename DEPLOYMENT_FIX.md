# 部署MIME类型错误解决方案

## 问题描述

部署后出现页面空白，控制台报错：

```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/vnd.trolltech.linguist". Strict MIME type checking is enforced for module scripts per HTML spec.
```

## 原因分析

这个错误是由于服务器没有正确配置JavaScript文件的MIME类型导致的。浏览器期望接收`application/javascript`或`text/javascript`，但服务器返回了错误的MIME类型。

## 解决方案

### 1. 重新构建项目

首先确保使用更新后的配置重新构建项目：

```bash
npm run build
```

### 2. 根据部署平台选择配置

#### Apache服务器

使用`public/.htaccess`文件（已创建），无需额外操作。

#### Nginx服务器

参考`nginx.conf.example`文件，将配置添加到你的Nginx配置中：

- 修改`server_name`为你的域名
- 修改`root`路径为你的dist目录路径
- 重启Nginx服务

#### Netlify

使用`public/_headers`文件（已创建），部署时会自动生效。

#### Vercel

使用`vercel.json`文件（已创建），部署时会自动生效。

#### 其他静态托管服务

如果使用其他托管服务，请在服务商的控制面板中配置以下MIME类型：

- `.js` → `application/javascript`
- `.mjs` → `application/javascript`
- `.css` → `text/css`
- `.json` → `application/json`

### 3. 验证修复

部署后检查：

1. 打开浏览器开发者工具
2. 刷新页面
3. 检查Network标签页中JavaScript文件的响应头
4. 确认Content-Type为`application/javascript`

### 4. 常见问题排查

#### 问题仍然存在？

1. 清除浏览器缓存
2. 检查CDN缓存（如果使用了CDN）
3. 确认服务器配置已正确应用
4. 检查构建输出的文件扩展名是否正确

#### 其他MIME类型错误

如果遇到其他文件类型的MIME错误，可以在相应的配置文件中添加对应的MIME类型设置。

## 预防措施

1. 在本地开发时使用`npm run preview`测试生产构建
2. 部署前在staging环境测试
3. 定期检查服务器MIME类型配置

## 联系支持

如果问题仍然存在，请提供以下信息：

- 部署平台名称
- 错误截图
- 网络请求的响应头信息
