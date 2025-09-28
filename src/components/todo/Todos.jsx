import { Todo, Spinner } from "../index";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import { FaPlusCircle } from "react-icons/fa";
import NotFound from "../../assets/not-found.gif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";

const Todos = () => {
  const { filteredTodos, loading } = useContext(TodoContext);
  return (
    <>
      <section className="container">
        <div className="row">
          <article className="col d-flex justify-content-center mt-3">
            <Link
              to={`/todos/add`}
              className="btn"
              style={{ backgroundColor: PINK }}
            >
              ساخت تودو جدید
              <FaPlusCircle className="mx-2" />
            </Link>
          </article>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container mt-2">
          <div className="row mx-auto ">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
            ) : (
              <div
                style={{ backgroundColor: CURRENTLINE }}
                className="d-flex justify-content-center flex-column align-items-center p-5 mt-2"
              >
                <h3 style={{ color: ORANGE }}>تودو یافت نشد...</h3>
                <img className="w-25" src={NotFound} alt="not found" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Todos;
