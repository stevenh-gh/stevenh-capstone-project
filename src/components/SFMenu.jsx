import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

function SFMenu() {
  const [anchorEl, setEnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setEnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    console.log(e.target.innerText)
    setEnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-menu"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Filter by
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>Category</MenuItem>
      </Menu>
    </div>
  );
}

export default SFMenu;
