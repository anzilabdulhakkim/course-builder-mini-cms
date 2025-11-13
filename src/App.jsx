import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import CourseList from './Pages/CourseList';
import CourseForm from './Pages/CourseForm';
import CourseDetail from './Pages/CourseDetail';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <span className="text-xl font-bold text-gray-800">Dashboard</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              All Courses
            </Link>

            <Link
              to="/create"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === '/create'
                  ? 'bg-sky-100 text-sky-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Course
            </Link>
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b sticky top-0 z-30 md:hidden">
          <div className="flex items-center justify-between px-4 h-16">
            <button onClick={() => setSidebarOpen(true)} className="p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="font-bold text-gray-800">Dashboard</span>
            <div className="w-10"></div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/create" element={<CourseForm />} />
            <Route path="/edit/:id" element={<CourseForm />} />
            <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
