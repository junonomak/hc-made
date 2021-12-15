// 基本封装
import axios from 'axios'

export function goodsInfoPost(url, data){
  return new Promise((resolve,reject) => {
    axios.post(
<<<<<<< HEAD
      'http://112.74.89.251:8889/' + url,
=======
      'http://localhost:3000' + url,
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
      data
      )
    .then(res => {
      resolve(res.data);
      console.log('res=>',res.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

