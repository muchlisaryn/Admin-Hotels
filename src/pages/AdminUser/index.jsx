import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { deleteUsers, fetchUsers } from "../../features/getUserSlice";
import { colors } from "../../utils/colors";

export default function AdminUser() {
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.pending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(`http://localhost:8000/api/v1/cms/users`));
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between border-bottom pb-3">
          <div>Wellcome Admin Budi</div>
          <div className="d-flex">
            <Link to="/user/create-user">
              <Button title="Create User" color={colors.yellow} />
            </Link>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">Role</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">telephone</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <tbody>
              {users?.map((item) => (
                <tr key={item._id}>
                  <th scope="row">1</th>
                  <td>{item?.role}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{item?.telephone}</td>
                  <td className="d-flex">
                    <div className="me-2">
                      <Link to={`/user/edit-user/${item._id}`}>
                        <Button title="edit" color={colors.yellow} />
                      </Link>
                    </div>
                    <div>
                      <Button
                        title="Hapus"
                        color={colors.blue}
                        onClick={() => dispatch(deleteUsers(item._id))}
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
