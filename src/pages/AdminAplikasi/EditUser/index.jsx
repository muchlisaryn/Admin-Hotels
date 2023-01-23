import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Sidebar } from "../../../component";
import { colors } from "../../../utils/colors";
import "./style.css";

export default function EditUser() {
  const { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const navigate = useNavigate();

  let filter = users.filter((person) => person._id === id);

  const [email, setEmail] = useState(filter[0]?.email);
  const [password, setPassword] = useState(filter[0]?.password);
  const [username, setUsername] = useState(filter[0]?.username);
  const [firstName, setFirstName] = useState(filter[0]?.firstName);
  const [lastName, setLastName] = useState(filter[0]?.lastName);
  const [telephone, setTelephone] = useState(filter[0]?.telephone);
  const [role, setRole] = useState(filter[0]?.role);
  const [photo, setPhoto] = useState();
  const [showEye, setShowEye] = useState();

  console.log(telephone);
  const roles = [
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

  const clear = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setTelephone(0);
    setRole("user");
    setPhoto(null);
  };

  const edit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/v1/cms/users/${id}`, {
      email: email,
      firstName: firstName,
      image: photo,
      lastName: lastName,
      password: password,
      role: role,
      telephone: telephone,
      username: username,
    });
    navigate("/admin/aplikasi/kelolaUser");
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
          <div className="fw-bold">EDIT USER</div>
          <div className="d-flex">
            <Link to="/admin/aplikasi/kelolaUser">
              <Button title="Back To Home" color={colors.yellow} />
            </Link>
          </div>
        </div>
        <div className="edit">
          <div>
            <div className="form-group d-flex  ">
              <div className="me-2" style={{ width: 100 }}>
                Email
              </div>
              <input
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Password
              </div>
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Username
              </div>
              <input
                placeholder="Input Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                First Name
              </div>
              <input
                placeholder="Input First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Last Name
              </div>
              <input
                placeholder="Input Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Telephone
              </div>
              <input
                placeholder="Input Email"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Photo
              </div>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.value)}
                value={photo}
              />
            </div>
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 90 }}>
                Role
              </div>
              <select
                name="cars"
                id="cars"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles?.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 d-flex justify-content-end ">
              <div className="d-flex w-25">
                <Button
                  title="Edit"
                  color={colors.blue}
                  height={10}
                  marginRight={5}
                  onClick={edit}
                />
                <Button title="Clear" height={10} onClick={clear} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
