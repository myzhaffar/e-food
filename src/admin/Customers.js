import React, { useEffect, useState } from "react";
import axios from "axios";
import Default from "../layout/Default";
import { useParams } from "react-router-dom";

const Customers = () => {
const url = useParams()
console.log("url", url)

  const [data, setData] = useState([]);
  const [index, setIndex] = useState();

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/customer");
    setData(res.data);
  };
  useEffect(async () => {
    getData();
  }, []);

  const deleteCust = (id) => {
    axios.delete(`http://localhost:4000/customer/${id}`).then(() => getData());
  };

  const submit = (e, item) => {
    e.preventDefault();

    const payload = {
      ...item,
      atasNama: e.target.atasNama.value,
      diBungkus: e.target.diBungkus.checked,
    };
    axios
      .put(`http://localhost:4000/customer/${item.id}`, payload)
      .then(() => getData());
    setIndex(null);
  };

  // useEffect(async () => {
  //   const response = await axios.get("http://localhost:4000/customer");
  //   setData(response.data);
  // }, []);

  return (
    <Default>
      <div>
        {data.map((item, idx) => (
          <div className="flex gap-5 my-3">
            <div>{idx + 1} </div>
            {idx !== index ? (
              <>
                <div>{item.atasNama} </div>
                <div>{item.diBungkus ? "dibungkus" : "dine In"} </div>
              </>
            ) : (
              <>
                <form onSubmit={(e) => submit(e, item)}>
                  <input
                    name="atasNama"
                    defaultValue={item.atasNama}
                    className="border-4"
                  />
                  <label>dibungkus</label>
                  <input
                    name="diBungkus"
                    type="checkbox"
                    defaultChecked={item.diBungkus}
                  />
                </form>
              </>
            )}

            <div>
              {item?.troli?.map((pesanan) => {
                return (
                  <div className="flex gap-5">
                    <div>{pesanan.nama} </div>
                    <div>{pesanan.harga} </div>
                    <div>{pesanan.jumlah} </div>
                    <div>{pesanan.total} </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => deleteCust(item.id)}>Selesai</button>
            <button onClick={() => setIndex(idx)}>Edit</button>
          </div>
        ))}
      </div>
    </Default>
  );
};

export default Customers;

// asynchronus = melakukan action tanpa menunggu selesai
// synchronus = melakukan action dengan menunggu hasilnya sampai selesai sebelum action lain
// default javascript adalah asincronus
// untuk mengambil action syncronus gunakan function async await

// buat editable item untuk atasnama dan dibungkus:
// >> buat state index dengan default value null
// >> buat button edit dengan function setIndex menjadi index item yang diklik
// >> buat ternary; yaitu  jika state index tidak sama dengan index item (dr param map) ? tampikan div biasa : maka tampikan sebagi input

// buat function onSubmit untuk <form>:
// >> buat akses value dari tiap input yg merupakan children form, dengan: 1. kasih nama input 2. akses dengan e.target.namainput.value / checked
// >> buat varible isinya cloning item yang dikirim lewat parameter onSubmit, dan value baru
// >> cara cloning object item + rubah/tambah value baru = {...item, atasNama: valuebaru , diBungkus:valuebaru }
// >> buat axios.put(url/id, payload).then(()=>getDAta())
