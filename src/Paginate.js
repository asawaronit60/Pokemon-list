import React from "react";

export default function Paginate(props) {
  return (
    <div>
      {!props.goToPrev ? null : (
        <button onClick={props.goToPrev}>previous</button>
      )}
      <button onClick={props.goToNext}>Next</button>
    </div>
  );
}
