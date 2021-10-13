// 把数组转成对像
export function transferObj(arr) {
  const obj = {};
  arr.forEach(function(v, i) {
    obj[i] = v;
  });
  return obj;
}

// 把对像转成数组
export function transferArr(obj) {
  const arr = [];
  for (const key in obj) {
    arr.push(obj[key]);
  }
  return arr;
}

// 字符串分割成数组 str 字符串
export function splitStr(str) {
  if (str) {
    return str.split(' ')[0];
  } else {
    return false;
  }
}

// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。函数防抖是某一段时间内只执行一次
export function debounce(fun, delay) {
  return function(args) {
    const that = this;
    const _args = args;
    clearTimeout(fun.id);
    fun.id = setTimeout(() => {
      fun.call(that, _args);
    }, delay);
  };
}

// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。函数节流是间隔时间执行
export function throttle(fn, delay) {
  let timer = true;
  return function(args) {
    const that = this;
    const _args = arguments;
    if (!timer) {
      return false;
    }
    timer = false;
    setTimeout(() => {
      fn.apply(that, _args);
      timer = true;
    }, delay);
  };
}
