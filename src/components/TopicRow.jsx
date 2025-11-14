export default function TopicRow({ topic, pathPrefix, updateField, removeTopic }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label>
          <input
            required
            value={topic.title}
            onChange={e => updateField(`${pathPrefix}.title`, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
            placeholder="Topic title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Type</label>
          <select
            value={topic.type}
            onChange={e => updateField(`${pathPrefix}.type`, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow bg-white"
          >
            <option value="video">Video</option>
            <option value="reading">Reading</option>
          </select>
        </div>

      <div className="md:col-span-5">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Link *</label>
        <input
          required
          value={topic.link}
          onChange={e => updateField(`${pathPrefix}.link`, e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
          placeholder="https://example.com"
        />
      </div>

        <div className="md:col-span-1 flex items-center">
          <button
            type="button"
            onClick={removeTopic}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors text-sm border border-red-200"
            title="Remove topic"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="md:hidden">
            Remove
            </span>
          </button>
        </div>
      </div>
    );
}