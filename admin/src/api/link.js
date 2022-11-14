// const { resolve, reject } = require("core-js/fn/promise")
import service from "../util/service.js"//引入封装器

let link=(url,method="get",data,params)=>{
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method,
            data,
            params
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}
export default link