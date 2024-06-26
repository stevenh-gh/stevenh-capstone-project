import { Button, Divider } from "@mui/material";

import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort"
import { useState } from "react";

function SortMenu({ sort, setSort, sortPriceDir, setSortPriceDir }) {
  const [anchorEl, setEnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setEnchorEl(e.currentTarget);
  };

  const handleExit = () => {
    setEnchorEl(null)
  }

  const handleClose = (e) => {
    e.target.innerText === 'Reset' ? setSort(null) : setSort(e.target.innerText)
    sort && sort.includes('price') && setSortPriceDir(-sortPriceDir);
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
        Sort by <SortIcon />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleExit}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>Reset</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>price {sortPriceDir > 0 ? '(descending)' : '(ascending)'}</MenuItem>
      </Menu>
    </div>
  );
}

export default SortMenu;
