import { http } from '@/utils/http'

export const getHistoryAPI = () => {
  return http({
    method: 'GET',
    url: '/167060815'
  })
}

// 这个接口的话，我直接修改url一直会报错，就先全部改了，等后端弄完了再修改这部分
// https://mock.apifox.com/m2/4366307-4010223-default/167060050---这个是回答的接口
// https://mock.apifox.com/m2/4366307-4010223-default/167060815 --- 这个是历史记录的接口
// 然后就是你对接口这个数据格式有啥要求不
// const request = require('request');

// // 定义一个异步函数，用于获取历史数据
// const getHistoryAPI = () => {
//     return new Promise((resolve, reject) => {
//         var options = {
//             'method': 'GET',
//             'url': 'https://mock.apifox.com/m2/4366307-4010223-default/167060815',
//             'headers': {
//                 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
//             }
//         };
        
//         request(options, function (error, response) {
//             if (error) {
//                 reject(error);
//             } else {
//                 // 返回整个响应对象
//                 resolve(response.body);
//             }
//         });
//     });
// };

// // 导出函数
// module.exports = {
//     getHistoryAPI
// };
