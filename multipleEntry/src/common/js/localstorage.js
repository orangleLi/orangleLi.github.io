// 封装操作localstorage本地存储的方法

const storage = {
//  存储
  set (key, value) {
    localStorage.setItem(key, value);
  },
  get (key) {
    return localStorage.getItem(key);
  },
  remove (key) {
    localStorage.removeItem(key);
  }
};
export default storage;
