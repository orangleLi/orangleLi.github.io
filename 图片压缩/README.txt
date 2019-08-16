原理：
canvas.toDataURL(type, encoderOptions);

type 可选
	图片格式，默认为 image/png
encoderOptions 可选
	在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
	
	
通过降低图片质量来改变图片大小


还有一种方式是通过canvas重绘改变图片尺寸来改变大小

例如将1980*1080的图片按比例缩小为768*432，但这种方式对于过小的图片有可能反而增大图片大小

