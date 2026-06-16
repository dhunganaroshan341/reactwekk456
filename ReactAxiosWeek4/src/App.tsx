import ChessBoard from './components/ChessBoard'
import CategoryCrud from './components/CategoryCrud'
import UserCrud from './components/UserCrud'
import PostCrud from './components/PostCrud'
import MediaManager from './components/MediaManager'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-semibold">Chess — Tailwind Scaffold</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Minimal chess board demo with Tailwind styling.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <MediaManager />
          <PostCrud />
          <CategoryCrud />
          <UserCrud />
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <ChessBoard />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
