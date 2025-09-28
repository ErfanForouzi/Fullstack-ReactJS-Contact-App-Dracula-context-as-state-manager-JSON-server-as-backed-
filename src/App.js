import { useState, useEffect } from "react";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AddTodo, EditTodo, Navbar, Todos, ViewTodo,Footer,NotFound } from "./components";

import { createTodo, deleteTodo, getAllTodos } from "./services/todosServices";
import { confirmAlert } from "react-confirm-alert";
import {
  CURRENTLINE,
  CYAN,
  FOREGROUND,
  ORANGE,
  PINK,
  PURPLE,
  RED,
} from "./helpers/colors";

import { TodoContext } from "./context/todoContext";

import { ToastContainer, toast } from "react-toastify";

import _ from "lodash";
import { useImmer } from "use-immer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const App = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useImmer([]);
  const [loading, setLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useImmer([]);
  const [todoQuery, setTodoQuery] = useState({ text: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: todosData } = await getAllTodos();
        setTodos(todosData);
        setFilteredTodos(todosData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //function for creating todo in add-todo
  const createTodoForm = async (values) => {
    try {
      setLoading(true);

      const { status, data } = await createTodo({
        ...values,
        date: new Date(),
        status: "undone",
      });

      if (status === 201) {
        // const allTodos = [...todos, data];
        // setTodos(allTodos);
        // setFilteredTodos(allTodos);
        toast.success("تودو با موفقیت ساخته شد",{icon:"✅"})
        setTodos((draft) => {
          draft.push(data);
        });
        setFilteredTodos((draft) => {
          draft.push(data);
        });

        setLoading(false);
        navigate("/todos");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  //function for confirm to delete todo
  const confirmDelete = (todoId, todoTitle, user) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            style={{
              backgroundColor: CURRENTLINE,
              border: `5px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h3 style={{ color: ORANGE }}>حذف کردن تودو </h3>
            <p style={{ color: FOREGROUND }}>
              آیا <span style={{ color: PINK }}>{user}</span> از حذف تودو با نام{" "}
              <span style={{ color: CYAN }}>{todoTitle}</span> مطمئن هستی ؟
            </p>
            <button
              className="btn mx-2 text-white"
              style={{ backgroundColor: PURPLE }}
              onClick={() => {
                removeTodo(todoId);
                onClose();
              }}
            >
              مطمئن هستم
            </button>
            <button
              className="btn mx-2 text-white"
              style={{ backgroundColor: RED }}
              onClick={onClose}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  //functionn for removing todo
  const removeTodo = async (todoId) => {
    // const allTodos = [...todos];
    try {
      setLoading(true);
      const { status } = await deleteTodo(todoId);
      if (status === 200) {
        toast.error("تودو با موفقیت حذف شد",{icon:"❌"})
        setLoading(false);
        // const remainingTodos = allTodos.filter((todo) => todo.id !== todoId);
        // setFilteredTodos(remainingTodos);
        // setTodos(remainingTodos);
        setTodos((draft) => draft.filter((todo) => todo.id !== todoId));
        setFilteredTodos((draft) => draft.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  //function for filtering
  const searchTodo = _.debounce((query) => {
    setTodoQuery({ ...todoQuery, text: query.toLowerCase() });
    setFilteredTodos(
      todos.filter((todo) => {
        return todo.user.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 200);

  return (
    <TodoContext.Provider
      value={{
        loading,
        setLoading,
        todos,
        setTodos,
        filteredTodos,
        setFilteredTodos,
        todoQuery,
        searchTodo,
        createTodo: createTodoForm,
        deleteTodo: confirmDelete,
      }}
    >
      <HelmetProvider>
      <Helmet>
        <title>تودولیست || صفحه اصلی</title>
      </Helmet>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/todos"} />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/:todoId" element={<ViewTodo />} />
          <Route path="/todos/edit/:todoId" element={<EditTodo />} />
          <Route path="/todos/add" element={<AddTodo />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </HelmetProvider>
    </TodoContext.Provider>
  );
};
export default App;
