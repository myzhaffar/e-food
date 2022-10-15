import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Makanan() {
  const [makanan, setMakanan] = useState({});
  const param = useParams();
  console.log("slug", param);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:4000/makanan/${param.id}`);
    setMakanan(res.data);
  }, []);
  console.log("makanan", makanan);

  return (
    <div>
      <div>makanaan</div>
      <div> {makanan.name}</div>
      <div> {makanan.harga}</div>
    </div>
  );
}
