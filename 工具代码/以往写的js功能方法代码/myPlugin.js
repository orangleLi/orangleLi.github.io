// 获得一个数字各个位数指数和  getNum(89, 1) 8^1 + 9^2 = 89  getNum(14, 3) 1^3 + 4^4 = 257
// 我写的
    function getNum (n, p) {
        var multiplier = 1;
        var tempNum = n;
        var sum = 0;
        var len = (n+'').length;
        var str = '';
        while(tempNum > 0) {
            sum = sum + Math.pow((parseInt(n/multiplier)%10), p + len - 1);
            tempNum  = parseInt(tempNum/10);
            multiplier *= 10;
            p--;
        }
        return sum;
    }
// 大佬写的	
	function getNum(n, p) {
		
      return x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
	}
	
	// 将WUB都去掉，每个单词之间空格分离
	function songDecoder(song){
       return song.replace(/(WUB)+/g," ").trim()
       // return song.split('WUB').filter(item => item).join(' ')  // 数组过滤空串("")
     }
    console.log(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"))
	
	// 获得一个数字各个位数之和 getNum(89, 1) 8 + 9 = 17
	function getNum (n) {
        var multiplier = 1;
        var tempNum = n;
        var sum = 1;
        while(tempNum > 0) {
            sum = sum * (parseInt(n/multiplier)%10);
            tempNum  = parseInt(tempNum/10);
            multiplier *= 10;
        }
        return sum;
    }