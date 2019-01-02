
/* 公共方法 */

import hexSha1 from 'sha1'
import {cookieName} from './config'

// 获取cookie
const fGetCookieMes = (key) => {
  let strCookie = document.cookie
  strCookie = strCookie.replace(/\s/g, '')
  let arrCookie = strCookie.split(';')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (key === arr[0] && arr[1] !== '') {
      return arr[1]
    }
  }
  return ''
}

// 设置cookie
export const fSetCookieMes = (key, val, expiresDays = 30) => {
  let date = new Date()
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000)
  document.cookie = `${key}=${val};=${date.toGMTString()};path=/`
}

const fUtf16to8 = (str) => {
  let out = ''
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

// 获取签名
const fGetSig = (url, body) => {
  let sig = ''
  let keyValues = url.substring(url.indexOf('?') + 1).split('&')
  let keys = []
  let map = {}
  for (let i = 0; i < keyValues.length; i++) {
    if(keyValues[i]){
      let kp = keyValues[i].split('=')
      keys[keys.length] = kp[0]
      map[kp[0]] = kp[1]
    }
  }
  keys.sort()
  let sigStr = ''
  for (let i = 0; i < keys.length; i++) {
    sigStr += `${keys[i]}=${map[keys[i]]}&`
  }

  let sigUrl = url.substring(url.indexOf('//') + 2)

  let sigUrl2 = sigUrl.substring(sigUrl.indexOf('/'), sigUrl.indexOf('?'))
  sigStr = `${sigUrl2}?${sigStr}`

  if (body === '' || body == null) {
    sig = hexSha1(sigStr + fGetCookieMes(cookieName.token))
  } else {
    sig = hexSha1(`${sigStr}${JSON.stringify(body)}&${fGetCookieMes(cookieName.token)}`)
  }
  return sig
}

// 获取当前时间戳
const fGetTs = () => {
  return parseInt(new Date().getTime() / 1000)
}

// 获取随机六位数
const fGetNonce = () => {
  let nonce = ''
  for (let i = 0; i < 6; i++) {
    nonce += Math.floor(Math.random() * 10)
  }
  return nonce
}

// 获取url
const fGetUrl = (options) => {
  let {url, method = 'get', params = {}, sig} = options
  url = url + '?';
  //get请求将parms拼接到url上
  if (method == "get") {
    for (var keys in params) {
      if (params.hasOwnProperty(keys)) {
        url = url + '&' + keys + '=' + params[keys]
      }
    }
  }
  //拼接签名
  if (sig) {

    let userId = fGetCookieMes(cookieName.uid) || 0
    url += `&user_id=${userId}`
    url += `&ts=${fGetTs()}&nonce=${fGetNonce()}`
    if (typeof(params) === "string") {
      params = JSON.stringify(params);
    }
    let sig = fGetSig(url, method=='post'?params:null)
    url += `&sig=${sig}`
  }

  return url
}

export const checkEmail = (email) => {
  let emailPatten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
  return emailPatten.test(email)

}
export const checkPhone = (phone) => {
  let phonePatern = new RegExp(/^(13|14|15|18|17|16)\d{9}$/);
  return phonePatern.test(phone)

};


const format = (obj, fmt) => {
  var o = {
    'Y+': obj.getFullYear(),
    "M+": obj.getMonth() + 1, //月份
    "d+": obj.getDate(), //日
    "h+": obj.getHours(), //小时
    "m+": obj.getMinutes(), //分
    "s+": obj.getSeconds(), //秒
    "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
    "S": obj.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//时间转义
const dataFormat = (formatStr, ctime) => {

  var now = new Date(parseInt(ctime) * 1000);

  var dateformat = format(now, formatStr);

  return dateformat;
}

const fGetLocalTime = () => {
  let getTs = fGetCookieMes('ts') || 0;
  return Date.parse(new Date()) / 1000 - getTs;
}

const tsoss = () => {
  let strCookie = document.cookie;
  let ts = 0;
  strCookie = strCookie.replace(/\s/g, "");
  let arrCookie = strCookie.split(';');
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if ("ts" == arr[0]) {
      ts = arr[1];
    }
  }
  return Date.parse(new Date()) / 1000 - ts;
}

//签名oss用
export const fGetSigTwo = (name, url, body, version) => {
  let sig = "";
  let key_values = url.substring(url.indexOf('?') + 1).split('&');
  let keys = [];
  let map = {};
  for (let i = 0; i < key_values.length; i++) {
    let k_p = key_values[i].split('=');
    keys[i] = k_p[0];
    map[k_p[0]] = k_p[1];
  }
  keys.sort();
  let sigStr = '';
  for (let i = 0; i < keys.length; i++) {
    sigStr = sigStr + keys[i] + '=' + map[keys[i]] + "&";
  }
  sigStr = version + name + "?" + sigStr;

  if (body == "" || body == null || body == "null") {
    sig = hexSha1(fUtf16to8(sigStr + fGetCookieMes(cookieName.token)));
  } else {
    sig = hexSha1(fUtf16to8(sigStr + body + "&" + fGetCookieMes(cookieName.token)));
  }
  return sig;

};

const checkFirstSpace = (str) => {
    return str.replace(/(^\s*)/g, "");
}

const checkSpace = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
  fGetCookieMes,
  fSetCookieMes,
  fGetTs,
  fGetUrl,
  dataFormat,
  fGetNonce,
  fGetLocalTime,
  fGetSig,
  tsoss,
  fGetSigTwo,
  checkEmail,
  checkPhone,
  checkSpace,
  checkFirstSpace
}
