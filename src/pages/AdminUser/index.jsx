import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Navbar, Sidebar } from "../../component";
import { fetchUsers, filterUser } from "../../features/getUserSlice";
import Swal from "sweetalert2";
import { colors } from "../../utils/colors";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function AdminUser() {
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.pending);

  const [role, setRole] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(`http://localhost:8000/api/v1/cms/users`));
  }, []);

  const delteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/v1/cms/users/${id}`);
        window.location.reload(false);
      }
    });
  };

  const roles = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "User",
      value: "user",
    },
    {
      name: "Admin Aplikasi",
      value: "Admin Aplikasi",
    },
    {
      name: "Admin Keuangan",
      value: "Admin Keuangan",
    },
    {
      name: "Admin Hotel",
      value: "Admin Hotel",
    },
  ];

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div className="d-flex mt-2">
          <Link to="/user/create-user">
            <Button color={colors.blue} backgroundColor={colors.yellow}>
              <div className="d-flex align-items-center">
                <AiOutlineUserAdd />
                <div className="ms-2 me-2">Add User</div>
              </div>
            </Button>
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">
                <div className="d-flex">
                  <div>Role</div>
                </div>
              </th>
              <th scope="col">username</th>
              <th scope="col">email</th>

              <th scope="col">actions</th>
            </tr>
          </thead>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <tbody>
              {users?.map((item) => (
                <tr key={item._id}>
                  <th scope="row">
                    <img
                      src={`http://localhost:8000/${item?.image?.name}`}
                      style={{ width: 30, height: 30 }}
                    />
                  </th>
                  <td>{item?.role}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>

                  <td className="d-flex">
                    <div className="me-2">
                      <Link to={`/user/edit-user/${item._id}`}>
                        <Button
                          title="Edit"
                          backgroundColor={colors.blue}
                          color={colors.white}
                          height={5}
                        />
                      </Link>
                    </div>
                    <div>
                      <Button
                        title="Hapus"
                        backgroundColor={colors.red}
                        color={colors.white}
                        height={5}
                        onClick={() => delteUser(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
