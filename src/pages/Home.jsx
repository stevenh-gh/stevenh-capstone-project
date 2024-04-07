import { Box } from "@mui/material";
import FilterMenu from "../components/FilterMenu";
import ShowProducts from "../components/ShowProducts";
import SortMenu from "../components/SortMenu";
import { useState } from "react";

function Home({ token }) {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [sortPriceDir, setSortPriceDir] = useState(-1);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterMenu setFilter={setFilter} />
        <SortMenu sortPriceDir={sortPriceDir} setSortPriceDir={setSortPriceDir} sort={sort} setSort={setSort} />
      </Box>
      <ShowProducts token={token} filter={filter} sort={sort} sortPriceDir={sortPriceDir} />
    </>
  );
}

export default Home;
