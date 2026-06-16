import React, { useEffect, useState } from 'react'
import { getPosts, createPost, updatePost, deletePost, PostPayload } from '../services/postService'
import { getCategories } from '../services/categoryService'

type Post = {
    id: number
    title: string
    body?: string
    category_id?: number | null
}

type Category = { id: number; name: string }

export default function PostCrud() {
    const [posts, setPosts] = useState<Post[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState<Post | null>(null)
    const [form, setForm] = useState({ title: '', body: '', category_id: '' })
    const [file, setFile] = useState<File | null>(null)

    const load = async () => {
        setLoading(true)
        try {
            const [pRes, cRes] = await Promise.all([getPosts(), getCategories()])
            setPosts(pRes.data)
            setCategories(cRes.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const resetForm = () => {
        setEditing(null)
        setForm({ title: '', body: '', category_id: '' })
        setFile(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload: PostPayload = {
            title: form.title,
            body: form.body || undefined,
            category_id: form.category_id ? Number(form.category_id) : undefined,
            file,
        }

        try {
            if (editing) {
                await updatePost(editing.id, payload)
            } else {
                await createPost(payload)
            }
            await load()
            resetForm()
        } catch (err) {
            console.error(err)
            alert('API error — check console')
        }
    }

    const startEdit = (p: Post) => {
        setEditing(p)
        setForm({ title: p.title || '', body: p.body || '', category_id: p.category_id ? String(p.category_id) : '' })
        setFile(null)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this post?')) return
        try {
            await deletePost(id)
            setPosts(posts.filter(p => p.id !== id))
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <div className="flex gap-4">
                <div className="w-2/3">
                    {loading ? <p>Loading...</p> : (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Title</th>
                                    <th className="p-2">Category</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(p => (
                                    <tr key={p.id} className="border-t">
                                        <td className="p-2">{p.id}</td>
                                        <td className="p-2">{p.title}</td>
                                        <td className="p-2">{categories.find(c => c.id === p.category_id)?.name || '-'}</td>
                                        <td className="p-2">
                                            <button onClick={() => startEdit(p)} className="text-sm text-blue-600 mr-2">Edit</button>
                                            <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handleSubmit} className="space-y-2 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                        <h3 className="font-medium">{editing ? 'Edit post' : 'Create post'}</h3>
                        <input required className="w-full p-2 rounded" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                        <textarea className="w-full p-2 rounded" placeholder="Body" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
                        <select className="w-full p-2 rounded" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                            <option value="">No category</option>
                            {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                        </select>
                        <input className="w-full" type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
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
