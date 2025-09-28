import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";

import { Link } from "react-router-dom";

import eoLocale from "date-fns/locale/fa-IR";

import { editTodo, getAllTodos } from "../../services/todosServices";

import { parseISO, formatDistanceToNow } from "date-fns-jalali";
import moment from "jalali-moment";

import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ORANGE, CYAN, RED, CURRENTLINE } from "../../helpers/colors";

const Todo = ({ todo }) => {
  const { deleteTodo, setLoading, setFilteredTodos, setTodos, todos } =
    useContext(TodoContext);

  //using date-fns
  let timeAgo = "";
  const date = todo.date && parseISO(todo.date);
  const time = date && formatDistanceToNow(date);
  timeAgo = `${time}`;

  //pure js
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // console.log(new Date().toLocaleDateString("fa-ir",options)); => تاریخ الان به فارسی =>
  //پنجشنبه ۳ اسفند ۱۴۰۲

  // console.log(todo.date.toString());
  // 2024-02-22T15:18:17.476Z

  // console.log(new Date(Date.now(todo.date)));
  //زمان الان رو تایماستمپ میکنه و بعد تبدیل میکنه به فرمت زیر
  // Sat Feb 24 2024 14:32:45 GMT+0330 (Iran Standard Time)

  // console.log(new Date(Date.parse(todo.date)).toLocaleDateString("fa-ir",options));
  //همین بالایی و میاد تبدیل به فارسی میکنه

  // let timeNow = new Date(Date.now(todo.date)).toLocaleDateString("fa-ir",options);
  let timeNow = new Date(Date.parse(todo?.date)).toLocaleDateString(
    "fa-ir",
    options
  );

  // console.log(new Date(Date.parse(todo?.date)).getMinutes());
  //دقیق رو به انگلیسی میده

  // console.log(Date.now(todo.date));
  //تایم استمپ الان رو به من میده

  // console.log(timeNow.split(" ")[3]);
  // console.log(timeNow.split(" ")[2].split("")[0]);
  //اطلاعات روز و ساعت و این ها


  // console.log(new Date(Date.parse(todo?.date)).toLocaleString('fa-ir', { timeZone: 'UTC' }));

  //get hours in persian (age utc bashe time jahani mide)
  // let hoursToPersian = new Date(Date.parse(todo?.date))
  //   .toLocaleString("fa-ir", { timeZone: "UTC" })
  //   .split(",")[1];

  // saat ro be farsi mide
  let hoursToPersian = new Date(Date.parse(todo?.date))
    .toLocaleString("fa-ir")
    .split(",")[1];
  // console.log(new Date(Date.parse(todo?.date)).toLocaleString('fa-ir', { timeZone: 'UTC' }).split(",")[1]);

  //distance time to now from date-fns
  const result = formatDistanceToNow(new Date(Date.parse(todo?.date)), {
    locale: eoLocale,
  });

  //update Status
  const updateStatus = async (todo, todoId) => {
    try {
      setLoading(true);
      const { status } = await editTodo(todo, todoId);
      if (status === 200) {
        const { data: todosData } = await getAllTodos();
        setFilteredTodos(todosData);
        setTodos(todosData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="col-xs-12 col-sm-12 col-md-6 col-lg-4 shadow-lg">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <section className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <article className="col-xs-12">
              <ul className="list-group p-0">
                <li className="list-group-item list-group-item-dark">
                  نام کاربر:{"  "}
                  <span className="fw-bold">{todo.user}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  نام تودو:{"  "}
                  <span className="fw-bold">{todo.name}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  توضیحات تودو:{"  "}
                  <span className="fw-bold">
                    {todo.body.substr(0, 10) + "..."}
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark d-flex flex-column">
                  زمان ساخت تودو:{"  "}
                  <p className="fw-bold"> {result} قبل در تاریخ </p>
                  <p className="fw-bold">
                    {timeNow.split(" ")[3]} {timeNow.split(" ")[2].split("")[0]}{" "}
                    {timeNow.split(" ")[1]} {timeNow.split(" ")[0]}
                  </p>
                  <p className="fw-bold">
                    در ساعت:
                    {hoursToPersian}
                  </p>
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    updateStatus(
                      {
                        ...todo,
                        status: todo.status === "done" ? "undone" : "done",
                      },
                      todo.id
                    )
                  }
                  className="list-group-item list-group-item-dark poiner"
                >
                  وضعیت:{"  "}
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
            </article>
            <article className="d-flex justify-content-center align-items-center col-xs-12 mt-3">
              <Link
                to={`/todos/${todo.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <FaEye />
              </Link>

              <Link
                to={`/todos/edit/${todo.id}`}
                className="btn my-1 mx-4"
                style={{ backgroundColor: CYAN }}
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => deleteTodo(todo.id, todo.name, todo.user)}
                className="btn my-1"
                style={{ backgroundColor: RED }}
              >
                <MdDelete />
              </button>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};
export default Todo;

{
  /* <span className="fw-bold">
                    {moment(todo.date, "YYYY/MM/DD")
                      .locale("fa", { useGregorianParser: true })
                      .format("YYYY/MM/DD")}
                  </span> */
}
{
  /* {timeNow} */
}
