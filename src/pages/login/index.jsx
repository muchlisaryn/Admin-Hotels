import { Button, Logo } from "../../component";
import { colors } from "../../utils/colors";
import "./style.css";
import { useState, useEffect } from "react";
import { Spinner } from "../../asset/img";
import { useDispatch, useSelector } from "react-redux";
import { auth, setUser } from "../../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const userTOken = useSelector((state) => state.auth.userToken);
  const navigate = useNavigate();

  const Login = async () => {
    dispatch(auth({ email, password }));
  };

  useEffect(() => {
    if (user?.role === "user") {
      alert("Anda tidak bisa mengakses halaman ini");
    } else if (user?.role === "Admin Keuangan") {
      navigate("/admin/keuangan/pemesanan-baru");
    } else if (user?.role === "Admin Aplikasi") {
      dispatch(setUser(user?.token));
      navigate("/admin/aplikasi/kelolaUser");
    }
  });

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="card-login">
        <div className="logo d-flex justify-content-center">
          <Logo size={200} />
        </div>

        <div className="text-center mt-3 fw-semibold">LOGIN ADMIN</div>

        {error ? (
          <div className="fw-bold text-center text-danger">
            Email / Password Salah
          </div>
        ) : (
          <></>
        )}

        <div className="mt-2">
          <div className="input-item ">
            <div className="title">Email</div>
            <input
              placeholder="Please Input Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <div className="title">Password</div>
            <input
              placeholder="Please Input Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            color={colors.white}
            backgroundColor={colors.blue}
            height={15}
            fontSize={14}
            onClick={Login}
          >
            {loading ? <div>Loading...</div> : <div>Login</div>}
          </Button>
        </div>
      </div>
    </div>
  );
}
