import axios from 'axios'

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000/api',
    headers: { Accept: 'application/json' },
})

export type PostPayload = {
    title: string
    body?: string
    category_id?: number | string
    slug?: string
    file?: File | null
    published?: boolean
}

export const getPosts = () => api.get('/posts')
export const getPost = (id: number | string) => api.get(`/posts/${id}`)

export const createPost = (payload: PostPayload) => {
    const fd = new FormData()
    fd.append('title', payload.title)
    if (payload.body) fd.append('body', payload.body)
    if (payload.category_id !== undefined) fd.append('category_id', String(payload.category_id))
    if (payload.slug) fd.append('slug', payload.slug)
    if (payload.published !== undefined) fd.append('published', payload.published ? '1' : '0')
    if (payload.file) fd.append('file', payload.file)
    return api.post('/posts', fd)
}

export const updatePost = (id: number | string, payload: PostPayload) => {
    const fd = new FormData()
    fd.append('title', payload.title)
    if (payload.body) fd.append('body', payload.body)
    if (payload.category_id !== undefined) fd.append('category_id', String(payload.category_id))
    if (payload.slug) fd.append('slug', payload.slug)
    if (payload.published !== undefined) fd.append('published', payload.published ? '1' : '0')
    if (payload.file) fd.append('file', payload.file)
    fd.append('_method', 'PUT')
    return api.post(`/posts/${id}`, fd)
}

export const deletePost = (id: number | string) => api.delete(`/posts/${id}`)

export default api
