import React, { useEffect, useState } from 'react'
import { getUsers, createUser, updateUser, deleteUser, UserPayload } from '../services/userService'

type User = {
    id: number
    name?: string
    email: string
    phone?: string
    avatar?: string | null
}

export default function UserCrud() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState<User | null>(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
    const [file, setFile] = useState<File | null>(null)

    const load = async () => {
        setLoading(true)
        try {
            const res = await getUsers()
            setUsers(res.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const resetForm = () => {
        setEditing(null)
        setForm({ name: '', email: '', phone: '', password: '' })
        setFile(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload: UserPayload = {
            name: form.name || undefined,
            email: form.email,
            phone: form.phone || undefined,
            password: form.password || undefined,
            file,
        }

        try {
            if (editing) {
                await updateUser(editing.id, payload)
            } else {
                await createUser(payload)
            }
            await load()
            resetForm()
        } catch (err) {
            console.error(err)
            alert('API error — check console')
        }
    }

    const startEdit = (u: User) => {
        setEditing(u)
        setForm({ name: u.name || '', email: u.email, phone: u.phone || '', password: '' })
        setFile(null)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this user?')) return
        try {
            await deleteUser(id)
            setUsers(users.filter(u => u.id !== id))
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }

    return (
        <div className="space-y-4">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <div className="flex gap-4">
                    <div className="w-2/3">
                        <div className="overflow-auto max-h-64">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="p-2">ID</th>
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Email</th>
                                            <th className="p-2">Phone</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} className="border-t">
                                                <td className="p-2">{u.id}</td>
                                                <td className="p-2">{u.name}</td>
                                                <td className="p-2">{u.email}</td>
                                                <td className="p-2">{u.phone}</td>
                                                <td className="p-2">
                                                    <button onClick={() => startEdit(u)} className="text-sm text-blue-600 mr-2">Edit</button>
                                                    <button onClick={() => handleDelete(u.id)} className="text-sm text-red-600">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="w-1/3">
                        <form onSubmit={handleSubmit} className="space-y-2 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                            <h3 className="font-medium">{editing ? 'Edit user' : 'Create user'}</h3>
                            <input className="w-full p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <input required className="w-full p-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            <input className="w-full p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            <input className="w-full p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                            <input className="w-full" type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">{editing ? 'Update' : 'Create'}</button>
                                <button type="button" onClick={resetForm} className="px-3 py-1 bg-gray-300 rounded">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
