import { Box, Typography } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { Link } from "react-router-dom";

function Navbar({ user, setUser, token, setToken }) {
  return (
    <nav>
      <Typography variant="body1">
        {user && <p>Welcome back, {user.username}!</p>}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Link to="/">Home</Link>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {!token
              ? (
                <>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Login</Link>
                </>
              )
              : <Link onClick={() => {
                setToken(null)
                setUser(null)
                window.localStorage.removeItem('token')
                enqueueSnackbar('You have been logged out')
              }}>Logout</Link>}
            {token && <Link to='/cart'>Cart</Link>}
          </Box>
        </Box>
      </Typography>
      <SnackbarProvider />
    </nav>
  );
}

export default Navbar;
