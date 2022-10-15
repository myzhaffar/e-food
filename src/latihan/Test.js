import React, { useState } from "react";
import Makanan from "../Info/Makanan";
import Test2 from "./Test2";
import Test3 from "./Test3";

export default function Test() {
  const [nama, setNama] = useState("fazufi");
  const gantiNama = () => {
    setNama("kunyer");
  };

  const kodok = { nafas: { pertama: "paru-paru", kedua: "insang" } };
  const { kedua } = kodok.nafas;


  console.log(kedua);

  return (
    <>
      <Test3 test="test" iki="iki" kamu="ganteng">
        {/* <div>{nama} </div>
        <Test2 test={gantiNama} Terserah={Makanan} /> */}
        <div>ini children test3</div>
      </Test3>
    </>
  );
}

// object
// destructure
