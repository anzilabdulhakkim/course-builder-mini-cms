import TopicRow from "./TopicRow";

export default function ChapterEditor({ chapter, idx, updateField, removeChapter, addTopic, removeTopic }) {
    const chapterPath = `chapters.${idx}`;

    return (
      <div className="border rounded p-3 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <label className="text-sm font-medium">Chapter Title *</label>
            <input
              required
              value={chapter.title}
              onChange={e =>
                updateField(`${chapterPath}.title`, e.target.value)
              }
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div className="ml-3">
            <button
              type="button"
              onClick={() => removeChapter(idx)}
              className="text-sm text-red-600"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Topics</h3>
            <button
              type="button"
              onClick={() => addTopic(idx)}
              className="px-2 py-1 bg-slate-100 rounded text-sm"
            >
              Add Topic
            </button>
          </div>

          {chapter.topics.map((t, ti) => (
            <TopicRow
              key={t.id}
              topic={t}
              pathPrefix={`${chapterPath}.topics.${ti}`}
              updateField={updateField}
              removeTopic={() => removeTopic(idx, ti)}
            />
          ))}
        </div>
      </div>
    );


}