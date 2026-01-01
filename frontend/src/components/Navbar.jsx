import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>🏫 School Management</h2>

      <div className="nav-links">
        <NavLink to="/" end>Add School</NavLink>
        <NavLink to="/schools">View Schools</NavLink>
      </div>
    </div>
  );
}
