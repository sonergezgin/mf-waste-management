
import Register from "./Register";

import Login from "./Login";

import Home from './components/Home';
import Layout from './components/Layout';
import Worker from './components/Worker';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import WasteInput from "./components/WasteInput";


const ROLES = {
  'User' : 2001,
  'Worker' : "CLEANING_STAFF",
  'Admin' : "ADMIN"
}


const App = () => {
  
  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes viewed by anyone not even needed to be user */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="wasteInput" element={<WasteInput />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Worker]} />}>
            <Route path="worker" element={<Worker />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Worker, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

  );
}

export default App;
