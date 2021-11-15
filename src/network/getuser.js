import {request} from "./request"

export function getuseraccount(username) {
  return request({
    url: '/getuseraccount',
    params: {
      username
    }
  })
}