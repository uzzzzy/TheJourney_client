import axios from 'axios'

export const path = process.env.REACT_APP_API_URL || 'https://yzua-express.herokuapp.com'

export const api = axios.create({
    baseURL: path + '/api/v1',
})

export const setAuthToken = (token) => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete api.defaults.headers.common['Authorization']
}
