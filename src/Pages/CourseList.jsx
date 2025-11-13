import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

export default function CourseList() {
  const { courses } = useCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Link to="/create" className="px-4 py-2 bg-sky-600 text-white rounded">
          Create Course
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );


}
