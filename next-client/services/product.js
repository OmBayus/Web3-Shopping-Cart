import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL + "product/"
console.log(url)
const getAll = ()=>{
    
    return axios.get(url+"getAll")
}



const service = {getAll}

export default service