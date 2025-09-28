import { FaSearch } from "react-icons/fa";
import {  PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
const SearchTodo = () => {
  const {todoQuery,searchTodo} = useContext(TodoContext);
  return (
    <div className="input-group" dir="ltr">
      <span className="input-group-text" style={{ backgroundColor: PURPLE }}>
        <FaSearch />
      </span>
      <input
        type="text"
        dir="rtl"
        className="form-control"
        placeholder="جست و جوی تودو..."
        value={todoQuery.text}
        onChange={(e)=>searchTodo(e.target.value)}
      />
    </div>
  );
};
export default SearchTodo;
