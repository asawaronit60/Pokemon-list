import "./styles.css";
import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Paginate from "./Paginate";
export default function App() {
  const [Pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function goToNext() {
    setCurrentPageUrl(nextPageUrl);
  } //fn

  function goToPrev() {
    setCurrentPageUrl(prevPageUrl);
  } //fn

  while (loading) return "loading.....";

  return (
    <div>
      <PokemonList pokemon={Pokemon} />

      <Paginate
        goToNext={nextPageUrl ? goToNext : null}
        goToPrev={prevPageUrl ? goToPrev : null}
        load={loading}
      />
    </div>
  );
}
