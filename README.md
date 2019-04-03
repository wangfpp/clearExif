# 基于exifjs实现一个图片脱敏处理工具

## 依赖项
- exif-js

## 安装
``` shell
$ npm install clearexif --save
```


## 使用说明
``` javascript 
	import  ClearExif from 'clearexif'
	let exif = new ClearExif(file, type, quality);
	exif.getImage(fileObj => {
		// 这里返回了3种数据 
		// fileObj = {
		// 	base64: base64编码的图片,
		// 	blob: 类文件对象, Blob {size: Number, type: String}
		// 	file: File对象 File 
		// 		{
		// 			lastModified: 1554284903407
		// 			lastModifiedDate: Wed Apr 03 2019 17:48:23 GMT+0800 (中国标准时间)
		// 			name: "ada661d6-1924-11e9-9ade-107b44aff8a6.jpeg"
		// 			size: 490675
		// 			type: "image/jpeg"
		// 			webkitRelativePath: ""
		// 		}
	});

```

## 配置项
``` javascript
	let exif = new ClearExif(file, type, quality);
	file: 为原始图片File对象
	type: 最终想要得到的图片格式  'image/jpeg' 'image/png'
	quality: 0-1 压缩图片 值越小压缩越严重

```
