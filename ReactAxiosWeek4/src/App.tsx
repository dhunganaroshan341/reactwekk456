import ChessBoard from './components/ChessBoard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-semibold">Chess — Tailwind Scaffold</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Minimal chess board demo with Tailwind styling.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <ChessBoard />
        </section>
      </main>
    </div>
  )
}

export default App
