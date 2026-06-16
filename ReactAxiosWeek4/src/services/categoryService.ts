import axios from 'axios'

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000/api',
    headers: { Accept: 'application/json' },
})

export type CategoryPayload = {
    name: string
    slug?: string
    description?: string
}

export const getCategories = () => api.get('/categories')
export const getCategory = (id: number | string) => api.get(`/categories/${id}`)
export const createCategory = (payload: CategoryPayload) => api.post('/categories', payload)
export const updateCategory = (id: number | string, payload: CategoryPayload) => api.put(`/categories/${id}`, payload)
export const deleteCategory = (id: number | string) => api.delete(`/categories/${id}`)

export default api
