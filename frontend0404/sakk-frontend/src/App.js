import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { SakkListPage } from "./SakkListPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { SakkSinglePage } from "./SakkSinglePage";
import { SakkCreatePage } from "./SakkCreatePage";
import { SakkModPage } from "./SakkModPage";
import { SakkDeletePage } from "./SakkDeletePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="active">
                <span className="nav-link">Sakkozók</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/uj-sakk" className="active">
                <span className="nav-link">Új sakkozó</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<SakkListPage />} />
        <Route path="/chess/:id" element={<SakkSinglePage />} />
        <Route path="/uj-sakk" element={<SakkCreatePage />} />
        <Route path="/mod-sakk/:id" element={<SakkModPage />} />
        <Route path="/del-sakk/:id" element={<SakkDeletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
