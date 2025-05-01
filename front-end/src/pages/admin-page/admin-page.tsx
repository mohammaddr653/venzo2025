import { Link } from "react-router-dom";
import { useUserStore } from "../../store";

const AdminPage = () => {
  const { user } = useUserStore();
  return (
    <div>
      <h1 className="bg-blue-300">hello admin</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.isadmin ? "is admin" : "not admin"}</h1>
      <h1>admin page</h1>
      <div className="bg-gray-300 flex">
        <Link to={"/admin/users"}>مدیریت کاربران</Link>
        <Link to={"/admin/categories"}>مدیریت دسته بندی ها</Link>
        <Link to={"/admin/products"}>مدیریت محصولات</Link>
        {/* <Link to={"/admin/blogs"}>مدیریت مقالات</Link> */}
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default AdminPage;
