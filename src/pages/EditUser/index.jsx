import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";
import "./style.css";

export default function EditUser() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [telephone, setTelephone] = useState();
  const [role, setRole] = useState("user");
  const [photo, setPhoto] = useState();

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

  console.log(photo);
  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
          <div className="fw-bold">EDIT USER</div>
          <div className="d-flex">
            <Link to="/user">
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
