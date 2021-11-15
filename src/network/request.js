// request是请求的意思
// 基本封装
import axios from 'axios'

export function request(config) {

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

        
}