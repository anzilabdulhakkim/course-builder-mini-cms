import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';

export default function CourseDetail() {
  const { id } = useParams();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === id);
  const [open, setOpen] = useState(null);

  if (!course)
    return (
      <div>
        Course not found. <Link to="/">Back</Link>
      </div>
    );

  return (
    <div>
      <div className="w-full mb-6">
        <img
          src={course.cover || '/placeholder.png'}
          alt={course.name}
          className="w-full h-56 md:h-56 lg:h-56 object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {course.name}
        </h1>
        <p className="text-gray-600 mt-3 text-lg leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="space-y-3">
        {course.chapters.map((ch, idx) => (
          <div
            key={ch.id}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="w-full text-left p-4 md:p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <div>
                <div className="font-semibold text-gray-900 text-base md:text-lg">
                  {ch.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {ch.topics?.length || 0}{' '}
                  {ch.topics?.length === 1 ? 'topic' : 'topics'}
                </div>
              </div>
              <div className="text-2xl text-gray-400 font-light">
                {open === idx ? '−' : '+'}
              </div>
            </button>
            {open === idx && (
              <div className="px-4 md:px-5 pb-4 md:pb-5 bg-linear-to-br from-gray-50/50 to-white">
                <div className="pt-2 space-y-3">
                  {ch.topics.map(t => (
                    <div
                      key={t.id}
                      className="p-3.5 md:p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="font-medium text-gray-900">
                            {t.title}
                          </div>
                          <div className="text-xs text-gray-500 capitalize mt-1 inline-block px-2 py-0.5 bg-gray-100 rounded-full">
                            {t.type}
                          </div>
                        </div>
                        <div>
                          {t.type === 'video' && (
                            <a
                              href={t.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm font-medium hover:underline"
                            >
                              Open Video →
                            </a>
                          )}
                          {t.type === 'reading' && (
                            <a
                              href={t.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm font-medium hover:underline"
                            >
                              Open Reading →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
