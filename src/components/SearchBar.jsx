import { useEffect, useState } from 'react';

export default function DebouncedSearch({ onSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <input
      type="text"
      placeholder="Search courses..."
      value={value}
      onChange={e => setValue(e.target.value)}
      className="w-full md:w-64 px-3 py-2 border rounded bg-white text-sm"
    />
  );
}
