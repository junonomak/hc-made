<<<<<<< HEAD
import {request} from "./request"
import axios from 'axios'

export function addUser(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/adduser',
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

export function getCart(username) {
  return request({
    url: '/getcart',
    params: {
      username
    }
  })
}

export function addCart(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/addcart',
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

export function deleteCart(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/deletecart',
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

export function changeCartCount(data){
  return new Promise((resolve,reject) => {
    axios.post(
      'http://112.74.89.251:8889/changecartcount',
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
import {post} from './post.js'

export function postUser(data) {
  return request({
    url: '/lookbookList'
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
  })
}