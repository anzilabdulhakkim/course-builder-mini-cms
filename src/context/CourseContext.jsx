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
        ],
      },
    ],
  },
];

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(()=>{
    try {
      const raw = localStorage.getItem("courses_v1");
      return raw ? JSON.parse(raw) : SAMPLE;
    } 
    catch { 
        return SAMPLE; 
    }
  });

  useEffect(() => {
    localStorage.setItem("courses_v1", JSON.stringify(courses));
  }, [courses]);

  const createCourse = (data) => {
    setCourses(prev => [{...data , id: uuidv4()}, ...prev]);
  };

  const updateCourse = (id, data) => {
    setCourses(prev => prev.map(course => course.id === id ? {...course, ...data} : course));
  };    

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, createCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );

}
