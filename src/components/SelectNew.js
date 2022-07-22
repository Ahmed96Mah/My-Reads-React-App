const SelectNew = ({ book, onChangeShelf, existing }) => {
  const onChange = (e) => {
    onChangeShelf(e.target.value, book, existing);
  };

  return (
    <select defaultValue="none" onChange={onChange}>
      <option value="addTo" disabled>
        Add to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
};

export default SelectNew;
