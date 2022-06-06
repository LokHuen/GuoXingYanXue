const error = [
  {
    code: "100",
    error_message: "缺少必要字段",
  },
  {
    code: "401",
    error_message: "jwt失效",
    message: "授权失败",
  },
  {
    code: "901",
    error_message: "第三方API异常",
  },
  {
    code: "999",
    error_message: "异常",
  },
];

export default function fetchMessage(params = 0) {
  // code = 0 表示是成功
  params = parseInt(params);
  if (params === 0) return;
  const single = error.find((item) => parseInt(item.code) === params);
  return single?.message || "网络繁忙";
}
