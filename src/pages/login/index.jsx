import { Button, Logo } from "../../component";
import { colors } from "../../utils/colors";
import "./style.css";
import { useState } from "react";
import { Spinner } from "../../asset/img";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../features/authSlice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const Login = () => {
    dispatch(auth({ email: email, password: password }));
  };

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="card-login">
        <div className="logo d-flex justify-content-center">
          <Logo size={120} />
        </div>
        <div className="mt-3">
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
          <Button color={colors.blue} height={3} fontSize={14} onClick={Login}>
            {loading ? (
              <img src={Spinner} style={{ width: 25 }} />
            ) : (
              <div>Login</div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
