// import { base_url } from '@/api/index'


// 拼接 查询 导出 附件 url
export function getQueryUrl(params, url) {
  let urlStr = '';
  // download_api
  // let base_url = process.env.BASE_API
  // let base_url = process.env.TARO_ENV
  let queryString = Object.keys(params).reduce((prev, current) => prev + `&${current}=${params[current]}`, "?");
  // urlStr = base_url + url + queryString;
  urlStr = url + queryString;
  console.log('urlStr: ', urlStr);
  return urlStr;
}

