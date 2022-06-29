import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL + "order/"


const create = (body)=>{
    return axios.post(url+"create",body)
}

const pay = (id)=>{
    return axios.post(url+"pay",{id})
}

const get = (id)=>{
    return axios.get(url+"get/"+id)
}



const service = {create,pay,get}

export default service