import axios from 'axios'

export const path = '192.168.1.5:5000'

export const api = axios.create({
    baseURL: 'http://' + path + '/api/v1',
})

export const setAuthToken = (token) => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete api.defaults.headers.common['Authorization']
}
