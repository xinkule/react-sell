function padLeftZero(str) {
  return (`00${str}`).substr(str.length);
}

export default function formatDate(date, format) {
  let fmt = null;
  if (/(y+)/.test(format)) {
    fmt = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  const object = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  Object.keys(object).forEach((key) => {
    if (new RegExp(`(${key})`).test(fmt)) {
      const value = `${object[key]}`;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? value : padLeftZero(value));
    }
  });
  return fmt;
}
