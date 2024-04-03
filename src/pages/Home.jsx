import SFMenu from "../components/SFMenu";
import ShowProducts from "../components/ShowProducts";
import { useState } from "react";

function Home() {
  const [filter, setFilter] = useState('')

  return (
    <>
      <SFMenu setFilter={setFilter} />
      <ShowProducts filter={filter} />
    </>
  );
}

export default Home;
