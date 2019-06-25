function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
export function formatTime (da) {
  let date = new Date(da);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
export function getParam (search) {
  let q = {};
  search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v); // eslint-disable-line
  return q;
}

export {adImg};
