import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

export default function CourseList() {
  const { courses } = useCourses();
  const [query, setQuery] = useState('');

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>

        <div className="flex items-center gap-3">
          <SearchBar onSearch={setQuery} />
          <Link
            to="/create"
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            Create Course
          </Link>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-gray-500 text-sm">No courses found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );


}
