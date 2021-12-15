// request是请求的意思
// 基本封装
import axios from 'axios'

export function request(config) {

<<<<<<< HEAD
    //instance:实例
    const instance = axios.create({
        baseURL: 'http://112.74.89.251:8889/',
        // baseURL: 'http://localhost:3000/',
        timeout: 5000
    })

    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    return instance(config)
=======
        //instance:实例
        const instance = axios.create({
            baseURL: 'http://120.76.42.225:8889/',
            timeout: 5000
        })

        instance.interceptors.request.use(config => {
            return config
        }, err => {
            console.log(err);
        })

        return instance(config)

        
>>>>>>> 4789e4e8d77cc418c93d02a35f2d7c89d8b0c977
}