import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Sidebar } from "../../../component";
import { colors } from "../../../utils/colors";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/getUserSlice";

export default function CreateUser() {
  const dispatch = useDispatch();
  const [idHotel, setIdHotel] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [telephone, setTelephone] = useState();
  const [Nomorek, setNomorRek] = useState();
  const [nameBank, setNameBank] = useState();
  const [PemilikRek, setPemilikRek] = useState();
  const [role, setRole] = useState("user");
  const [photo, setPhoto] = useState();
  const [messageError, setMessageError] = useState("");
  const [showPw, setShowPw] = useState("password");
  const [textPassword, setTextPassword] = useState(<AiFillEye />);
  const [dataHotel, setDataHotel] = useState([]);
  const datas = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(fetchUsers(`http://localhost:8000/api/v1/cms/users`));
  }, []);

  const navigate = useNavigate();
  console.log(idHotel);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/cms/hotel`)
      .then((res) => {
        setDataHotel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rolesBank = [
    {
      name: "BCA ",
      value: "BCA",
    },
    {
      name: "BRI",
      value: "BRI",
    },
    {
      name: "BNI",
      value: "BNI",
    },
  ];

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
    console.log(e.target.files[0]);
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

  const showPassword = (e) => {
    e.preventDefault();
    if (showPw === "text") {
      setShowPw("password");
      setTextPassword(<AiFillEyeInvisible />);
    } else if (showPw === "password") {
      setShowPw("text");
      setTextPassword(<AiFillEye />);
    }
  };

  const Create = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/v1/cms/users", {
      hotel: idHotel,
      image: photo,
      email: email,
      password,
      username: username,
      firstName: firstName,
      lastName: lastName,
      telephone: telephone,
      name_bank: nameBank,
      no_rekening: Nomorek,
      nama_rekening: PemilikRek,
      role: role,
    });
    if (res.data.data) {
      console.log("berhasil");
      navigate("/admin/aplikasi/kelolaUser/all-user");
    } else {
      setMessageError(res.response.data.msg);
      console.log(res.response);
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
              <Button
                title="Back To Home"
                color={colors.white}
                backgroundColor={colors.blue}
              />
            </Link>
          </div>
        </div>
        <div className="edit">
          <form method="POST">
            {role === "Admin Hotel" ? (
              <div className="d-flex">
                <div style={{ width: 162 }}>Nama Hotel</div>
                <select
                  name="hotel"
                  id="hotel"
                  onChange={(e) => setIdHotel(e.target.value)}
                >
                  {dataHotel?.map((item) => (
                    <option value={item?._id}>{item?.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <></>
            )}

            <div className="form-group d-flex  ">
              <div className="me-2" style={{ width: 180 }}>
                Email
              </div>

              <div class="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="input-group-append">
                  <span class="input-group-text">@Gmail.com</span>
                </div>
              </div>
            </div>
            {messageError === "Email Sudah Terdaftar" ? (
              <p style={{ marginLeft: 97, color: "red" }}>{messageError}</p>
            ) : (
              <></>
            )}

            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 180 }}>
                Password
              </div>

              <div class="input-group">
                <input
                  type={showPw}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Button
                    backgroundColor={colors.blue}
                    height={8}
                    color={colors.white}
                    onClick={showPassword}
                  >
                    {textPassword}
                  </Button>
                </div>
              </div>
            </div>

            {role === "Admin Hotel" ? (
              <></>
            ) : (
              <>
                <div className="form-group d-flex">
                  <div className="me-2" style={{ width: 180 }}>
                    Username
                  </div>
                  <input
                    className="form-control"
                    placeholder="Input Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex">
                  <div className="me-2" style={{ width: 180 }}>
                    First Name
                  </div>
                  <input
                    className="form-control"
                    placeholder="Input First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex">
                  <div className="me-2" style={{ width: 180 }}>
                    Last Name
                  </div>
                  <input
                    className="form-control"
                    placeholder="Input Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 180 }}>
                Telephone
              </div>
              <input
                placeholder="Input Email"
                className="form-control"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            <div className="d-flex mt-2">
              <div style={{ width: 160 }}>Nomor Rekening</div>
              <div className="d-flex">
                <select
                  name="role"
                  id="role"
                  onChange={(e) => setNameBank(e.target.value)}
                >
                  {rolesBank?.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </select>
                <input
                  placeholder="Input Nomor rekening..."
                  className="form-control ms-2"
                  value={Nomorek}
                  onChange={(e) => setNomorRek(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 180 }}>
                Pemilik Rekening
              </div>
              <input
                placeholder="Nama Pemilik Rekening..."
                className="form-control"
                value={PemilikRek}
                onChange={(e) => setPemilikRek(e.target.value)}
              />
            </div>

            {messageError === "Telephone harus diisi" ? (
              <p style={{ marginLeft: 97, color: "red" }}>{messageError}</p>
            ) : (
              <></>
            )}
            <div className="form-group d-flex">
              <div className="me-2" style={{ width: 180 }}>
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
              <div style={{ width: 160 }}>Role</div>
              <select
                name="role"
                id="role"
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
                  color={colors.white}
                  backgroundColor={colors.blue}
                  height={10}
                  marginRight={5}
                  onClick={Create}
                />
                <Button
                  title="Clear"
                  height={10}
                  onClick={clear}
                  backgroundColor={colors.green}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
