import fetchMessage from "./error.js";
import { showToast } from "@/utils/common.js";
import store from "@/store/index.js";
// uni下通过store去获取domain似乎是获取不到，做灾备，把config的数据都绑在globalData上
function getUrlPath() {
  try {
    return store.getters?.domain || getApp().globalData?.config?.domain || "";
  } catch (e) {
    return "";
  }
}

function getToken() {
  try {
    // return store.getters?.token || getApp().globalData?.token || "";
	return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MWUxOTk1LWE1NDQtNDNlYi1hODkwLWFjNTcxMjdiZDRhMSIsImlhdCI6MTY1MjY4NjcxMH0.eLu0dnHcyJyUQdmsoWgX5DZDDp0LDGIELSKAUmcYPPE"
  } catch (e) {
    return "";
  }
}

async function httpFetch(
  params = {
    url: null, // 请求域名
    path: null, // 请求相对路径
    data: {}, // 传入的参数
    method: "POST",
  },
  isShowMask = true,
  isShowToast = true
) {
  if (isShowMask) {
    uni.showLoading({ title: "加载中", mask: true });
  }
  // 将传入的参数组装成数组
  params = Array.isArray(params) ? params : [params];
  const requestList = params.map((item) => {
    const url = (item.url || "") + item.path;
    const method = item.method || "POST";
    const data = item.data || {};
    const token = item.token || "";
    return request(url, method, data, token);
  });
  const resultList = await Promise.all(requestList).catch((res) => res);
  console.log("http请求参数", params);
  console.log("http请求结果", resultList[0]);
  const errorInfo = resultList.find((item) => !item.isSuccess);
  if (errorInfo && isShowToast) {
    try {
      const title = fetchMessage(errorInfo.code) || "网络繁忙";
      showToast(title, false);
    } catch (e) {
      isShowMask && uni.hideLoading();
    }
  } else {
    isShowMask && uni.hideLoading();
  }
  return resultList?.length === 1 ? resultList[0] : resultList;
}

function request(url = "", method = "POST", data = {}, token = null) {
  return new Promise((resolve) => {
    uni.request({
      url,
      method, //请求方法
      header: {
        "content-type": "application/json", // 默认header头
        Authorization: `Bearer ${token || ""}`,
      },
      data, //请求参数
      success: (res) => {
        //成功回调
        resolve(
          Object.assign(
            {},
            {
              data: res.data.data || null,
              isSuccess: parseInt(res.data.code) === 0 || false,
              message: res.data.message || null,
              code: parseInt(res.data.code) || 0,
            },
            res.data
          )
        );
      },
      fail: () => {
		 console.log(11111);
        //失败回调
        resolve({ data: null, message: `网络繁忙`, isSuccess: false });
      },
    });
  });
}

export default function fetch(params = {}, ...args) {
  return httpFetch(
    Object.assign({
      url: getUrlPath(),
      token: getToken(),
      ...params,
      data: params.data || {},
    }),
    ...args
  );
}
