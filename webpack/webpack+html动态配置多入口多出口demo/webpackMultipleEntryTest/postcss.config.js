module.exports = {
    plugins: [
    	//css样式添加浏览器前缀
    	require('autoprefixer')({ browsers: ['last 2 versions'] }),
    	//css进行代码压缩
        require('cssnano')({
            preset: 'default'
        }),
    ]
};