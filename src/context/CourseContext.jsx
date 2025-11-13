import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CourseContext = createContext();

export function useCourses() {
    return useContext(CourseContext);
}

const SAMPLE = [
  {
    id: uuidv4(),
    name: 'Beginner React',
    description: 'Jumpstart your web development career with this "Beginner React" course.',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVUnM-QqMQPiLRw8TyVTDp-KQbq08ji43VA&s',
    chapters: [
      {
        id: uuidv4(),
        title: 'Getting Started',
        topics: [
          {
            id: uuidv4(),
            title: 'Intro Video',
            type: 'video',
            link: 'https://youtu.be/qp6e0tucEhw?si=seImMKWOTi1HS34j',
          },
          {
            id: uuidv4(),
            title: 'Intro to react',
            type: 'reading',
            link: 'https://react.dev/learn',
          },
        ],
      },
    ],
  },
];

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(()=>{
    try {
      const raw = localStorage.getItem('courses_v1');
      if (raw) {
        const parsed = JSON.parse(raw);

        const validated = parsed.filter(
          course =>
            course.id && typeof course.id === 'string' && course.id.length < 100
        );
        return validated.length > 0 ? validated : SAMPLE;
      }
      return SAMPLE;
    } catch {
      return SAMPLE;
    }
  });

  useEffect(() => {
    localStorage.setItem("courses_v1", JSON.stringify(courses));
  }, [courses]);

  const createCourse = data => {
    const newCourse = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      cover: data.cover,
      chapters: data.chapters || [],
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id, data) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id
          ? {
              ...course,
              name: data.name,
              description: data.description,
              cover: data.cover,
              chapters: data.chapters,
              id: course.id,
            }
          : course
      )
    );
  };

  const deleteCourse = id => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, createCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );

}
