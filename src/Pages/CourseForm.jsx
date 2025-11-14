import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { v4 as uuidv4 } from 'uuid';
import ChapterEditor from '../components/ChapterEditor';

const emptyTopic = () => ({ id: uuidv4(), title: '', type: 'video', link: '' });
const emptyChapter = () => ({
  id: uuidv4(),
  title: '',
  topics: [emptyTopic()],
});

export default function CourseForm() {
  const { id } = useParams();
  const { courses, createCourse, updateCourse } = useCourses();
  const edit = courses.find(c => c.id === id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    cover: '',
    chapters: [emptyChapter()],
  });

  useEffect(() => {
    if (edit) {
      setForm({ ...edit }); 
    } 
    else {
      setForm({            
        name: '',
        description: '',
        cover: '',
        chapters: [emptyChapter()],
      });
    }
  }, [id]);

  function updateField(path, value) {
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const segs = path.split('.');
      let cur = copy;
      for (let i = 0; i < segs.length - 1; i++) {
        cur = cur[segs[i]];
      }
      cur[segs[segs.length - 1]] = value;
      return copy;
    });
  }

  function addChapter() {
    setForm(prev => ({
      ...prev,
      chapters: [...prev.chapters, emptyChapter()],
    }));
  }
  function removeChapter(index) {
    setForm(prev => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  }

  function addTopic(chIndex) {
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.chapters[chIndex].topics.push(emptyTopic());
      return copy;
    });
  }
  function removeTopic(chIndex, tIndex) {
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.chapters[chIndex].topics = copy.chapters[chIndex].topics.filter(
        (_, i) => i !== tIndex
      );
      return copy;
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (edit) {
      updateCourse(id, form);
    } else {
      createCourse(form);
    }
    navigate('/');
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {edit ? 'Edit Course' : 'Create Course'}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Name *
          </label>
          <input
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
            placeholder="e.g., Introduction to React"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
          <textarea
            required
            value={form.description}
            onChange={e => updateField('description', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow resize-none"
            placeholder="Describe what students will learn..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
          <input
            value={form.cover}
            onChange={e => updateField('cover', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Chapters</h2>
            <button
              type="button"
              onClick={addChapter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Chapter
            </button>
          </div>

          <div className="space-y-4">
            {form.chapters.map((ch, idx) => (
              <ChapterEditor
                key={ch.id}
                chapter={ch}
                idx={idx}
                updateField={updateField}
                removeChapter={removeChapter}
                addTopic={addTopic}
                removeTopic={removeTopic}
              />
            ))}
          </div>
        </div>

        <div className="pt-6 border-t flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {edit ? 'Save Changes' : 'Create Course'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
