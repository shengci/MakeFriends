const app = getApp()

Page({
	data: {
		longitude: "",
		latitude: "",
		markers: {},
		controls: [{
			      iconPath: '/resources/head.png',
			      position: {
			        left: (app.globalData.windowWidth / 2) - 15,
			        top: ((app.globalData.windowHeight -40) / 2) - 15,
			        width: 30,
			        height: 30
			      }
		},
		{
			      id: 1,
			      iconPath: '/resources/body.png',
			      position: {
			        left: 20,
			        top: app.globalData.windowHeight - 90,
			        width: 30,
			        height: 30
			      },
			      clickable: true
		}]
	},
	onShow() {
		this.getLocation();
		this.getMessages();
	},
	
	getMessages() {
		wx.request({
		  url: 'https://api.asilu.com/geo/', //仅为示例，并非真实的接口地址
		  data: {
		  },
		  header: {
		    'content-type': 'application/json' // 默认值
		  },
		  success: this.getMessagesSucc.bind(this)
		})
	},
	
	getMessagesSucc(res) {
		console.log(res.data)
		this.setData({
			  markers: [{
				  iconPath: "/resources/ic.jpg",
				  id: res.data.ip,
				  latitude: res.data.gcj.lat,
				  longitude: res.data.gcj.lng,
				  width: 50,
				  height: 50
			  }]
		})
		console.log(this.data)
	},
	
	onReady() {
		 this.mapCtx = wx.createMapContext('map')
	},
	
	getLocation() {
		wx.getLocation({
		 type: 'gcj02',
		 success: this.handleGetLocationSucc.bind(this)
		})
	},
	
	handleGetLocationSucc(res) {
		this.setData({
			longitude: res.longitude,
			latitude: res.latitude
		})
	},
	
	controltap() {
		this.mapCtx.moveToLocation();
	},
	
	handleMarkerTap(e) {
		wx.navigateTo({
		  url: '/pages/detail/detail?id=' + e.markerId,
		})
	},
	
  onShareAppMessage () {
      return {
        title: '萌宠交易平台',
        path: '/pages/index/index'
      }
    }
})
