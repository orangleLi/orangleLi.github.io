/**
 * Created by Tim on 2016/6/30.
 */
"use strict";
/*设置和更新标题中的日期*/
var oTitleTimeInfo=$('#titleTimeInfo')[0];
var oSetTitleDate=new setTitleDate({ele:oTitleTimeInfo});
/*设置和更新标题中的日期*/
/*停车场数据*/
var arrStaticParkData=[
    {
    "name": "鸣柳岛",
    "value": ["106.196364", "38.48862", 80, {
        "CityText": "银川市",
        "ProvinceText": "宁夏回族自治区"
    },
        "YC13", "CCPG"]
},
    {
        "name": "诚基中心",
        "value": ["117.0524803", "36.66679987", 80, {
            "CityText": "济南市",
            "ProvinceText": "山东省"
        },
            "JN16", "CCPG"]
    },
    {
        "name": "锦林水岸",
        "value": ["106.3230926", "38.53887943", 80, {
            "CityText": "银川市",
            "ProvinceText": "宁夏回族自治区"
        },
            "YC28", "CCPG"]
    },
    {
        "name": "银川国际贸易中心",
        "value": ["106.2749148", "38.47624748", 80, {
            "CityText": "银川市",
            "ProvinceText": "宁夏回族自治区"
        },
            "YC11", "CCPG"]
    },
    {
        "name": "（济南）汇展国际花园",
        "value": ["117.1291194", "36.69380488", 80, {
            "CityText": "济南市",
            "ProvinceText": "山东省"
        },
            "JN15", "CCPG"]
    },
    {
        "name": "（合肥）淮南政务中心",
        "value": ["117.0260272", "32.58824169", 80, {
            "CityText": "淮南市",
            "ProvinceText": "安徽省"
        },
            "HF22", "CCPG"]
    },
    {
        "name": "大城际",
        "value": ["104.0785544", "30.52017935", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD17", "CCPG"]
    },
    {
        "name": "东华园",
        "value": ["117.2723019", "31.78443125", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF19", "CCPG"]
    },
    {
        "name": "西南设计院",
        "value": ["104.0732336", "30.59327809", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD20", "CCPG"]
    },
    {
        "name": "（重庆）旭阳台北城敦化里",
        "value": ["106.3136451", "29.59623903", 80, {
            "CityText": "重庆市",
            "ProvinceText": "重庆"
        },
            "CQ22", "CCPG"]
    },
    {
        "name": "西安摩尔中心",
        "value": ["108.9530983", "34.2777999", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA32", "CCPG"]
    },
    {
        "name": "泊盛桃源",
        "value": ["121.3614512", "28.59747202", 80, {
            "CityText": "台州市",
            "ProvinceText": "浙江省"
        },
            "SH13", "CCPG"]
    },
    {
        "name": "星海国宝",
        "value": ["121.5934778", "38.94870994", 80, {
            "CityText": "大连市",
            "ProvinceText": "辽宁省"
        },
            "DL14", "CCPG"]
    },
    {
        "name": "(西安)中央广场",
        "value": ["108.8932138", "34.20095861", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA21", "CCPG"]
    },
    {
        "name": "海印长城",
        "value": ["121.6139698", "38.90948948", 80, {
            "CityText": "大连市",
            "ProvinceText": "辽宁省"
        },
            "DL12", "CCPG"]
    },
    {
        "name": "万通红墙国际",
        "value": ["104.0663933", "30.6759889", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD35", "CCPG"]
    },
    {
        "name": "华府岭秀",
        "value": ["109.7644193", "39.80558591", 80, {
            "CityText": "鄂尔多斯市",
            "ProvinceText": "内蒙古自治区"
        },
            "NM82", "CCPG"]
    },
    {
        "name": "水墨兰庭",
        "value": ["117.224597", "31.82618", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF13", "CCPG"]
    },
    {
        "name": "金融服务区",
        "value": ["119.1296767", "36.7130008", 80, {
            "CityText": "潍坊市",
            "ProvinceText": "山东省"
        },
            "JN14", "CCPG"]
    },
    {
        "name": "绿地中央文化城",
        "value": ["110.235878", "20.028625", 80, {
            "CityText": "海口市",
            "ProvinceText": "海南省"
        },
            "SZ61", "CCPG"]
    },
    {
        "name": "绿地新里.西斯莱公馆(住宅)",
        "value": ["114.3162001", "30.58108413", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH19", "CCPG"]
    },
    {
        "name": "烟台海蓝金岸•海语公园售楼处",
        "value": ["121.2517836", "36.70827518", 80, {
            "CityText": "烟台市",
            "ProvinceText": "山东省"
        },
            "JN22", "CCPG"]
    },
    {
        "name": "名城港湾",
        "value": ["119.425106", "26.020333", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ14", "CCPG"]
    },
    {
        "name": "武汉绿地中央广场售楼处",
        "value": ["114.2284755", "30.51585664", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WHL12", "CCPG"]
    },
    {
        "name": "东湖国际",
        "value": ["104.0999266", "30.62182869", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD29", "CCPG"]
    },
    {
        "name": "（长沙）金轮星光名座售楼处",
        "value": ["112.9793528", "28.21347823", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS43", "CCPG"]
    },
    {
        "name": "鲁能领秀城F区",
        "value": ["105.073056", "29.59946153", 80, {
            "CityText": "内江市",
            "ProvinceText": "四川省"
        },
            "JN13-F", "CCPG"]
    },
    {
        "name": "武汉名邸公馆",
        "value": ["114.3162001", "30.58108413", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH30", "CCPG"]
    },
    {
        "name": "顶峰水岸汇景1A期",
        "value": ["104.0441704", "30.70263452", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD30", "CCPG"]
    },
    {
        "name": "旭阳·台北城西门町商业区",
        "value": ["106.3137764", "29.60106874", 80, {
            "CityText": "重庆市",
            "ProvinceText": "重庆"
        },
            "CQ21", "CCPG"]
    },
    {
        "name": "半岛城邦三期",
        "value": ["104.0855972", "30.60114589", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD40", "CCPG"]
    },
    {
        "name": "中茂岱湖城",
        "value": ["118.103886", "24.48923061", 80, {
            "CityText": "厦门市",
            "ProvinceText": "福建省"
        },
            "FZ37", "CCPG"]
    },
    {
        "name": "大连优山美地",
        "value": ["122.0074425", "39.10138051", 80, {
            "CityText": "大连市",
            "ProvinceText": "辽宁省"
        },
            "DL13", "CCPG"]
    },
    {
        "name": "长沙云海湾售楼处",
        "value": ["112.9793528", "28.21347823", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS32", "CCPG"]
    },
    {
        "name": "中铁国际城二期",
        "value": ["113.1187567", "28.23032191", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS18", "CCPG"]
    },
    {
        "name": "摩天一号",
        "value": ["112.991635", "28.185108", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS13", "CCPG"]
    },
    {
        "name": "合肥普洛斯物流园",
        "value": ["117.2826991", "31.86694226", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF31", "CCPG"]
    },
    {
        "name": "成都中海新华府",
        "value": ["104.1173574", "30.66485322", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD49", "CCPG"]
    },
    {
        "name": "天鹅湖一号",
        "value": ["117.240473", "31.811456", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF21", "CCPG"]
    },
    {
        "name": "（伊春）前进社区秀水小区",
        "value": ["128.8768759", "47.72662254", 80, {
            "CityText": "伊春市",
            "ProvinceText": "黑龙江省"
        },
            "AM0102", "CCPG"]
    },
    {
        "name": "沈阳绿地棋盘山庄售楼处",
        "value": ["123.6006213", "41.83566163", 80, {
            "CityText": "沈阳市",
            "ProvinceText": "辽宁省"
        },
            "TJ31", "CCPG"]
    },
    {
        "name": "福州世茂鼓岭",
        "value": ["119.3793691", "26.15685199", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ29", "CCPG"]
    },
    {
        "name": "华府岭秀",
        "value": ["109.7644193", "39.80558591", 80, {
            "CityText": "鄂尔多斯市",
            "ProvinceText": "内蒙古自治区"
        },
            "NM65", "CCPG"]
    },
    {
        "name": "（武汉）卧龙墨水湖边管理处",
        "value": ["114.2224876", "30.54012785", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH33", "CCPG"]
    },
    {
        "name": "温哥华南苑",
        "value": ["103.9895621", "30.580496", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD37", "CCPG"]
    },
    {
        "name": "武汉汉南绿地城北岛",
        "value": ["114.3162001", "30.58108413", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH37", "CCPG"]
    },
    {
        "name": "鼎盛华世纪广场",
        "value": ["111.6951848", "40.85961861", 80, {
            "CityText": "呼和浩特市",
            "ProvinceText": "内蒙古自治区"
        },
            "NM80", "CCPG"]
    },
    {
        "name": "名城国际（一期）",
        "value": ["119.399993", "26.024778", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ30", "CCPG"]
    },
    {
        "name": "（合肥）海德公馆售楼处",
        "value": ["117.1595665", "31.78059863", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF34", "CCPG"]
    },
    {
        "name": "西安绿地中央公园",
        "value": ["108.8865557", "34.18736149", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA14", "CCPG"]
    },
    {
        "name": "西安振业泊墅售楼处",
        "value": ["109.0750947", "34.31818401", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA13", "CCPG"]
    },
    {
        "name": "福建三明阳光城",
        "value": ["117.6435274", "26.27457091", 80, {
            "CityText": "三明市",
            "ProvinceText": "福建省"
        },
            "FZ38", "CCPG"]
    },
    {
        "name": "（武汉）利腾国际售楼处",
        "value": ["114.3162001", "30.58108413", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH41", "CCPG"]
    },
    {
        "name": "大连优山美地B区三期",
        "value": ["122.0235131", "39.09719162", 80, {
            "CityText": "大连市",
            "ProvinceText": "辽宁省"
        },
            "DL16", "CCPG"]
    },
    {
        "name": "康桥长郡",
        "value": ["113.1101598", "28.23578565", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS23", "CCPG"]
    },
    {
        "name": "成都绿地城售楼部（前期）",
        "value": ["104.0636454", "30.77231766", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD42", "CCPG"]
    },
    {
        "name": "腾讯科技",
        "value": ["119.428771", "26.020816", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH13", "CCPG"]
    },
    {
        "name": "（伊春）前进社区桃源小区",
        "value": ["128.8768759", "47.72662254", 80, {
            "CityText": "伊春市",
            "ProvinceText": "黑龙江省"
        },
            "AM0101", "CCPG"]
    },
    {
        "name": "名城银河湾",
        "value": ["119.428771", "26.020816", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ31", "CCPG"]
    },
    {
        "name": "旭阳台北城",
        "value": ["106.3136451", "29.59623903", 80, {
            "CityText": "重庆市",
            "ProvinceText": "重庆"
        },
            "CQ16", "CCPG"]
    },
    {
        "name": "五一中央领御",
        "value": ["112.9802175", "28.2032991", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS28", "CCPG"]
    },
    {
        "name": "天府长城·南熙里",
        "value": ["104.080853", "30.598617", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD1102", "CCPG"]
    },
    {
        "name": "大学湾二期",
        "value": ["118.1164257", "24.59056798", 80, {
            "CityText": "厦门市",
            "ProvinceText": "福建省"
        },
            "FZ19", "CCPG"]
    },
    {
        "name": "和地蓝湾",
        "value": ["117.2280435", "31.82482338", 80, {
            "CityText": "合肥市",
            "ProvinceText": "安徽省"
        },
            "HF16", "CCPG"]
    },
    {
        "name": "（武汉）星悦城售楼处",
        "value": ["114.3162001", "30.58108413", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH39", "CCPG"]
    },
    {
        "name": "鲁能领秀城E区",
        "value": ["105.073056", "29.59946153", 80, {
            "CityText": "内江市",
            "ProvinceText": "四川省"
        },
            "JN12-E", "CCPG"]
    },
    {
        "name": "鲁能星城十二街区",
        "value": ["106.5693845", "29.60884084", 80, {
            "CityText": "重庆市",
            "ProvinceText": "重庆"
        },
            "CQ11", "CCPG"]
    },
    {
        "name": "半岛城邦",
        "value": ["104.0854602", "30.5971924", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD27", "CCPG"]
    },
    {
        "name": "世茂外滩花园",
        "value": ["119.3335732", "26.05892451", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ16", "CCPG"]
    },
    {
        "name": "财富汇",
        "value": ["106.3230926", "38.53887943", 80, {
            "CityText": "银川市",
            "ProvinceText": "宁夏回族自治区"
        },
            "YC29", "CCPG"]
    },
    {
        "name": "凯隆橙仕公馆",
        "value": ["119.4067344", "26.028606", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ33", "CCPG"]
    },
    {
        "name": "西安绿地乐和公馆",
        "value": ["108.976119", "34.23290166", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA22", "CCPG"]
    },
    {
        "name": "柏南郡",
        "value": ["104.083326", "30.59977928", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD19", "CCPG"]
    },
    {
        "name": "万豪中心",
        "value": ["117.0543734", "36.66050984", 80, {
            "CityText": "济南市",
            "ProvinceText": "山东省"
        },
            "TJ30", "CCPG"]
    },
    {
        "name": "融晟红郡",
        "value": ["119.268829", "26.041388", 80, {
            "CityText": "福州市",
            "ProvinceText": "福建省"
        },
            "FZ25", "CCPG"]
    },
    {
        "name": "鲁能领秀城D区",
        "value": ["116.6007976", "35.40212166", 80, {
            "CityText": "济宁市",
            "ProvinceText": "山东省"
        },
            "JN13-D", "CCPG"]
    },
    {
        "name": "绿地海珀香庭",
        "value": ["108.8865557", "34.18736149", 80, {
            "CityText": "西安市",
            "ProvinceText": "陕西省"
        },
            "XA30", "CCPG"]
    },
    {
        "name": "武汉汉南绿地欧洲风情小镇",
        "value": ["114.0844249", "30.35552238", 80, {
            "CityText": "武汉市",
            "ProvinceText": "湖北省"
        },
            "WH21", "CCPG"]
    },
    {
        "name": "内蒙古绿地腾飞壹号售楼处",
        "value": ["111.76605", "40.826662", 80, {
            "CityText": "呼和浩特市",
            "ProvinceText": "内蒙古自治区"
        },
            "NM91", "CCPG"]
    },
    {
        "name": "乌鲁木齐绿地城售楼处",
        "value": ["87.56498774", "43.84038035", 80, {
            "CityText": "乌鲁木齐市",
            "ProvinceText": "新疆维吾尔自治区"
        },
            "XA33", "CCPG"]
    },
    {
        "name": "溪城华府",
        "value": ["106.2027947", "38.47934879", 80, {
            "CityText": "银川市",
            "ProvinceText": "宁夏回族自治区"
        },
            "YC30", "CCPG"]
    },
    {
        "name": "（海南）绿地城",
        "value": ["110.4394518", "19.97262165", 80, {
            "CityText": "海口市",
            "ProvinceText": "海南省"
        },
            "HK14", "CCPG"]
    },
    {
        "name": "厦门普洛斯翔安物流园管理处",
        "value": ["118.2808032", "24.67548492", 80, {
            "CityText": "厦门市",
            "ProvinceText": "福建省"
        },
            "FZ36", "CCPG"]
    },
    {
        "name": "（长沙）南湖花园",
        "value": ["112.9793528", "28.21347823", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS45", "CCPG"]
    },
    {
        "name": "华为泊富国际大厦",
        "value": ["112.9907457", "28.21470923", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS44", "CCPG"]
    },
    {
        "name": "城市维也纳",
        "value": ["111.6669007", "40.85677791", 80, {
            "CityText": "呼和浩特市",
            "ProvinceText": "内蒙古自治区"
        },
            "NM81", "CCPG"]
    },
    {
        "name": "鲁能领秀城",
        "value": ["106.6447784", "29.50285363", 80, {
            "CityText": "重庆市",
            "ProvinceText": "重庆"
        },
            "CQ12", "CCPG"]
    },
    {
        "name": "诚基经贸中心商铺",
        "value": ["123.4327909", "41.80864478", 80, {
            "CityText": "沈阳市",
            "ProvinceText": "辽宁省"
        },
            "TJ17-S", "CCPG"]
    },
    {
        "name": "(郑州)方圆经纬花园",
        "value": ["113.632591", "34.76533944", 80, {
            "CityText": "郑州市",
            "ProvinceText": "河南省"
        },
            "WH27", "CCPG"]
    },
    {
        "name": "白鸽岛尚",
        "value": ["104.0023619", "30.71485174", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD14", "CCPG"]
    },
    {
        "name": "鑫源御景尚都一期",
        "value": ["120.4377136", "36.31316604", 80, {
            "CityText": "青岛市",
            "ProvinceText": "山东省"
        },
            "JN19", "CCPG"]
    },
    {
        "name": "长沙绿地新都会售楼处（前期）",
        "value": ["112.9793528", "28.21347823", 80, {
            "CityText": "长沙市",
            "ProvinceText": "湖南省"
        },
            "CS39", "CCPG"]
    },
    {
        "name": "华府西苑",
        "value": ["104.0614704", "30.56176797", 80, {
            "CityText": "成都市",
            "ProvinceText": "四川省"
        },
            "CD25", "CCPG"]
    },
    {
        "name": "（杭州）左右商务中心",
        "value": ["120.2193754", "30.25924446", 80, {
            "CityText": "杭州市",
            "ProvinceText": "浙江省"
        },
            "SH78", "CCPG"]
    }];
/*停车场数据*/
/*首页地图操作*/
var operatorGeo=function (options) {
    var that=this;

    that.options={//配置项
        ManagementCode:'',//具体项目编号
        ParentCode:'',//具体项目的父编码
        ele:null,//echarts实例对象
        titleInfoName:null,//标题地名对象
        data:null,//加盟商、项目和网点数据
        geoCoordMap:null,//地图数据
        geoPath:null,//地图json数据的路径
        option:null,//echarts参数
        params:{},//请求接口的参数
        url:null,//接口地址
        clickLock:{//点击事件锁
            click:true
        },
        monitorVideoUri:'',//点击的视频路径
        timer:{}//定时器
    }

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
};

operatorGeo.prototype={
    init:function () {
        var that=this;

        that.initOption();//初始化配置echarts参数
        that.loadMap('china','IParkService');//修改地图
        that.click();//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
    },
    initOption:function () {//配置echarts参数
        var that=this;
        var options=that.options;

        options.option = {
            tooltip : {
                trigger: 'item',
                //triggerOn:'click',//鼠标点击时触发
                enterable:true,//鼠标是否能进入提示框内
                formatter: function (params, ticket, callback) {
                    var content='';

                    if(params.value!=undefined){
                        content='<p style="text-align: center;">'
                            +'<span class="dpb" style="padding-top:18px;padding-bottom:10px;font-family:微软雅黑;font-size: 1.5rem;color: #ffffff;">'+params.name+'</span>'
                            +'<span class="dpb" style="font-family:微软雅黑;font-size: 0.875rem;color: #898a95;">'+params.value[3].ProvinceText+params.value[3].CityText+'</span>'
                            +'</p>';
                    }

                    /*设置是否要设置新的提示浮窗的样式*/
                    localStorage.modifyTooltip=true;
                    /*设置是否要设置新的提示浮窗的样式*/
                    
                    return content;
                }
            },
            legend: {
                orient: 'vertical',
                bottom: 60,
                left:80,
                itemGap:18,
                itemWidth:28,
                itemHeight:18,
                padding:[0,0,0,0],
                data:[],
                textStyle: {
                    color: '#fff',
                    fontFamily:'微软雅黑 Light',
                    fontSize:'18'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                //roam: true,//是否开启鼠标缩放和平移漫游。默认不开启
                itemStyle: {
                    normal: {
                        areaColor: '#13548d',
                        borderColor: '#48c7ff',
                        borderWidth:2,
                    },
                    emphasis: {
                        areaColor: '#ffce00',
                        shadowColor:'rgba(30,29,27,1)',
                        shadowBlur:60
                    }
                }
            }
        };

        options.option.geo.regions=that.setRegions(china);//设置区域颜色
        options.ele.setOption(options.option);
    },
    setRegions:function (regionsJson) {//设置区域颜色
        var colors=['#083967','#13548d','#1c74b2'];
        var colorsLen=colors.length;
        var features=regionsJson.features;
        var echatsRegions=[{
            name: '南海诸岛',
            value: 0,
            itemStyle: {
                normal: {
                    opacity: 0,
                    label: {
                        show: false
                    }
                }
            }
        }];

        for(var i=0,len=features.length;i<len;i++){
            var regionsItem={
                name:features[i].properties.name,
                itemStyle: {
                    normal: {
                        areaColor: colors[Math.floor(Math.random()*colorsLen)]
                    },
                }
            };
            echatsRegions.push(regionsItem);
        }

        return echatsRegions;
    },
    setData:function (data) {//设置加盟商、项目和网点数据
        var that=this;
        var options=that.options;

        options.data=data;
    },
    setGeoCoordMap:function (data) {//地图数据
        var that=this;
        var options=that.options;

        options.geoCoordMap=data;
    },
    setSeries:function (normalData,parkActiveData) {//设置系列列表
        var that=this;
        var options=that.options;

        options.option.series =[
            {
                name: '正常',
                type: 'scatter',
                coordinateSystem: 'geo',
                data:normalData ,
                symbolSize:[8,8],
                // symbolSize:[4,4],
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderType:'solid',
                        borderWidth:2,
                        borderColor:'#ffffff',
                        color: '#00d0e4',
                        fontWeight:'bolder',
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    }
                }
            },
            {
                name: '停车场静态数据',
                type: 'scatter',
                coordinateSystem: 'geo',
                data:arrStaticParkData ,
                symbolSize:[8,8],
                // symbolSize:[4,4],
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 255, 255,0.35)',
                        fontWeight:'bolder',
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    }
                }
            },
            {
                name: '预警提示',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: parkActiveData ,
                symbolSize: [12,12],
                // symbolSize: [6,6],
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ff7800',
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(255, 68, 0, 1)',
                        shadowBlur: 10
                    }
                },
                zlevel: 1
            }
        ];
    },
    setUrl:function () {//设置接口访问地址
        var that=this;
        var options=that.options;

        that.clearUrl();//清空接口地址

        options.url=localStorage.server_ip+'/api/Standard/PostServices';
    },
    clearUrl:function () {//清空接口地址
        var that=this;
        var options=that.options;

        options.url=null;
    },
    setParams:function (paramsName,Code) {//设置请求接口参数
        var that=this;
        var options=that.options;

        that.clearParams(paramsName);

        switch (paramsName){
            case 'IParkService':
                    options.params[paramsName]={_service: 'Monitor.Services.IParkService',
                        service_assembly: 'Monitor.Services',service_method: 'GetParkList'
                    };
                break;
            case 'SetMemberInfor':
                options.params[paramsName]={
                    _service: 'Monitor.Services.ISetOrGetMemberCacheServices',
                    service_assembly: 'Monitor.Services',service_method: 'SetMemberInfor',
                    requstInfor:{
                        Code:options.ManagementCode,
                        PCode:options.ParentCode
                    }
                }
                break;
            case 'LoadVideoUri':
                options.params[paramsName]={
                    _service: 'Monitor.Services.IVideoChoosedServices',
                    service_assembly: 'Monitor.Services',service_method: 'LoadVideoUri',
                    requstInfor:{
                    }
                }
                break;
            case 'RemoveVideoUri':
                options.params[paramsName]={_service: 'Monitor.Services.IVideoChoosedServices',
                    service_assembly: 'Monitor.Services',service_method: 'SetVideoUri',
                    uri:options.monitorVideoUri,
                    st:1
                };
                break;
        }
    },
    clearParams:function (paramsName) {//清空请求接口参数
        var that=this;
        var options=that.options;

        options.params[paramsName]=null;
    },
    toJson:function (data) {//将字符串转换成json对象
        return JSON.parse(data);
    },
    toLowerCase:function (str) {//将字符串转换成效写
        if(str==null||str==undefined){
            return '';
        }

        return str.toString().toLowerCase();
    },
    checkString:function (str) {//验证是否为null或undefined，并对其进行转换
        if(str==null||str==undefined){
            str='';
        }

        return str;
    },
    convertData:function (data) {//拼接报警数据和地图数据
        var that=this;
        var options=that.options;

        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = options.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value,data[i].region,data[i].Code,data[i].ParentCode)
                });
            }
        }
        return res;
    },
    setTitleInfoName:function () {//设置标题地名
        var that=this;
        var options=that.options;
        var strTitleInfoName='全国'
        $(options.titleInfoName).text(strTitleInfoName);
    },
    getData:function (resultData) {//获取所有数据
        var that=this;
        var options=that.options;
        var resultDataLength=resultData.length;
        var arrData=[];
        var arrGeoCoorMap={};

        for(var i=0;i<resultDataLength;i++){
            var temp_data={name:resultData[i].ParkName,value:80,region:{
                ProvinceText:resultData[i].ProvinceText,
                CityText:resultData[i].CityText
            },Code:resultData[i].ParkCode,ParentCode:resultData[i].ParentCode};
            arrData.push(temp_data);
            arrGeoCoorMap[resultData[i].ParkName]=[resultData[i].Longitude,resultData[i].Latitude];
        }
        that.setData(arrData);//设置加盟商、项目和网点数据
        that.setGeoCoordMap(arrGeoCoorMap);//设置地图数据

        // console.log(that.convertData(options.data));

        var normalData=that.convertData(options.data);
        console.log(normalData);
        var parkActiveData=[];

        that.setSeries(normalData,parkActiveData);//设置系列列表
    },
    setClickLock:function (lockName,value) {//设置点击事件锁
        var that=this;
        var options=that.options;

        options.clickLock[lockName]=value;
    },
    loadMap:function(maps,paramsName){//修改地图
        var that=this;
        var options=that.options;

        if(maps=='china'||maps==undefined || maps==null)
        {
            maps='china';
            options.chineseName='全国';
            options.geoLevel=0;
        }

        that.setTitleInfoName();//设置标题地名
        that.setUrl();//设置接口访问地址
        that.setParams(paramsName);//设置请求接口参数


        if('china'==maps){
            // console.log(options.params[paramsName]);
            ajaxCall(options.url,options.params[paramsName],function (data) {
                //报警数据
                data=that.toJson(data);
                console.log(data);
                var resultCode=data.Code;
                var resultData=data.Data;

                if(resultCode==200){
                    if(resultData!=undefined&&resultData!=null){
                        that.getData(resultData);//获取加盟商数据
                    }
                    options.option.geo.map=maps;//配置echarts参数
                    options.ele.setOption(options.option);
                    that.setClickLock('click',true);//设置点击事件锁
                    that.loadeVideo();//获取监控视频信息
                }else{
                    // alert(data.Message);
                }
            });
        }

    },
    loadeVideo:function () {//获取监控视频信息
        var that=this;
        var options=that.options;
        var paramName='LoadVideoUri';

        that.clearTimer(paramName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        options.timer[paramName]=setTimeout(function () {
            ajaxCall(options.url,options.params[paramName],function (data) {
                data=that.toJson(data);
                if(data!=undefined&&data!=null){
                    if(options.monitorVideoUri==''){
                        options.monitorVideoUri=data;
                    }else{
                        if(options.monitorVideoUri==data){
                            return;
                        }else{
                            options.monitorVideoUri=data;
                        }
                    }
                    var strMonitorVideo='';
                    // strMonitorVideo='<object type="application/x-vlc-plugin" id="vlc_2" events="True" pluginspage="http://www.videolan.org" codebase="http://downloads.videolan.org/vlc/last/vlc-2.2.2.tar.xz">'
                    //     + '<param name="mrl" value="'+that.toJson(data)+'" />'
                    //     + '<param name="volume" value="50" />'
                    //     + '<param name="autoplay" value="true" />'
                    //     +'<param name="loop" value="false" />'
                    //     +'<param name="fullscreen" value="false" />'
                    //     +'</object>';

                    // $(options.videoMakser).find('.monitor_video').html(strMonitorVideo);
                    if(data!=''){
                        var  vlc=document.getElementById("vlc_2");
                        $(options.videoMakser).show();

                        var vedio_url=data;
                        var  itemId= vlc.playlist.add(vedio_url);
                        vlc.playlist.playItem(itemId);

                        that.RemoveVideoUri();//移除视频地址缓存

                        $(vlc).css({width:'1281px',height:'720px'});
                    }
                    
                    that.loadeVideo();//获取监控视频信息
                }
            });
        },iLongTime);
    },
    clearTimer:function (timerName) {//清除定时器
        var that=this;
        var options=that.options;

        clearTimeout(options.timer[timerName]);
    },
    click:function () {//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
        var that=this;
        var options=that.options;

        options.ele.on('click',function (params) {
            if(params.componentType=="geo"||!options.clickLock['click']){
                return;
            }

            console.log(params);
            that.setMemberInfor(params.value[4],params.value[5]);
            that.setClickLock('click',false);//设置点击事件锁
        });
    },
    setMemberInfor:function (Code,ParentCode) {//设置选择项目
        var that=this;
        var options=that.options;
        var paramName='SetMemberInfor';

        options.ManagementCode=Code;//设置具体项目编号
        options.ParentCode=ParentCode;//设置具体项目的父编码
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        ajaxCall(options.url,options.params[paramName],function (data) {
            data=that.toJson(data);

            if(data.Code==200){
                console.log(data.Message);
            }
            that.setClickLock('click',true);//设置点击事件锁
            var normalData=that.convertData(options.data);
            var normalDataLen=normalData.length;
            var parkActiveData=[];

            for(var i=0;i<normalDataLen;i++){
                if(that.toLowerCase(Code)==that.toLowerCase(normalData[i].value[4])){
                    parkActiveData.push(normalData[i])
                }
            }

            that.setSeries(normalData,parkActiveData);//设置系列列表
            options.ele.setOption(options.option);
        });
    },
    RemoveVideoUri:function () {//移除视频地址缓存
        var that=this;
        var options=that.options;
        var paramName='RemoveVideoUri';

        that.setParams(paramName);//设置请求接口参数

        ajaxCall(options.url,options.params[paramName],function (data) {
            if(data=='true'){
                console.log('清除缓存成功');
            }else{
                console.log('清除缓存失败');
            }
        });
    }
};
/*首页地图操作*/
/*关闭弹窗事件*/
function hideMakser(id) {
    $(id).hide();
}
/*关闭弹窗事件*/





