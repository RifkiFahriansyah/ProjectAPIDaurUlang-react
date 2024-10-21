import React, {Suspense} from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

const Home = React.lazy(() => import('./components/Home')); 

// Jenis Sampah
const JenisSampahList = React.lazy(() => import('./components/JenisSampah/List')); 
const JenisSampahCreate = React.lazy(() => import('./components/JenisSampah/Create'));
const JenisSampahEdit = React.lazy(() => import("./components/JenisSampah/Edit"))

// Cara Daur Ulang
const ProsesDaurUlangList = React.lazy(() => import('./components/ProsesDaurUlang/List'));
const ProsesDaurUlangCreate = React.lazy(() => import('./components/ProsesDaurUlang/Create'));
const ProsesDaurUlangEdit = React.lazy(() => import('./components/ProsesDaurUlang/Edit'));

//Login
const ProsesLogin = React.lazy(() => import('./components/Login/Login'));

//Register
const ProsesRegister = React.lazy(() => import('./components/Register/Register'));

const App = () => {
  return (
    <Router>
          {/* <Navbar /> */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/jenisSampah">jenis Sampah</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/prosesDaurUlang">Proses Daur Ulang</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/register">Proses Register</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/login">Proses Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Navigation */}
      <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
      {/* Suspense untuk fallback saat loading */}
      <Routes>
        <Route path="/" element={<Home />}/> {/* Routes ke halaman Home */}
        <Route path="/jenisSampah" element={<JenisSampahList />}/> {/* Routes ke halaman Jenis Sampah List */}
        <Route path="/jenisSampah/create" element={<JenisSampahCreate />}/> {/* Routes ke halaman Jenis Sampah Create */}
        <Route path="/jenisSampah/edit/:id" element={<JenisSampahEdit />}/> {/* Routes ke halaman Jenis Sampah Edit */}
        <Route path="/ProsesDaurUlang" element={<ProsesDaurUlangList />}/> {/* Routes ke halaman Cara Daur Ulang List */}
        <Route path="/ProsesDaurUlang/create" element={<ProsesDaurUlangCreate />}/> {/* Routes ke halaman Cara Daur Ulang Create */}
        <Route path="/ProsesDaurUlang/edit/:id" element={<ProsesDaurUlangEdit />}/> {/* Routes ke halaman Cara Daur Ulang Edit */}

        <Route path="/register" element={< ProsesRegister />}/> {/* Routes ke halaman Cara Daur Register */}
        <Route path="/login" element={< ProsesLogin />}/> {/* Routes ke halaman Cara Daur Login */}
      </Routes>
      </Suspense>
      <div className="mt-2">&copy; 2024 Mahasiswa</div>
      </div>

      {/* Footer */}
    </Router>
  )
}

export default App
