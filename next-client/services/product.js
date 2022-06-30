import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL + "product/"

const getAll = ()=>{
    return axios.get(url+"getAll")
}

const add = (body)=>{
    return axios.post(url+"add",body)
}


const service = {getAll,add}

export default service