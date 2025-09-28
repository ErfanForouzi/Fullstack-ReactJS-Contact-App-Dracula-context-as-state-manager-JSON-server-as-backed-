import { parseISO, formatDistanceToNow } from "date-fns-jalali";
import { Spinner } from "../";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";
import { useContext, useEffect, useState } from "react";
import { getTodo } from "../../services/todosServices";
import { Link, useParams } from "react-router-dom";
import { TodoContext } from "../../context/todoContext";
import { Helmet } from "react-helmet-async";

const ViewTodo = () => {
  const { loading, setLoading } = useContext(TodoContext);
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: todoData } = await getTodo(todoId);
        setTodo(todoData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Check Date
  let timeAgo = "";
  const date = todo.date && parseISO(todo.date);
  const time = date && formatDistanceToNow(date);
  timeAgo = `${time} قبل`;
  return (
    <>
      <Helmet>
        <title>تودولیست || صفحه اطلاعات تودو</title>
      </Helmet>
      <section className="view-todo-intro p-3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات تودو
            </p>
          </div>
          <hr style={{ color: CYAN }} />
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(todo).length > 0 ? (
            <section
              className="container p-2"
              style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
            >
              <article className="row p-2">
                <div className="col-sm-12">
                  <ul className="list-group p-0">
                    <li className="list-group-item list-group-item-dark">
                      نام کاربر : <span className="fw-bold">{todo.user}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      نام تودو : <span className="fw-bold">{todo.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      توضیحات تودو :{" "}
                      <span className="fw-bold">{todo.body}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      زمان ساخت : <span className="fw-bold">{timeAgo}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      وضعیت تودو :{" "}
                      {todo.status === "done" ? (
                        <span
                          style={{
                            textDecoration: `${
                              todo.status === "done" ? "line-through" : ""
                            }`,
                          }}
                          className="fw-bold"
                        >
                          به پایان رسیده است
                        </span>
                      ) : (
                        <span className="fw-bold">در حال انجام است</span>
                      )}
                    </li>
                  </ul>
                </div>
              </article>
              <article className="row my-2">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <Link
                    to={"/todos"}
                    className="btn"
                    style={{ backgroundColor: PURPLE }}
                  >
                    برگشت به صفحه اصلی
                  </Link>
                </div>
              </article>
            </section>
          ) : (
            <div style={{ color: PURPLE }} className="not-allowed">
              <h1>شیطونی نکن بچه😈😡👺</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ViewTodo;
