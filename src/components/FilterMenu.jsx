import { Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { FilterAlt } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { getCategories } from "../api";

function FilterMenu({ setFilter }) {
  const [anchorEl, setEnchorEl] = useState(null);
  const [categories, setCategories] = useState(null)
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function gc() {
      const json = await getCategories();
      const cat = []
      json.forEach(category => {
        cat.push(category.name)
      })
      setCategories(cat);
    }
    gc();
  }, [])

  const handleClick = (e) => {
    setEnchorEl(e.currentTarget);
  };

  const handleExit = () => {
    setEnchorEl(null)
  }

  const handleClose = (e) => {
    e.target.innerText === 'Reset' ? setFilter(null) : setFilter(e.target.innerText)
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
        Filter by <FilterAlt />
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
        <MenuItem sx={{ fontVariant: 'small-caps' }}>category</MenuItem>
        {categories && categories.map((category, id) => <MenuItem key={id} onClick={handleClose}>{category}</MenuItem>)}
        {/* {categories && console.log(categories)} */}
      </Menu>
    </div>
  );
}

export default FilterMenu;
