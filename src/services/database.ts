import axios from 'axios';

const token = localStorage.getItem('token')?.replace(/"/g,"")
console.log(token)
const database = axios.create({
    baseURL:process.env.React_APP_BASE_URL,
    timeout: 700,
})

export default database;