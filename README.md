# Course Builder Dashboard (Mini CMS)

A pixel perfect, production-quality Mini CMS built using React, Context API, Tailwind CSS, and React Router.
This project was developed as part of a company technical assignment to demonstrate frontend architecture, state management, UI quality, and component-driven development.

## Features Implemented

### Core Features

* Create, Read, Update, Delete Courses
* Add multiple Chapters inside each course
* Add multiple Topics under each chapter
* Each topic supports:
    * Topic type: Video or Reading
    * External link for video
* Responsive Course List Dashboard
* Course Detail Page with expandable chapter sections
* Dynamic forms for chapter and topic creation
* Pixel-perfect UI built with Tailwind CSS

### Bonus Features

* Search functionality for courses
* debounced search handling
* Local persistence via `localStorage`
* Reusable and modular UI components
* Clean and scalable folder structure

## Tech Stack

* **React.js** (functional components and hooks)
* **React Router** for navigation
* **Context API** for global state
* **Tailwind CSS** for styling
* **Vite** for development and bundling

## Project Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/anzilabdulhakkim/course-builder-mini-cms.git
    cd course-builder-mini-cms
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run the development server**
    ```bash
    npm run dev
    ```

## Time Spent

Approximately **6 to 7 hours**, including:

* Project planning and structure
* UI layout and styling
* Form creation with dynamic chapter/topic handling
* Context API development
* Persistence with `localStorage`
* UI polish and adding bonus features

## Future Improvements

If more time were available, the following enhancements could be added:

* Admin authentication system
* Rich text editor for reading materials
* Advanced validation with error messages
* Role based access control
* Detailed analytics for course performance

