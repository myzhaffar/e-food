import React, { useState } from "react";

export default function Test2(props) {
 
  return (
    <>
      <button onClick={props.test} > ganti nama</button>
      <props.Terserah />
    </>
  );
}
