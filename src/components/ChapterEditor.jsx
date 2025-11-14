import TopicRow from "./TopicRow";

export default function ChapterEditor({ chapter, idx, updateField, removeChapter, addTopic, removeTopic }) {
    const chapterPath = `chapters.${idx}`;

    return (
      <div className="border-2 border-gray-200 rounded-xl p-5 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter Title *</label>
            <input
              required
              value={chapter.title}
              onChange={e =>
                updateField(`${chapterPath}.title`, e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
              placeholder="e.g., Getting Started"
            />
          </div>

          <button
            type="button"
            onClick={() => removeChapter(idx)}
            className="mt-7 inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors border border-red-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remove
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Topics</h3>
            <button
              type="button"
              onClick={() => addTopic(idx)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
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
              Add Topic
            </button>
          </div>

          <div className="space-y-3">
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
      </div>
    );


}