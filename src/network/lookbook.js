import {request} from "./request"
<<<<<<< HEAD
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
=======

export function getlookbookList() {
  return request({
    url: '/lookbookList'
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  })
}