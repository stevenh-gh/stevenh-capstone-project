import FilterMenu from "../components/FilterMenu";
import ShowProducts from "../components/ShowProducts";
import SortMenu from "../components/SortMenu";
import { useState } from "react";

function Home() {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [sortPriceDir, setSortPriceDir] = useState(-1);

  return (
    <>
      <FilterMenu setFilter={setFilter} />
      <SortMenu sortPriceDir={sortPriceDir} setSortPriceDir={setSortPriceDir} sort={sort} setSort={setSort} />
      <ShowProducts filter={filter} sort={sort} sortPriceDir={sortPriceDir} />
    </>
  );
}

export default Home;
