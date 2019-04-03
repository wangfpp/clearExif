/*
* @Author: wangfpp
* @Date:   2019-03-29 20:46:58
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-03-29 22:35:36
*/
const EXIF = require('exif-js');
class ClearExif {
	constructor(img, type, quality) { // 类的构造方法
		this.img = img;
		this.type = type;
		this.quality = quality ? quality : 1;
	}
	getImage(callback)  {
		let self = this;
		let file = this.img;
		let Orientation, base64; //图片的方向,返回的值
		//去获取拍照时的信息，解决拍出来的照片旋转问题
		EXIF.getData(file, function () {
			Orientation = EXIF.getTag(this, 'Orientation');
			if (!file || !window.FileReader) return;
			if (/^image/.test(file.type)) {
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function () {
					let result = this.result;
					if (!Orientation) { // 没有旋转直接返回
						callback(result);
					} else {
						let img = new Image();
						img.src = result;
						img.onload = function () {
						base64 = self.modifyRotate(img, Orientation);
							callback(base64);
						}
					}
				}
			}
		});
	}

	modifyRotate(img, Orientation) {
		let self = this;
		let canvas = document.createElement("canvas"), ctx = canvas.getContext('2d'),
		tCanvas = document.createElement("canvas"), tctx = tCanvas.getContext("2d"), initSize = img.src.length,
		width = img.width, height = img.height, ratio = 1;  //声明
		canvas.width = width;
		canvas.height = height;
		// 铺底色
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//如果图片像素大于100万则使用瓦片绘制
		let count;
		if ((count = width * height / 1000000) > 1) {
			// console.log("超过100W像素");
			count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
			//            计算每块瓦片的宽和高
			let nw = ~~(width / count);
			let nh = ~~(height / count);
			tCanvas.width = nw;
			tCanvas.height = nh;
			for (let i = 0; i < count; i++) {
				for (let j = 0; j < count; j++) {
					tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
					ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
				}
			}
		} else {
			ctx.drawImage(img, 0, 0, width, height);
		}
		//修复上传图片的时候被旋转的问题
		if (Orientation != "" && Orientation != 1) {
			switch (Orientation) {
				case 6://需要顺时针（向左）90度旋转
					self.rotateImg(img, 'left', canvas);
					break;
				case 8://需要逆时针（向右）90度旋转
					self.rotateImg(img, 'right', canvas);
					break;
				case 3://需要180度旋转
					self.rotateImg(img, 'right', canvas, 2);//转两次
					break;
			}
		}
		//进行最小压缩
		let ndata = canvas.toDataURL(self.type, self.quality);
		tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
		return ndata;
	}

	rotateImg (img, direction, canvas, num) {
		//最小与最大旋转方向，图片旋转4次后回到原方向
		const min_step = 0;
		const max_step = 3;
		if (img == null) return;
		//img的高度和宽度不能在img元素隐藏后获取，否则会出错
		let height = img.height;
		let width = img.width;
		let step = 2;
		if (step == null) {
			step = min_step;
		}
		if (direction == 'right') {
			step++;
			//旋转到原位置，即超过最大值
			step > max_step && (step = min_step);
		} else {
			step--;
			step < min_step && (step = max_step);
		}
		//旋转180度
		step = num ? num : step;

		//旋转角度以弧度值为参数
		let degree = step * 90 * Math.PI / 180;

		let ctx = canvas.getContext('2d');
		switch (step) {
			case 0:
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0);
				break;
			case 1:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, 0, -height);
				break;
			case 2:
				canvas.width = width;
				canvas.height = height;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, -height);
				break;
			case 3:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, 0);
				break;
		}
	}
};
export default ClearExif;