import axios from 'axios'

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
    },
})

export type UserPayload = {
    name?: string
    email: string
    phone?: string
    password?: string
    file?: File | null
}

export const getUsers = () => api.get('/users')
export const getUser = (id: number | string) => api.get(`/users/${id}`)

export const createUser = (payload: UserPayload) => {
    const fd = new FormData()
    if (payload.name) fd.append('name', payload.name)
    fd.append('email', payload.email)
    if (payload.phone) fd.append('phone', payload.phone)
    if (payload.password) fd.append('password', payload.password)
    if (payload.file) fd.append('file', payload.file)
    return api.post('/users', fd)
}

export const updateUser = (id: number | string, payload: UserPayload) => {
    const fd = new FormData()
    if (payload.name) fd.append('name', payload.name)
    if (payload.email) fd.append('email', payload.email)
    if (payload.phone) fd.append('phone', payload.phone)
    if (payload.password) fd.append('password', payload.password)
    if (payload.file) fd.append('file', payload.file)
    fd.append('_method', 'PUT')
    return api.post(`/users/${id}`, fd)
}

export const deleteUser = (id: number | string) => api.delete(`/users/${id}`)

export default api
