import axios from "axios"

const url = "http://localhost:4000/api/product/"

const getAll = ()=>{
    return axios.get(url+"getAll")
}



const service = {getAll}

export default service