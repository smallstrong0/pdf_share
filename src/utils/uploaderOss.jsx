/*
 * oss 上传模块
 * succesCallback 成功回调
 * addCallback 添加文件回调
 * processCallback 过程回调
 * failCallback 失败回调
 *
 * plupload上传文件错误对照表
 * GENERIC_ERROR	            值为-100，发生通用错误时的错误代码
 * HTTP_ERROR	            值为-200，发生http网络错误时的错误代码，例如服务气端返回的状态码不是200
 * IO_ERROR	                值为-300，发生磁盘读写错误时的错误代码，例如本地上某个文件不可读
 * SECURITY_ERROR            值为-400，发生因为安全问题而产生的错误时的错误代码
 * INIT_ERROR	            值为-500，初始化时发生错误的错误代码
 * FILE_SIZE_ERROR	        值为-600，当选择的文件太大时的错误代码
 * FILE_EXTENSION_ERROR	    值为-601，当选择的文件类型不符合要求时的错误代码
 * FILE_DUPLICATE_ERROR	    值为-602，当选取了重复的文件而配置中又不允许有重复文件时的错误代码
 * IMAGE_FORMAT_ERROR	    值为-700，发生图片格式错误时的错误代码
 * IMAGE_MEMORY_ERROR	    当发生内存错误时的错误代码
 * IMAGE_DIMENSIONS_ERROR    值为-702，当文件大小超过了plupload所能处理的最大值时的错误代码
 * */
import { fGetUrl } from './common'
import * as func from './common.js';

import { USERID, HOST, PART, CLASSIFY, VERSION_B, API_PATH } from './config.js';

import plupload from 'plupload';

export const fUpLoadOss = (id, successcallback, addCallback, processCallback, failcallback, fileType, beforUpload, ossToken) => {

  var accessid = '';
  var host = '';
  var policyBase64 = '';
  var signature = '';
  var key = '';
  var expire = 0;
  var g_object_name = '';
  var timestamp = Date.parse(new Date()) / 1000;
  var now = timestamp;
  var file_name;
  var oss_token = ossToken || "oss_token"

  function send_request() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    }
    // else if (window.ActiveXObject) {
    //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    if (xmlhttp != null) {
      // var url = oss_token+'?ts=' + func.fGetLocalTime() + '&nonce=' + func.fExportGetNonce() + '&user_id=' + func.fExportGetCookieMes(USERID);
      // var url = oss_token + '?ts=' + func.fGetLocalTime() + '&nonce=' + func.fExportGetNonce() + '&user_id=' + '1741600001';
      // var serverUrl = config.HOST + config.VERSION + url + '&sig=' + func.fGetSig(oss_token, url, '', config.VERSION);
      // xmlhttp.open("GET", serverUrl, false);
      xmlhttp.send(null);
      return xmlhttp.responseText
    } else {
      alert("Your browser does not support XMLHTTP.");
    }
  }

  function get_signature() {
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3) {
      var body = send_request();
      var obj = eval("(" + body + ")")[1];
      host = obj['host'];
      policyBase64 = obj['policy'];
      accessid = obj['accessid'];
      signature = obj['signature'];
      expire = parseInt(obj['expire']);
      key = obj['dir'];
      console.log(obj)
      return true;
    }
    return false;
  }





  function set_upload_param(up, filename, ret) {
    if (ret == false) {
      ret = get_signature()
    }
    if (filename != '') {
      calculate_object_name(filename)
    }

    var new_multipart_params = {
      'key': g_object_name,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'success_action_status': '200', //让服务端返回200,不然，默认会返回204
      'signature': signature
    };
    up.setOption({
      'url': host,
      'multipart_params': new_multipart_params
    });
    up.start();
  }


  var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: id,
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    url: 'https://oss.aliyuncs.com',
    filters: {
      mime_types: [
        { title: "Image files", extensions: fileType ? fileType : "doc,pdf,docx,jpeg,png,jpg" }
      ],
      max_file_size: '3mb', //最大只能上传3mb的文件
      prevent_duplicates: true //允许选取重复文件
    },
    init: {
      FilesAdded: function (up, files) {

        plupload.each(files, function (file) {
          set_upload_param(uploader, file.name, false);
        });
        if (addCallback)
          addCallback(up, files, file_name)

      },
      BeforeUpload: function (up, file) {
        set_upload_param(up, file.name, true)
        if (beforUpload) {
          beforUpload(file_name, file)
        }
      },
      UploadProgress: function (up, file) {
        if (processCallback)
          processCallback(up, file)
      },
      FileUploaded: function (up, file, info) {
        if (info.status == 200) {
          if (successcallback)
            successcallback(file_name, file)
        }
        else if (info.status == 203) {
          if (failcallback)
            failcallback(up, file, info)
        }
        else {
          if (failcallback)
            failcallback()
        }
      },
      Error: function (up, err) {
        if (failcallback)
          failcallback(up, err);
        console.log(err)
      }
    }
  });

  uploader.init();
  return uploader;
}
export  const calculate_object_name=filename=>{
  var suffix = get_suffix(filename);
  this.file_name = 'img_' + func.fGetLocalTime() + '_' + func.fGetNonce() + suffix;
  this.g_object_name = this.key + this.file_name
}
export const get_suffix = filename =>{
  var pos = filename.lastIndexOf('.');
  var suffix = '';
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}
export const ossFetch = (method, dict, body) => {
  let options, url;

  const shortUrl = fGetUrl({ url: API_PATH + dict['name'], method: 'get', sig: true, params: {} });
  // console.log
  url = shortUrl
  console.log(url)

  if (method === 'get') {
    options = {
      method: 'GET',
      'Content-Type': 'application/json',
    }

  } else if (method === 'post') {
    options = {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(body)
    }

  }
  // console.log(url)

  return fetch(url, options).then((response) => {
    // console.log(response)
    return response.json()
  })
}

export const ossUpload = (file, successCallback, failCallback) => {
  let dict = {
    name: '/utils/oss_token_web',
  }

  new Promise(function (resolve, reject) {
    ossFetch('get', dict, null)
      .then((response) => {
        console.log(response)
        if (response['code'] == 0) {
          resolve(response['data']);
        } else {
          reject({ status: response.status })
        }

      })
      .catch((err) => {
        console.log(err);
      })
  }).then(json => {
    const { accessid, host, policy, signature, dir, } = json;
    let formData = new FormData();
    formData.append('success_action_status', '200')
    var suffix = get_suffix(file.name);
    var filename = 'img_' + func.fGetLocalTime() + '_' + func.fGetNonce() + suffix;
    formData.append('key', dir + filename);
    formData.append("OSSAccessKeyId", accessid);
    formData.append("policy", policy);
    formData.append("Signature", signature);
    formData.append("file", file);
    new Promise((resolve, reject) => {
      fetch('https://' + host, {
        method: 'post',
        'Content-Type': 'multipart/form-data; boundary=----youdu2017',
        body: formData,
      })
        .then(response => {
          if (response.status == 200) {
            resolve(response);

          } else {
            reject({ status: response.status })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }).then(data=>{
      successCallback(dir + filename)
    }).catch(e=>{
      failCallback()
    })
  })
}


