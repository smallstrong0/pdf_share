import 'whatwg-fetch'
import router from 'umi/router';
import {message} from 'antd'

import {fGetUrl} from './common'

const request = (options) => {
  
  let {url, method = 'get', params} = options
  url = fGetUrl(options)
  
  return fetch(url, {
    method,
    body: method == "post" ? JSON.stringify(params) : null,
  }).then(res => res.json()).then((res) => {
    console.log(res)
    const {code, data,message} = res
    if (code === 200) {
      return Promise.resolve({
        success: true,
        data,
      })
    } else {
      router.push('/');
    }
    return Promise.resolve({
      success: false,
      message: message,
    })
  })
}

export default request
