/**
 * 函数防抖 将多次操作合并为一次操作进行，一直点击会把方法一直延迟执行
 * @param {*} cb
 * @param {*} ms
 */

export const debounce = (cb, ms) => {
  let timer = null;
  return function (...params) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, params);
    }, ms);
  };
};
/**
 * 节流 使得一定时间内只触发一次函数
 * @param {*} cb
 * @param {*} interval || 500
 */

export function throttle(cb, interval, firstTime = true) {
  let timer = null;
  return function () {
    let args = arguments;
    if (firstTime) {
      cb.apply(this, args);
      return (firstTime = false);
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      cb.apply(this, args);
    }, interval || 500);
  };
}
/**
 * 获取本地的IP地址 TODO：尝试获取本地的IP地址没有效果
 * */
export function getLocalIPAddress() {
  const interfaces = require("os").networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return;
}

// 手机号中间四位格式化,显示加密
// 从后往前，后四位正常，再四位 * 显示， 前面任意字符正常显示 防止传 areaCode
export function mobileEncrypt(params = null) {
  if (!params) return;
  return params.toString().replace(/(.)\d{4}(\d{4})$/, "$1****$2");
}

export const isChinaMobile = (mobile, code) => {
  if (!mobile) {
    return false;
  }

  // 如果有传区号，并且区号不等于 +86 同时不等于 86 则认为是非中国区手机号，直接返回true
  if (code && String(code) !== "+86" && String(code) !== "86") {
    return true;
  }

  if (
    /^\+((?!(86|1|81|65))[0-9]\d{7,}|(1)[0-9]{10}|(81)[0-9]{11}|(65)[0-9]{8})$/.test(
      mobile
    )
  ) {
    return true;
  }

  if (
    /^(13[0-9]|15[012356789]|17[01235678]|18[0-9]|14[579]|19[189]|16[0-9])[0-9]{8}$/.test(
      mobile
    )
  ) {
    return true;
  }

  return false;
};

export function sleep(time = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 计算两个经纬的距离
export function getLatLngDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = (lat1 * Math.PI) / 180.0;
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

/**
 * 逆地址解析
 *
 * @param {Object} options 接口参数对象
 *
 * 请求参数结构可以参考
 * http://lbs.qq.com/webservice_v1/guide-gcoder.html
 */
export const reverseGeocoder = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const data = {
      coord_type: 5,
      get_poi: 0,
      output: "json",
      key: "",
      location: `${lat},${lng}`,
    };
    uni.request({
      url: "https://apis.map.qq.com/ws/geocoder/v1/",
      method: "GET", //请求方法
      header: { "content-type": "application/json" },
      data, //请求参数
      success: (res) => {
        //成功回调
        resolve(res);
      },
      fail: reject,
    });
  });
};

/**
 * text 微信授权需要的 比如 scope.camera
 * params 弹窗上面的文字
 * */
export const getSetting = (text, params) => {
  return new Promise((resolve) => {
    if (!text) resolve(false);
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting[text]) {
          wx.authorize({
            scope: text,
            success: () => {
              resolve(true);
            },
            fail: () => {
              showToast("获取权限失败", false);
              setTimeout(() => {
                wx.showModal({
                  content: `申请获取${params || ""}权限`,
                  success: (a) => {
                    a.confirm && wx.openSetting();
                  },
                  complete: () => {
                    resolve(false);
                  },
                });
              }, 1000);
            },
          });
        } else {
          resolve(true);
        }
      },
      fail: () => {
        showToast("获取权限失败", false);
        resolve(false);
      },
    });
  });
};

/**
 * 弹窗统一入口，用于自定义弹窗上的icon图标和防止文字过长
 * */
export const showToast = (title = "", isSuccess = true, duration = 1500) => {
  const info = { title, duration };
  if (title.length < 8) {
    info.image = isSuccess
      ? "/static/toast/success.png"
      : "/static/toast/fail.png";
  } else {
    info.icon = "none";
  }
  wx.showToast(info);
};

/**
 * 合并配置
 * */
export const assignConfig = () => {
  // 合并config的数据
  const defaultConfig = require("@/config/default.js");
  try {
    // 如果拿不到小程序的环境变量，则视为是正式环境
    const envVersion =
      uni.getAccountInfoSync().miniProgram.envVersion ||
      __wxConfig.envVersion ||
      "release";
    if (envVersion === "develop") {
      return Object.assign(defaultConfig, require("@/config/develop.js"));
    } else if (envVersion === "trial") {
      return Object.assign(defaultConfig, require("@/config/trial.js"));
    } else if (envVersion === "release") {
      return Object.assign(defaultConfig, require("@/config/release.js"));
    }
  } catch (error) {
    console.warn("assgin config error = ", error);
  }
  return defaultConfig;
};

/**
 * 检查小程序是否有新版本更新
 * */
export const updateMini = () => {
  if (uni.canIUse("getUpdateManager")) {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: "更新提示",
            showCancel: false,
            content: "新版本已经准备好，是否重启应用？",
            success: (b) => {
              if (b.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            },
          });
        });
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          uni.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
          });
        });
      }
    });
  } else {
    uni.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
    });
  }
};

export const CONSTKEY = {
  // 项目中静态字段
  DOWNFINISH: "RADISHDOWNFINISH", // 下载完成 $once的key
  LOCALIMAGEKEY: "RADISHLOCALIMAGEKEY", // 临时图片在storage对应的key
  USERINFO: "RADISHUSERINFOKEY", // 授权后的用户基本信息
};
