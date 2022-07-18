const SelectShelf = ({ book, onChangeShelf, existing }) => {
  const onChange = (e) => {
    onChangeShelf(e.target.value, book, existing);
  };

  return (
    <select defaultValue={book['shelf']} onChange={onChange}>
      <option value="none" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
};

export default SelectShelf;
