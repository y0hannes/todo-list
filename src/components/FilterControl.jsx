const FilterControl = ({ filter, onChange }) => (
  <select value={filter} onChange={(e) => onChange(e.target.value)}>
    <option value="all">All</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
  </select>
);

export default FilterControl;
