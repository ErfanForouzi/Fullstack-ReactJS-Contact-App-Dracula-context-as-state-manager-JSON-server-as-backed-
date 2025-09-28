import { PURPLE } from "../helpers/colors";

const Footer = () => {
  return (
    <div className="mt-5 shadowHeaderFooter">
        <div className="row w-100 mx-auto">
          <article className="col-sm-12 p-3 d-flex justify-content-center align-items-center">
            <div style={{ color: PURPLE ,fontSize:"1.2rem" }} className="d-flex justify-content-center align-items-center">
              <p className="mx-2">طراحی شده توسط عرفان فروزی</p>
              <p>&copy; 2024</p>
            </div>
          </article>
        </div>
    </div>
  );
};
export default Footer;
