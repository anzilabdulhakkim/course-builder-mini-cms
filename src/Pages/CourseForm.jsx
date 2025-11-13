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
    if (edit) setForm({ ...edit });
  }, [edit]);

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
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {edit ? 'Edit Course' : 'Create Course'}
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Course Name *</label>
          <input
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description *</label>
          <textarea
            required
            value={form.description}
            onChange={e => updateField('description', e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cover Image URL</label>
          <input
            value={form.cover}
            onChange={e => updateField('cover', e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Chapters</h2>
            <button
              type="button"
              onClick={addChapter}
              className="px-3 py-1 bg-sky-100 rounded"
            >
              Add Chapter
            </button>
          </div>

          <div className="space-y-4 mt-3">
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

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            {edit ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
