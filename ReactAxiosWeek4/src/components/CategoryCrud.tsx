import React, { useEffect, useState } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory, CategoryPayload } from '../services/categoryService'

type Category = {
    id: number
    name: string
    slug?: string
    description?: string
}

export default function CategoryCrud() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState<Category | null>(null)
    const [form, setForm] = useState({ name: '', slug: '', description: '' })

    const load = async () => {
        setLoading(true)
        try {
            const res = await getCategories()
            setCategories(res.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const resetForm = () => {
        setEditing(null)
        setForm({ name: '', slug: '', description: '' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload: CategoryPayload = { name: form.name, slug: form.slug || undefined, description: form.description || undefined }
        try {
            if (editing) {
                await updateCategory(editing.id, payload)
            } else {
                await createCategory(payload)
            }
            await load()
            resetForm()
        } catch (err) {
            console.error(err)
            alert('API error — check console')
        }
    }

    const startEdit = (c: Category) => {
        setEditing(c)
        setForm({ name: c.name || '', slug: c.slug || '', description: c.description || '' })
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this category?')) return
        try {
            await deleteCategory(id)
            setCategories(categories.filter(c => c.id !== id))
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <div className="flex gap-4">
                <div className="w-2/3">
                    {loading ? <p>Loading...</p> : (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Slug</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(c => (
                                    <tr key={c.id} className="border-t">
                                        <td className="p-2">{c.id}</td>
                                        <td className="p-2">{c.name}</td>
                                        <td className="p-2">{c.slug}</td>
                                        <td className="p-2">
                                            <button onClick={() => startEdit(c)} className="text-sm text-blue-600 mr-2">Edit</button>
                                            <button onClick={() => handleDelete(c.id)} className="text-sm text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handleSubmit} className="space-y-2 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                        <h3 className="font-medium">{editing ? 'Edit category' : 'Create category'}</h3>
                        <input required className="w-full p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        <input className="w-full p-2 rounded" placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
                        <textarea className="w-full p-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">{editing ? 'Update' : 'Create'}</button>
                            <button type="button" onClick={resetForm} className="px-3 py-1 bg-gray-300 rounded">Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
