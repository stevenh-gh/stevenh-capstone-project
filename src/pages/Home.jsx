import FilterMenu from "../components/FilterMenu";
import ShowProducts from "../components/ShowProducts";
import { useState } from "react";

function Home() {
  const [filter, setFilter] = useState('')

  return (
    <>
      <FilterMenu setFilter={setFilter} />
      <ShowProducts filter={filter} />
    </>
  );
}

export default Home;
