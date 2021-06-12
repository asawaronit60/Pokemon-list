import React from "react";

export default function PokemonList(props) {
  return (
    <div>
      {props.pokemon.map((p) => (
        <li>{p}</li>
      ))}
    </div>
  );
}
