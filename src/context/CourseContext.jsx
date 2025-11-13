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
    description: 'Intro to React and Hooks.',
    cover:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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
