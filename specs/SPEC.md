1. 需要支持选择是否全量覆盖(先清掉public/images)
2. date.ts需要增量更新，否则desc无法保留
   - 优化data.ts生成逻辑：从public/image中读取进行全量生成，描述从现有data.ts的imageData数组中获取
   - or，描述在新数组中固定下来 [{id: `imagePath`, desc: ''}]，每次生成时从中获取
   - data中增加更多图片信息(地点)
3. 图片压缩功能
4. 图片命名规范调整
5. 文件目录结构整理
6. 代码整理
7. src/assets/old|source文件中的内容不上传
8. 设计完整流水线：
   - 图片(old) - 描述(descriptions) - 改名(source)[原始文件] - 压缩(compressed) - 整理(public/image)
   - 用户上传图片 - 获取图片信息(时间地点) - 修改名称(??) - 是否需要AI编辑 - 展示
   - AI - prompt选择/色调/边框/滤镜
9. 图片做AI修剪
