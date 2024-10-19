import React from 'react';

interface FiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  clearCompleted: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, setFilter, clearCompleted }) => {
  return (
    <div className="filters">
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
        All
      </button>
      <button onClick={() => setFilter('active')} disabled={filter === 'active'}>
        Active
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Completed
      </button>
      <button className="clear-completed" onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
};

export default Filters;
