import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Appointment from "./pages/Appointment";
import Patients from "./pages/Patients";
import NewUsers from "./pages/Users";
import Treatment from "./pages/Treatment";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="patients" element={<Patients />} />
            <Route path="treatment" element={<Treatment />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<NewUsers />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
