import { Routes, Route, Link } from 'react-router-dom';
import CourseList from './Pages/CourseList';
import CourseForm from './Pages/CourseForm';
import CourseDetail from './Pages/CourseDetail';

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Course Builder Dashboard
          </Link>
          <nav className="space-x-3">
            <Link to="/" className="text-sm"> Courses </Link>
            <Link to="/create" className="text-sm bg-sky-600 text-white px-3 py-2 rounded"> Create </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/create" element={<CourseForm />} />
          <Route path="/edit/:id" element={<CourseForm />} />
          <Route path="/course/:id" element={<CourseDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
