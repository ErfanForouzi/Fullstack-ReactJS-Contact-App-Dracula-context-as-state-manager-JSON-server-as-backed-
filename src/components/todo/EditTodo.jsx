import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";
import { MdEditSquare } from "react-icons/md";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { editTodo, getTodo } from "../../services/todosServices";
import { TodoContext } from "../../context/todoContext";
import { todosSchema } from "../../validations/todosValidation";

const EditTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();

  const [todo, setTodo] = useState({});
  const { loading, setLoading, setFilteredTodos, setTodos, todos } =
    useContext(TodoContext);

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

  const updateTodoForm = async (query) => {
    try {
      setLoading(true);
      const { data, status } = await editTodo(
        { ...query, date: todo.date, status: todo.status },
        todoId
      );
      if (status === 200) {
        toast("تودو با موفقیت ویرایش شد", {
          icon: <MdEditSquare style={{ color: PURPLE }} />,
        });
        setLoading(false);
        const allTodos = [...todos];
        const todoIndex = allTodos.findIndex((todo) => todo.id === todoId);
        allTodos[todoIndex] = { ...data };
        setFilteredTodos(allTodos);
        setTodos(allTodos);
        navigate("/todos");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>تودولیست || صفحه ویرایش تودو</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(todo).length > 0 ? (
            <section className="container p-3">
              <article className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: ORANGE }}
                  >
                    ویرایش تودو
                  </p>
                </div>
              </article>
              <hr style={{ zIndex: 10, color: ORANGE }} />
              <article className="row mt-5">
                <div className="col-md-7">
                  <Formik
                    initialValues={{
                      user: todo.user,
                      name: todo.name,
                      body: todo.body,
                    }}
                    validationSchema={todosSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      updateTodoForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="user"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage
                          name="user"
                          render={(msg) => (
                            <p className="text-danger my-2">{msg}</p>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="نام تودو"
                        />
                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <p className="text-danger my-2">{msg}</p>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="body"
                          type="text"
                          className="form-control"
                          placeholder="توضیحات تودو"
                          rows="10"
                          cols="100"
                          as="textarea"
                        ></Field>
                        <ErrorMessage
                          name="body"
                          render={(msg) => (
                            <p className="text-danger my-2">{msg}</p>
                          )}
                        />
                      </div>
                      <div className="mx-2 mt-3 d-flex justify-content-center justify-content-md-start">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ویرایش تودو"
                        />
                        <Link
                          to={"/todos"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="d-none d-md-block col-md-5">
                  <img
                    src={require("../../assets/Todo3.png")}
                    className="w-100 h-100"
                    style={{
                      opacity: "50%",
                    }}
                  />
                </div>
              </article>
            </section>
          ) : (
            <div style={{ color: PURPLE }} className="not-allowed-edit">
              <h1>شیطونی نکن بچه😈😡👺</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditTodo;
