import {request} from "./request"
import axios from 'axios'

export function getOrderList(username) {
  return request({
    url: '/getorderlist',
    params: {
      username
    }
  })
}


export function addOrder(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/addorder',
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