import axios from "axios";
import React, { useEffect, useState } from "react";

const Pembeli = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState();
  const [nama, setNama] = useState();

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/customer");
    setData(res.data);
  };

  useEffect(async () => {
    getData();
  }, []);

  const selesaiPesanan = (id) => {
    axios.delete(`http://localhost:4000/customer/${id}`).then(() => getData());
  };

  const editNama = (item) => {
    axios
      .put(`http://localhost:4000/customer/${item.id}`, { ...item, nama })
      .then(() => getData());
  };

  return (
    <div>
      {data.map((item, idx) => {
        return (
          <div>
            <div className="font-bold text-[#922222] bg-yellow-300">
              {idx + 1}{" "}
            </div>
            {index !== idx ? (
              <>
                <div>{item.nama}</div>
                <button onClick={() => setIndex(idx)}>Edit Nama </button>
              </>
            ) : (
              <>
                <input
                  defaultValue={item.nama}
                  onChange={(event) => setNama(event.target.value)}
                  className="border-4"
                />
                <button
                  onClick={() => {
                    editNama(item);
                    setIndex(null);
                  }}
                >
                  Save
                </button>
              </>
            )}
            {item.pesanan.map((item2) => (
              <div className="flex gap-5">
                <div>{item2.nama}</div>
                <div>{item2.harga}</div>
                <div>{item2.jumlah}</div>
                <div>{item2.total}</div>
              </div>
            ))}
            <button onClick={() => selesaiPesanan(item.id)}>Selesai</button>
          </div>
        );
      })}
    </div>
  );
};
export default Pembeli;
