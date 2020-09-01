App({
 globalData: {},
 onLaunch() {
	 try {
	   const res = wx.getSystemInfoSync()
	   this.globalData.windowWidth = res.windowWidth;
	   this.globalData.windowHeight = res.windowHeight;
	   console.log(this.globalData)
	 } catch (e) {}
 }
})