import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL + "order/"


const create = (body)=>{
    return axios.post(url+"create",body)
}

const pay = (id,receiver)=>{
    return axios.post(url+"pay",{id,receiver})
}

const get = (id)=>{
    return axios.get(url+"get/"+id)
}

const getByAddress = (address)=>{
    return axios.get(url+"getByAddress/"+address)
}



const service = {create,pay,get,getByAddress}

export default service