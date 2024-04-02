import { Box, Typography } from "@mui/material";

import { Link } from "react-router-dom";

function Navbar({ token, setToken }) {
  return (
    <nav>
      <Typography variant="body1">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Link to="/">Home</Link>
          </Box>
          <Box>
            {!token
              ? (
                <>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Login</Link>
                </>
              )
              : <Link onClick={() => setToken(null)}>Logout</Link>}
            {token && <Link to='/cart'>Cart</Link>}
          </Box>
        </Box>
      </Typography>
    </nav>
  );
}

export default Navbar;
