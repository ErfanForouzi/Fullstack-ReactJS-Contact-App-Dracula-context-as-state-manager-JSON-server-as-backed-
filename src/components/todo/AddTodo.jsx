import { Link } from "react-router-dom";

import { useFormik } from "formik";

import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { todosSchema } from "../../validations/todosValidation";

const AddTodo = () => {
  const { loading, todo, onTodoChange, createTodo } = useContext(TodoContext);
  const formik = useFormik({
    initialValues: {
      user: "",
      name: "",
      body: "",
    },
    validationSchema: todosSchema,
    onSubmit: (values) => {
      console.log(values);
      createTodo(values)
    },
  });


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="container p-3">
            <article className="row">
              <div className="col">
                <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                  ساخت تودو جدید
                </p>
              </div>
            </article>
            <hr style={{ zIndex: 10, color: GREEN }} />
            <article className="row mt-5">
              <div className="col-md-7">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-2">
                    <input
                      id="user"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.user}
                      name="user"
                      type="text"
                      className="form-control"
                      placeholder="نام و نام خانوادگی"
                      // value={todo.user}
                      // required={true}
                      // onChange={onTodoChange}
                    />
                    {formik.touched.user && formik.errors.user ? (
                      <p className="text-danger my-2">{formik.errors.user}</p>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <input
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="نام تودو"
                      // required={true}
                      // value={todo.name}
                      // onChange={onTodoChange}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <p className="text-danger my-2">{formik.errors.name}</p>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <textarea
                      id="body"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.body}
                      name="body"
                      type="text"
                      className="form-control"
                      placeholder="توضیحات تودو"
                      rows="10"
                      cols="100"
                      // required={true}
                      // value={todo.body}
                      // onChange={onTodoChange}
                    ></textarea>
                    {formik.touched.body&&formik.errors.body ? (
                      <p className="text-danger my-2">{formik.errors.body}</p>
                    ) : null}
                  </div>
                  <div className="mx-2 mt-3 d-flex justify-content-center justify-content-md-start">
                    <input
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                      value="ساخت تودو"
                    />
                    <Link
                      to={"/todos"}
                      className="btn mx-2"
                      style={{ backgroundColor: COMMENT }}
                    >
                      انصراف
                    </Link>
                  </div>
                </form>
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
        </>
      )}
    </>
  );
};

export default AddTodo;
