// // 添加滤镜
// document.getElementById('changeFilterBtn').addEventListener('click', function () {
//   chrome.tabs.executeScript({
//     code: 'document.documentElement.style.filter = "hue-rotate(180deg)"'
//   });
// });

// // 添加黑白滤镜
// document.getElementById('changeBlackFilterBtn').addEventListener('click', function () {
//   chrome.tabs.executeScript({
//     code: 'document.documentElement.style.filter = "grayscale(100%)"'
//   });
// });

//去除滤镜
// document.getElementById('resetFilterBtn').addEventListener('click', function () {
//   chrome.tabs.executeScript({
//     code: `document.documentElement.style.filter = "none"`
//   });
// });

//显示动画
// document.getElementById('addMMD').addEventListener('click', function () {
// 	console.log(window)
// 	window._initMikaTV_(document.getElementById('mikaRoot'),window.React,window.ReactDOM);
//   chrome.tabs.executeScript({
//     code: `window._initMikaTV_(document.getElementById('mikaRoot'),window.React,window.ReactDOM)`
//   });
// });
setTimeout(()=>{
	window.Ammo();
	window._initMikaTV_(document.getElementById('mikaRoot'),window.React,window.ReactDOM)
	// chrome.tabs.executeScript({
	//   code: `console.log('gggioa');window._initMikaTV_(document.getElementById('mikaRoot'),window.React,window.ReactDOM)`
	// });
},500)
