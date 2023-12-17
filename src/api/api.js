import axios from 'axios';

const URL = 'http://68.183.72.178';

const instance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type" : 'application/json',
    }
});

export const login = async (data) =>{
    const res = await instance.post('api/v1/dj-rest-auth/login/', data)
    return res.data
}

export const register = async (data) =>{
    console.log(data)
    const res = await instance.post('/api/v1/dj-rest-auth/registration/', data)
    return res.data

}

export const logout = async() =>{
    const res = await instance.post('/api/v1/dj-rest-auth/logout/')
    return res.data
}