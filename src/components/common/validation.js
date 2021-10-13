const form = {
  // 非必填情况下,如果值为空,则不进行校验
  // 全局 name不能相同 相同就有问题 待解决
  // 当出现错误时返回错误消息，否则返回空即为验证通过
  //  formData:Object 表单对象。
  // 	{key:value,key:value},key==rules.name
  // 	rules: Array [{name:name,rule:[],msg:[]},{name:name,rule:[],msg:[]}]
  // 	name:name 属性=> 元素的名称
  // 	rule:字符串数组 [
  // 		"required",
  // 		"isMobile",
  // 		"isEmail",
  // 		"isCarNo",
  // 		"isIdCard",
  // 		"isAmount",
  // 		"isNum",
  // 		"isChinese",
  // 		"isEnglish",
  // 		isEnAndNo",
  // 		"isSpecial",
  // 		"isEmoji",
  // 		"isDate",
  // 		"isUrl",
  // 		"isSame:key",
  // 		"range:[1,9]",
  // 		"minLength:9",
  // 		"maxLength:Number"]
  // 	msg:数组 []。 与数组 rule 长度相同,对应的错误提示信息
  validation: function(formData, rules) {
    for (const item of rules) {
      const key = item.name;
      const rule = item.rule;
      const msgArr = item.msg;
      if (!key || !rule || rule.length === 0 || !msgArr || msgArr.length === 0) {
        continue;
      }
      for (let i = 0, length = rule.length; i < length; i++) {
        let ruleItem = rule[i];
        const msg = msgArr[i];
        if (
          !ruleItem ||
          !msg ||
          (!~rule.indexOf('required') && formData[key].toString().length === 0)
        ) {
          continue;
        }
        // 数据处理
        let value = null;
        if (~ruleItem.indexOf(':')) {
          const temp = ruleItem.split(':');
          ruleItem = temp[0];
          value = temp[1];
        }
        let isError = false;
        switch (ruleItem) {
          case 'required':
            isError = form._isNullOrEmpty(formData[key]);
            break;
          case 'isMobile':
            isError = !form._isMobile(formData[key]);
            break;
          case 'isEmail':
            isError = !form._isEmail(formData[key]);
            break;
          case 'isCarNo':
            isError = !form._isCarNo(formData[key]);
            break;
          case 'isIdCard':
            isError = !form._isIdCard(formData[key]);
            break;
          case 'isAmount':
            isError = !form._isAmount(formData[key]);
            break;
          case 'isNum':
            isError = !form._isNum(formData[key]);
            break;
          case 'isChinese':
            isError = !form._isChinese(formData[key]);
            break;
          case 'isEnglish':
            isError = !form._isEnglish(formData[key]);
            break;
          case 'isEnAndNo':
            isError = !form._isEnAndNo(formData[key]);
            break;
          case 'isEnOrNo':
            isError = !form._isEnOrNo(formData[key]);
            break;
          case 'isSpecial':
            isError = form._isSpecial(formData[key]);
            break;
          case 'isEmoji':
            isError = form._isEmoji(formData[key]);
            break;
          case 'isDate':
            isError = !form._isDate(formData[key]);
            break;
          case 'isUrl':
            isError = !form._isUrl(formData[key]);
            break;
          case 'isSame':
            isError = !form._isSame(formData[key], formData[value]);
            break;
          case 'range':
            // eslint-disable-next-line no-case-declarations
            let range = null;
            try {
              range = JSON.parse(value);
              if (range.length <= 1) {
                throw new Error('range值传入有误！');
              }
            } catch (e) {
              return 'range值传入有误！';
            }
            isError = !form._isRange(formData[key], range[0], range[1]);
            break;
          case 'minLength':
            isError = !form._minLength(formData[key], value);
            break;
          case 'maxLength':
            isError = !form._maxLength(formData[key], value);
            break;
          default:
            break;
        }
        if (isError) {
          return msg;
        }
      }
    }
    return '';
  },
  _isNullOrEmpty: function(value) {
    return !!(value === null || value === '' || value === undefined);
  },
  _isMobile: function(value) {
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
  },
  _isEmail: function(value) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      value
    );
  },
  _isCarNo: function(value) {
    // 新能源车牌
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    // 旧车牌
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  },
  _isIdCard: function(value) {
    const idCard = value;
    if (idCard.length === 15) {
      return this.__isValidityBrithBy15IdCard;
    } else if (idCard.length === 18) {
      const arrIdCard = idCard.split('');
      if (
        this.__isValidityBrithBy18IdCard(idCard) &&
        this.__isTrueValidateCodeBy18IdCard(arrIdCard)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  __isTrueValidateCodeBy18IdCard: function(arrIdCard) {
    // 第二代身份证，18位 XXXXXX yyyy MM dd 375 0
    // 1-6位为地区编码
    // 7-10  出身年份 4位，第一代身份证只有两位
    // 11-14 出身年月日 4位
    // 15-18 顺序码+校验码 18位身份证4位，最后一位可能是X, 15位身份证顺序码3位，没有校验码
    // 18位的身份证正则：
    // [1-9]\d{5}                 前六位地区，非0打头
    // (18|19|([23]\d))\d{2}      出身年份，覆盖范围为 1800-3999 年
    // ((0[1-9])|(10|11|12))      月份，01-12月
    // (([0-2][1-9])|10|20|30|31) 日期，01-31天
    // \d{3}[0-9Xx]：              顺序码三位 + 一位校验码
    let sum = 0;
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    if (arrIdCard[17].toLowerCase() === 'x') {
      arrIdCard[17] = 10;
    }
    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * arrIdCard[i];
    }
    const valCodePosition = sum % 11;
    if (arrIdCard[17] === ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  },
  __isValidityBrithBy18IdCard: function(idCard18) {
    const year = idCard18.substring(6, 10);
    const month = idCard18.substring(10, 12);
    const day = idCard18.substring(12, 14);
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (
      temp_date.getFullYear() !== parseFloat(year) ||
      temp_date.getMonth() !== parseFloat(month) - 1 ||
      temp_date.getDate() !== parseFloat(day)
    ) {
      return false;
    } else {
      return true;
    }
  },
  __isValidityBrithBy15IdCard: function(idCard15) {
    // 第一代身份证，15位 XXXXXX yy MM dd 75 0
    // 15位的身份证：
    // [1-9]\d{5}                  前六位地区，非0打头
    // \d{2}                       出生年份后两位00-99
    // ((0[1-9])|(10|11|12))       月份，01-12月
    // (([0-2][1-9])|10|20|30|31)  日期，01-31天
    // \d{3}                       顺序码三位，没有校验码
    const year = idCard15.substring(6, 8);
    const month = idCard15.substring(8, 10);
    const day = idCard15.substring(10, 12);
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    if (
      temp_date.getYear() !== parseFloat(year) ||
      temp_date.getMonth() !== parseFloat(month) - 1 ||
      temp_date.getDate() !== parseFloat(day)
    ) {
      return false;
    } else {
      return true;
    }
  },
  _isAmount: function(value) {
    // 金额，只允许保留两位小数
    return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
  },
  _isNum: function(value) {
    // 只能为数字
    return /^[0-9]+$/.test(value);
  },
  _isChinese: function(value) {
    const reg = /.*[\u4e00-\u9fa5]+.*$/;
    return value !== '' && reg.test(value) && !form._isSpecial(value) && !form._isEmoji(value);
  },
  _isEnglish: function(value) {
    return /^[a-zA-Z]*$/.test(value);
  },
  _isEnAndNo: function(value) {
    // 8~20位数字和字母组合
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
  },
  _isEnOrNo: function(value) {
    // 英文或者数字
    const reg = /.*[\u4e00-\u9fa5]+.*$/;
    let result = true;
    if (reg.test(value) || form._isSpecial(value) || form._isEmoji(value)) {
      result = false;
    }
    return result;
  },
  _isSpecial: function(value) {
    // 是否包含特殊字符
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
      return true;
    }
    return false;
  },
  _isEmoji: function(value) {
    // 是否包含表情
    return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value);
  },
  _isDate: function(value) {
    // 2020-05-18
    const reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
    return reg.test(value);
  },
  _isUrl: function(value) {
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
  },
  _isSame: function(value1, value2) {
    return value1 === value2;
  },
  _isRange: function(value, range1, range2) {
    if (!range1 && range1 !== 0 && !range2 && range2 !== 0) {
      return true;
    } else if (!range1 && range1 !== 0) {
      return value <= range2;
    } else if (!range2 && range2 !== 0) {
      return value >= range1;
    } else {
      return value >= range1 && value <= range2;
    }
  },
  _minLength: function(value, min) {
    return value.length >= Number(min);
  },
  _maxLength: function(value, max) {
    return value.length <= Number(max);
  },
};
module.exports = {
  validation: form.validation,
};
