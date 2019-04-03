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
	exif.getImage(base64 => {
		// 这里是处理后的image base64 后续可以对Base64 转换成Blob和File对象
	});

```

## 配置项
``` javascript
	let exif = new ClearExif(file, type, quality);
	file: 为原始图片File对象
	type: 最终想要得到的图片格式  'image/jpeg' 'image/png'
	quality: 0-1 压缩图片 值越小压缩越严重

```
