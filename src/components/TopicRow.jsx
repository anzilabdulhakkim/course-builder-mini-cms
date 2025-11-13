export default function TopicRow({ topic, pathPrefix, updateField, removeTopic }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
        <div>
          <label className="text-xs">Title *</label>
          <input
            required
            value={topic.title}
            onChange={e => updateField(`${pathPrefix}.title`, e.target.value)}
            className="block w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-xs">Type</label>
          <select
            value={topic.type}
            onChange={e => updateField(`${pathPrefix}.type`, e.target.value)}
            className="block w-full border rounded px-2 py-1"
          >
            <option value="video">Video</option>
            <option value="reading">Reading</option>
          </select>
        </div>

      <div className="md:col-span-1">
        <label className="text-xs">Link *</label>
        <input
          required
          value={topic.link}
          onChange={e => updateField(`${pathPrefix}.link`, e.target.value)}
          className="block w-full border rounded px-2 py-1"
          placeholder="https://example.com"
        />
      </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={removeTopic}
            className="text-sm text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    );
}