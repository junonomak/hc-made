import {request} from "./request"
import axios from 'axios'

export function getlookbookList(productYear) {
  return request({
    url: '/getlookbooks',
    params: {
      productYear
    }
  })
}


export function addLookBooks(url, data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889' + url,
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