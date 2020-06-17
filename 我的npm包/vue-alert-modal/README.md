# alert-modal
loading框、Toast框、Modal框

# 快速上手
## 安装

```
npm install vue-alert-modal
```

## 全局注册（在main.js文件里注册）

```
import alertModal from 'vue-alert-modal/vue-alert-modal'
Vue.use(alertModal)
```

## 例子
loading框
```
this.$alert.showLoading({
	title: '正在加载中...'
})

this.$alert.hideLoading()
```
Modal框
```
this.$alert.showModal({
	title: '提示',
	content: '确认框',
	confirmClick: function (res) {
	  console.log('成功')
	},
	cancelClick: function (res) {
	  console.log('失败')
	}
})
```
Toast框
```
this.$alert.showToast({
	title: '成功',
	icon: 'success',
	duration: 3000
})
icon取值 'success' 'loading' 'none' 默认'loading'  不指定和none同效果，不显示icon
```