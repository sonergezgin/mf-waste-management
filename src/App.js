
import Register from "./Register";

import Login from "./Login";

import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import WasteInput from "./components/WasteInput";
import Statistics from "./components/Statistics";


const ROLES = {
  // 'User' : 2001,
  'Worker' : "CLEANING_STAFF",
  'Admin' : "ADMIN"
}


const App = () => {
  
  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes viewed by anyone not even needed to be user */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path = "statistics" element = {<Statistics/>} />
        <Route path="unauthorized" element={<Unauthorized />} />
         

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          

          <Route element={<RequireAuth allowedRoles={[ROLES.Worker]} />}>
            <Route path="wasteInput" element={<WasteInput />} />     
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
