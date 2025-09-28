import * as Yup from "yup";

export const todosSchema = new Yup.object().shape({
    user:Yup.string().required("نام کاربر الزامی میباشد"),
    name:Yup.string().required("نام تودو الزامی میباشد").min(2,"نام تودو حداقل باید دارای 2 کاراکتر باشد"),
    body:Yup.string().required("محتوا تودو الزامی میباشد").min(4,"محتوا تودو حداقل باید دارای 4 کاراکتر باشد"),
})