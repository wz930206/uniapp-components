// 字符串分割成数组 str 字符串
export const splitStr = (str) => {
  if (str) {
    return str.split(' ')[0];
  } else {
    return '';
  }
};
