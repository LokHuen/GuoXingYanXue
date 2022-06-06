/**
 * 通过微信api实时获取到的图片，格式是 arraybuffer，转为base64位是一个比较耗时，耗内存的工作
 * 在iPhone 7-8的机型上测过，即使在最低像素下的arraybuffer转为base64位还是会有延迟和卡顿
 * 因此将这部分放在worker上去处理
 * */
//
const upng = require("./UPNG.js");
worker.onMessage((msg) => {
  try {
    const pngData = upng.encode([msg.buffer], msg.width, msg.height, 16, 0);
    worker.postMessage({ buffer: pngData, index: msg.index });
  } catch (error) {
    console.log("upng.encode error");
  }
});
