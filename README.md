# 基于exifjs实现一个图片脱敏处理工具

## 依赖项
- exif-js

## 使用说明
``` javascript 
	const ClearExif = require('ClearExif');
	let exif = new ClearExif(file, type, quality);
	ClearExif.getImage(base64 => {
		// 这里是处理后的image base64
	});

```

## 配置项

``` javascript
	let exif = new ClearExif(file, type, quality);
	file: 为原始图片File对象
	type: 最终想要得到的图片格式  'image/jpeg' 'image/png'
	quality: 0-1 压缩图片 值越小压缩越严重

```
