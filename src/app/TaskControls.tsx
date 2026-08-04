'use client';
import { useRouter, usePathname } from 'next/navigation';

export function TaskControls({ showArchived, sortBy }: { showArchived: boolean; sortBy: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams();
    if (key === 'view') {
      params.set('view', value);
      if (sortBy) params.set('sort', sortBy);
    } else {
      params.set('sort', value);
      if (showArchived) params.set('view', 'archived');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <nav className="flex justify-between items-center mb-4" aria-label="Task controls">
      <menu className="space-x-2">
        <button
          onClick={() => setParam('view', 'active')}
          className={`px-4 py-2 rounded ${!showArchived ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          aria-pressed={!showArchived}
        >
          Active Tasks
        </button>
        <button
          onClick={() => setParam('view', 'archived')}
          className={`px-4 py-2 rounded ${showArchived ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          aria-pressed={showArchived}
        >
          Archived Tasks
        </button>
      </menu>
      <form>
        <label htmlFor="sortBy" className="mr-2">Sort by:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setParam('sort', e.target.value)}
          className="border rounded p-1"
        >
          <option value="topic">Topic</option>
          <option value="status">Status</option>
          <option value="due_date">Due Date</option>
        </select>
      </form>
    </nav>
  );
}