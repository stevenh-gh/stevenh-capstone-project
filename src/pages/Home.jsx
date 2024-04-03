import FilterMenu from "../components/FilterMenu";
import ShowProducts from "../components/ShowProducts";
import SortMenu from "../components/SortMenu";
import { useState } from "react";

function Home() {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

  return (
    <>
      <FilterMenu setFilter={setFilter} />
      <SortMenu setSort={setSort} />
      <ShowProducts filter={filter} sort={sort} />
    </>
  );
}

export default Home;
