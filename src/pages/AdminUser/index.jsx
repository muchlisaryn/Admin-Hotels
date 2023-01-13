import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";

export default function AdminUser() {
  const users = useSelector((state) => state.users.users);
  console.log("users", users);

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
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>User</td>
              <td>muchlis12</td>
              <td>muchlisar68@gmail.com</td>
              <td>081310750099</td>
              <td className="d-flex">
                <div className="me-2">
                  <Link to="/user/edit-user/:id">
                    <Button title="edit" color={colors.yellow} />
                  </Link>
                </div>
                <div>
                  <Button title="Hapus" color={colors.blue} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
