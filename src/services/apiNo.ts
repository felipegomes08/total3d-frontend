import axios from 'axios'

const apiNo = axios.create({
  baseURL: process.env.API_URL || 'https://total3d-backend.herokuapp.com/',
  // baseURL: process.env.API_URL || 'http://localhost:3333',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})
export { apiNo }
