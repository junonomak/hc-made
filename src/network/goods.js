import {request} from "./request"

export function getGoodsList() {
    return request({
<<<<<<< HEAD
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

=======
        url: '/goodsList'
    })
}
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
