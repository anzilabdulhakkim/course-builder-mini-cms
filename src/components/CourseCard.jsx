import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";

export default function CourseCard({ course }) {
  const { deleteCourse } = useCourses();
  const nav = useNavigate();

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(course.id);
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition-all overflow-hidden">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={
            course.cover || 'https://placehold.co/600x400'
          }
          alt={course.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1">
          {course.name}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <div className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
            {course.chapters?.length || 0}{' '}
            {course.chapters?.length === 1 ? 'chapter' : 'chapters'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={() => nav(`/course/${course.id}`)}
            className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            View
          </button>
          <button
            onClick={() => nav(`/edit/${course.id}`)}
            className="flex-1 text-sm px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 text-sm px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
