import {request} from "./request"

<<<<<<< HEAD
export function getuseraccount(username) {
  return request({
    url: '/getuseraccount',
    params: {
      username
    }
  })
}
=======
export function getUser(username) {
    return request({
      url:`/user?username=${username}`,
    })
}
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
