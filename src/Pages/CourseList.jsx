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
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Courses
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'}{' '}
            available
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchBar onSearch={setQuery} />
          <Link
            to="/create"
            className="px-5 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium text-center transition-colors whitespace-nowrap"
          >
            + New Course
          </Link>
        </div>
      </div>

      {query && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''} for
          "{query}"
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {query ? 'No courses found' : 'No courses yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {query
              ? 'Try searching with different keywords'
              : 'Get started by creating your first course'}
          </p>
          {!query && (
            <Link
              to="/create"
              className="inline-block px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium transition-colors"
            >
              Create Your First Course
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );


}
