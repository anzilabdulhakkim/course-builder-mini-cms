import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";

export default function CourseCard({ course }){

    const {deleteCourse} = useCourses();
    
    const nav = useNavigate();

    return (
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        <div className="h-40 bg-gray-100">
          <img
            src={course.cover || '/placeholder.png'}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold">{course.name}</h2>
          <p className="text-sm text-gray-600 truncate my-2">
            {course.description}
          </p>
          <div className="text-xs text-gray-500 mb-3">
            {course.chapters?.length || 0} chapters
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => nav(`/course/${course.id}`)}
              className="text-sm px-3 py-2 border rounded"
            >
              View
            </button>
            <button
              onClick={() => nav(`/edit/${course.id}`)}
              className="text-sm px-3 py-2 bg-yellow-100 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourse(course.id)}
              className="text-sm px-3 py-2 bg-red-50 text-red-600 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
}