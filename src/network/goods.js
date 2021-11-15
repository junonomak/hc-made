import {request} from "./request"

export function getGoodsList() {
    return request({
        url: '/goodsList'
    })
}
