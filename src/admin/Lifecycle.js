import React, { useEffect, useState } from "react";

export default function Lifecycle() {
  const [warna, setWarna] = useState("hijau");
  const [gender, setGender] = useState("pria");
  useEffect(() => {
    setGender("wanita");
  }, [warna]);

  return (
    <div>
      <div onClick={() => setWarna("pink")}>{warna}</div>
      <div>
        {gender}
        <div>gambar</div>
        <div>gambar</div>
      </div>
    </div>
  );
}

// pertamakali mounting adalah render kemudian useEffect(istilahnya didmount)
// ketika didalam kotak useEffect ada perubahan value nya maka useEffect dijalankan ulang(didupdate)
// setiap setState itu pasti melakukan render ulang

// macam-macam function
// eksecutor = ()
// declarere = ()=>  atau function namafunction()
// redeclare = ()=> (params)
// reference = namafunction
// note = value event tidak boleh function executor
