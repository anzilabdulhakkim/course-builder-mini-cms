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
      <div className="flex items-start gap-6">
        <img
          src={course.cover || '/placeholder.png'}
          alt=""
          className="w-80 h-44 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-semibold">{course.name}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
      </div>

      <div className="mt-6">
        {course.chapters.map((ch, idx) => (
          <div key={ch.id} className="border rounded mb-3 overflow-hidden">
            <button
              className="w-full text-left p-3 flex justify-between items-center"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <div>
                <div className="font-medium">{ch.title}</div>
                <div className="text-xs text-gray-500">
                  {ch.topics?.length || 0} topics
                </div>
              </div>
              <div>{open === idx ? '−' : '+'}</div>
            </button>
            {open === idx && (
              <div className="p-3 bg-white">
                <ul className="space-y-2">
                  {ch.topics.map(t => (
                    <li
                      key={t.id}
                      className="pb-3 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.title}</div>
                          <div className="text-xs text-gray-500 capitalize">
                            {t.type}
                          </div>
                        </div>
                        <div>
                          {t.type === 'video' && (
                            <a
                              href={t.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sky-600 text-sm"
                            >
                              Open Video
                            </a>
                          )}
                        </div>
                      </div>

                      {t.type === 'reading' && (
                        <div className="mt-2 text-sm text-gray-700">
                          {t.link}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
