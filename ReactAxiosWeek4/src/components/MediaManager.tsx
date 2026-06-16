import React, { useEffect, useState } from 'react'

type NodeType = 'folder' | 'file'

type MediaNode = {
    id: string
    type: NodeType
    name: string
    content?: string
    children?: MediaNode[]
}

const STORAGE_KEY = 'media-data-v1'

function makeId() {
    return String(Date.now()) + Math.random().toString(36).slice(2, 8)
}

function defaultTree(): MediaNode[] {
    return [
        { id: 'root', type: 'folder', name: 'root', children: [] },
    ]
}

function findNode(nodes: MediaNode[], id: string): MediaNode | null {
    for (const n of nodes) {
        if (n.id === id) return n
        if (n.children) {
            const r = findNode(n.children, id)
            if (r) return r
        }
    }
    return null
}

function removeNode(nodes: MediaNode[], id: string): MediaNode[] {
    return nodes
        .map(n => ({ ...n }))
        .filter(n => n.id !== id)
        .map(n => ({ ...n, children: n.children ? removeNode(n.children, id) : undefined }))
}

export default function MediaManager() {
    const [tree, setTree] = useState<MediaNode[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? JSON.parse(raw) : defaultTree()
        } catch (e) {
            return defaultTree()
        }
    })

    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [editorContent, setEditorContent] = useState('')

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tree))
    }, [tree])

    useEffect(() => {
        if (!selectedId) return
        const node = findNode(tree, selectedId)
        setEditorContent(node && node.type === 'file' ? node.content || '' : '')
    }, [selectedId, tree])

    const createFolder = (parentId = 'root') => {
        const name = prompt('Folder name')
        if (!name) return
        setTree(prev => {
            const copy = JSON.parse(JSON.stringify(prev)) as MediaNode[]
            const parent = findNode(copy, parentId)
            if (!parent || parent.type !== 'folder') return prev
            parent.children = parent.children || []
            parent.children.push({ id: makeId(), type: 'folder', name, children: [] })
            return copy
        })
    }

    const createFile = (parentId = 'root') => {
        const name = prompt('File name (e.g. notes.md)')
        if (!name) return
        const id = makeId()
        setTree(prev => {
            const copy = JSON.parse(JSON.stringify(prev)) as MediaNode[]
            const parent = findNode(copy, parentId)
            if (!parent || parent.type !== 'folder') return prev
            parent.children = parent.children || []
            parent.children.push({ id, type: 'file', name, content: '' })
            return copy
        })
        setSelectedId(id)
    }

    const saveFile = () => {
        if (!selectedId) return
        setTree(prev => {
            const copy = JSON.parse(JSON.stringify(prev)) as MediaNode[]
            const node = findNode(copy, selectedId)
            if (node && node.type === 'file') node.content = editorContent
            return copy
        })
        alert('Saved')
    }

    const deleteNode = (id: string) => {
        if (!confirm('Delete this item and all children?')) return
        setTree(prev => removeNode(prev, id))
        if (selectedId === id) {
            setSelectedId(null)
            setEditorContent('')
        }
    }

    const renameNode = (id: string) => {
        const name = prompt('New name')
        if (!name) return
        setTree(prev => {
            const copy = JSON.parse(JSON.stringify(prev)) as MediaNode[]
            const node = findNode(copy, id)
            if (node) node.name = name
            return copy
        })
    }

    function renderTree(nodes: MediaNode[]) {
        return nodes.map(n => (
            <div key={n.id} className="pl-2">
                <div className="flex items-center gap-2">
                    <button className="text-left w-full" onClick={() => setSelectedId(n.id)}>
                        {n.type === 'folder' ? '📁' : '📄'} {n.name}
                    </button>
                    <div className="flex gap-1">
                        {n.type === 'folder' && (
                            <>
                                <button onClick={() => createFolder(n.id)} className="text-xs text-green-600">+F</button>
                                <button onClick={() => createFile(n.id)} className="text-xs text-blue-600">+f</button>
                            </>
                        )}
                        <button onClick={() => renameNode(n.id)} className="text-xs">✏️</button>
                        <button onClick={() => deleteNode(n.id)} className="text-xs text-red-600">🗑️</button>
                    </div>
                </div>
                {n.children && n.children.length > 0 && (
                    <div className="pl-4">{renderTree(n.children)}</div>
                )}
            </div>
        ))
    }

    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Media Manager</h2>
            <div className="flex gap-4">
                <div className="w-1/3 border-r pr-3">
                    <div className="flex gap-2 mb-2">
                        <button onClick={() => createFolder('root')} className="px-2 py-1 bg-green-600 text-white rounded">New Folder</button>
                        <button onClick={() => createFile('root')} className="px-2 py-1 bg-blue-600 text-white rounded">New File</button>
                    </div>
                    <div className="overflow-auto max-h-72">{renderTree(tree)}</div>
                </div>

                <div className="w-2/3">
                    {selectedId ? (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong>{findNode(tree, selectedId)?.name}</strong>
                                    <span className="ml-2 text-sm text-gray-500">{findNode(tree, selectedId)?.type}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={saveFile} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                                </div>
                            </div>
                            {findNode(tree, selectedId)?.type === 'file' ? (
                                <textarea className="w-full h-56 p-2 bg-gray-50 dark:bg-gray-900 rounded" value={editorContent} onChange={e => setEditorContent(e.target.value)} />
                            ) : (
                                <p className="text-sm text-gray-500">Folder selected — choose or create a file to edit.</p>
                            )}
                        </div>
                    ) : (
                        <p>Select a file or folder to begin.</p>
                    )}
                </div>
            </div>
        </section>
    )
}
