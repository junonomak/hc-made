import {request} from "./request"

export function getlookbookList() {
  return request({
    url: '/lookbookList'
  })
}