import {request} from "./request"

export function getGoodsList() {
    return request({
        url: '/getgoodslist'
    })
}

export function getIdGoodsList(id) {
    return request({
        url: '/getidgoodslist',
        params: {
            id
          }
    })
}

export function getGoodsImgList(id) {
    return request({
        url: '/getgoodsimglist',
        params: {
            id
          }
    })
}

export function getGoodsSizeList(id) {
    return request({
        url: '/getgoodssizelist',
        params: {
            id
          }
    })
}

