import { LuListTodo } from "react-icons/lu";
import {SearchTodo} from "./index";
import { PURPLE } from "../helpers/colors";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadowHeaderFooter">
      <div className="container d-flex justify-content-center">
        <section className="row w-100 align-items-center">
          <article className="col-xs-12 col-sm-12 col-md-6 col-lg-5 mb-2 mb-md-0">
           <div className="navbar-brand ">
          <Link style={{textDecoration:"none"}} className="d-flex justify-content-center align-items-center" to={`/todos`}>
          <LuListTodo style={{ color: PURPLE,fontSize:"25px" }} />
           <span className="m-1 text-white"> اپلیکیشن مدیریت </span><span style={{ color: PURPLE}}>تودولیست</span>
          </Link>
           </div>
          </article>
          {location.pathname ==="/todos" && (
            <article className="col-xs-12 col-sm-12 col-md-6 col-lg-7">
            <SearchTodo />
          </article>
          )}
        </section>
      </div>
    </nav>
  );
};
export default Navbar;
