import { Button, Divider } from "@mui/material";

import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

function SortMenu({ setSort }) {
  const [anchorEl, setEnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setEnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.target.innerText === 'Reset' ? setSort(null) : setSort(e.target.innerText)
    // console.log(e.target.innerText)
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
        Sort by
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>Reset</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>price</MenuItem>
      </Menu>
    </div>
  );
}

export default SortMenu;
