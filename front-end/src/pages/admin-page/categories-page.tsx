import { useUserStore } from "../../store";

const CategoriesPage = () => {
  const { user } = useUserStore();
  return (
    <div>
      <h1>مدیریت دسته بندی ها</h1>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default CategoriesPage;
