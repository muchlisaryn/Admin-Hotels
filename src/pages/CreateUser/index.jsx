import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";
import "./style.css";

export default function CreateUser() {
  const [idHotel, setIdHotel] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [telephone, setTelephone] = useState();
  const [role, setRole] = useState("user");
  const [photo, setPhoto] = useState();
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

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

  const clear = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setTelephone(0);
    setRole("user");
    setPhoto(null);
  };

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await axios.post(
      "http://localhost:8000/api/v1/cms/images",
      formData,
      true
    );
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0].type === "image/jpg" ||
        e?.target?.files[0].type === "image/png" ||
        e?.target?.files[0].type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          alert("please select image size less than 3 MB");
        } else {
          const res = await uploadImage(e.target.files[0]);
          setPhoto(res.data.data._id);
        }
      } else {
        alert("Please input Image format PNG | JPG | JPEG");
      }
    }
  };

  const Create = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/v1/cms/users", {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: lastName,
      telephone: telephone,
      image: photo,
      role: role,
    });
    if (res.data.data) {
      console.log("berhasil");
      navigate("/user");
    } else {
      console.log(res.response.data.msg);
    }
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
          <div className="fw-bold">CREATE USER</div>
          <div className="d-flex">
            <Link to="/user">
              <Button title="Back To Home" color={colors.yellow} />
            </Link>
          </div>
        </div>
        <div className="edit">
          <form method="POST">
            {role === "Admin Hotel" ? (
              <div className="form-group d-flex  ">
                <div className="me-2" style={{ width: 100 }}>
                  ID Hotel
                </div>
                <input
                  placeholder="Input Email"
                  value={idHotel}
                  onChange={(e) => setIdHotel(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
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
            {messageError === "Email Sudah Terdaftar" ? (
              <p style={{ marginLeft: 97, color: "red" }}>{messageError}</p>
            ) : (
              <></>
            )}

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
            {messageError === "Telephone harus diisi" ? (
              <p style={{ marginLeft: 97, color: "red" }}>{messageError}</p>
            ) : (
              <></>
            )}
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 100 }}>
                Photo
              </div>
              <input
                type="file"
                onChange={handleChange}
                label={"avatar"}
                name="avatar"
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
                  title="Create"
                  color={colors.blue}
                  height={10}
                  marginRight={5}
                  onClick={Create}
                />
                <Button title="Clear" height={10} onClick={clear} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
