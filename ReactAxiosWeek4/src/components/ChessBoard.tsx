import { useState } from 'react'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

function pieceToGlyph(p: string) {
    const map: Record<string, string> = {
        K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
        k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟︎',
        '': ''
    }
    return map[p] ?? ''
}

export default function ChessBoard() {
    const [board] = useState(initialBoard)

    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-8 gap-0 border rounded overflow-hidden">
                {board.map((row, rIdx) => (
                    row.map((cell, cIdx) => {
                        const isLight = (rIdx + cIdx) % 2 === 0
                        const bg = isLight ? 'bg-yellow-100 dark:bg-yellow-800' : 'bg-green-700 dark:bg-green-900'
                        return (
                            <div key={`${rIdx}-${cIdx}`} className={`${bg} w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl`}>
                                <span className="select-none">{pieceToGlyph(cell)}</span>
                            </div>
                        )
                    })
                ))}
            </div>
        </div>
    )
}
