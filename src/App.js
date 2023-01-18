import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminUser, Login, EditUser, CreateUser, AdminKeuangan } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<AdminUser />} />
        <Route path="user/edit-user/:id" element={<EditUser />} />
        <Route path="user/create-user" element={<CreateUser />} />
        <Route path="/keuangan" element={<AdminKeuangan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
