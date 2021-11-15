import {request} from "./request"

export function getUser(username) {
    return request({
      url:`/user?username=${username}`,
    })
}
