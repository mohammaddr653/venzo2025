import { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../hooks/callManager";
import { SERVER_API } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";

const UsersPage = () => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });

  async function loadUsers() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/users"),
      false
    );
    setUsers([...response.data.data]);
  }
  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/users/${userId}`),
      true
    );
    loadUsers();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: any
  ) => {
    navigate("/admin/update-user", { state: { userId } });
  };

  const handleRefresh = () => {
    loadUsers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/users", formData),
      true
    );
  };

  return (
    <div>
      <h1>مدیریت کاربران</h1>
      <div className="bg-red-300">
        <h1>ثبت نام</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="border"
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="border"
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="border"
            onChange={handleChange}
          />
          <LoadingButton loading={loading}>ثبت نام</LoadingButton>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of users</caption>
          <thead>
            <tr>
              <th className="border">id</th>
              <th className="border">name</th>
              <th className="border">email</th>
              <th className="border">password</th>
              <th className="border">operation</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">{user._id}</td>
                  <td className="border">{user.name}</td>
                  <td className="border">{user.email}</td>
                  <td className="border">{user.password}</td>
                  <td className="border">
                    <button
                      onClick={(e, userId = user._id) => {
                        handleDelete(e, userId);
                      }}
                    >
                      REMOVE
                    </button>
                    <button
                      onClick={(e, userId = user._id) => {
                        handleUpdate(e, userId);
                      }}
                    >
                      UPDATE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
};
export default UsersPage;
