import { useUserStore } from "../store";

const UserPage = () => {
  const { user } = useUserStore();
  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.isadmin ? "is admin" : "not admin"}</h1>
      <h1>user page</h1>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default UserPage;
