import {request} from "./request"
import axios from 'axios'

export function getAddressList(username) {
  return request({
    url: '/getaddresslist',
    params: {
      username
    }
  })
}


export function addAddress(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/addaddress',
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

export function deleteAddress(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/deleteaddress',
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