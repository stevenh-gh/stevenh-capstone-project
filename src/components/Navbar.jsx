import { Link } from "react-router-dom";

function Navbar({ token, setToken }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {!token
            ? <Link to="/login">login</Link>
            : (
              <span
                onClick={() => {
                  window.localStorage.setItem("token", "");
                  setToken(window.localStorage.getItem("token"));
                }}
              >
                logout
              </span>
            )}
        </li>
        {!token && (
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        )}
        {token && (
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
