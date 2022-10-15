import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 1.buat array menus
// 2.map array menus dlm html
// 3.setiap item menu mempunyai key tipe
// 4.buat object products
// 5.object produk berisi keys : makanan, minuman, lainnya
// 6.setiap key mempunyai value array list product
// 7.map array list produk berdasarkan key dari produk

const product = {
  food: [
    { nama: "nasgor", harga: 5000 },
    { nama: "bakmi", harga: 5000 },
    { nama: "geprek", harga: 5000 },
  ],
  drink: [
    { nama: "boba", harga: 5000 },
    { nama: "es teh", harga: 5000 },
    { nama: "susu segar", harga: 5000 },
  ],
  snack: [
    { nama: "pempek", harga: 5000 },
    { nama: "batagor", harga: 5000 },
    { nama: "siomay", harga: 5000 },
  ],
};

export default function InputData() {
  console.log("jalan jalan")
  const customer = JSON.parse(localStorage.getItem("customer"));
  const menu = [{ tipe: "food" }, { tipe: "drink" }, { tipe: "snack" }];
  const [troli, setTroli] = useState(customer?.troli || []);
  const [pilihMenu, setPilihMenu] = useState("food");
  const [diBungkus, setDiBungkus] = useState(customer?.diBungkus || false);
  const [atasNama, setAtasNama] = useState(customer?.atasNama || "");

  let newTroli = [...troli];

  const masukTroli = (value) => {
    const samaDiTroli = newTroli.find((item) => item.nama === value.nama);
    if (!samaDiTroli) {
      const newValue = {
        ...value,
        jumlah: 1,
        total: value.harga,
        isiKet: false,
      };
      newTroli.push(newValue);
    } else {
      samaDiTroli.jumlah++;
      samaDiTroli.total += samaDiTroli.harga;
    }
    setTroli(newTroli);
  };

  const plus = (index) => {
    newTroli[index].jumlah++;
    newTroli[index].total += newTroli[index].harga;
    setTroli(newTroli);
  };

  const minus = (index) => {
    if (newTroli[index].jumlah !== 1) {
      newTroli[index].jumlah--;
      newTroli[index].total -= newTroli[index].harga;
    } else {
      const confirmasi = window.confirm("Are you sure to delete this ?");
      if (confirmasi) {
        newTroli.splice(index, 1);
      }
    }
    setTroli(newTroli);
  };

  const allTotal = troli.reduce(
    (accumulator, value) => accumulator + value.total,
    0
  );

  const hapusPesanan = (index) => {
    newTroli.splice(index, 1);
    setTroli(newTroli);
  };

  const showKet = (index) => {
    newTroli[index].isiKet = true;
    setTroli(newTroli);
  };

  const hideKet = (index) => {
    newTroli[index].isiKet = false;
    setTroli(newTroli);
  };

  useEffect(() => {
    localStorage.setItem(
      "customer",
      JSON.stringify({ diBungkus: diBungkus, atasNama: atasNama, troli: troli })
    );
  }, [diBungkus, atasNama, troli]);

  const beli = () => {
    axios.post("http://localhost:4000/customer", customer);
    localStorage.setItem("customer", JSON.stringify({}));
  };

  return (
    <div>
      <div id="top" className="flex justify-center gap-5">
        <div className="flex gap-2">
          <input
            type={"checkbox"}
            onChange={(e) => setDiBungkus(e.target.checked)}
            defaultChecked={customer?.diBungkus}
          />
          <div>DiBungkus</div>
        </div>

        {diBungkus ? null : (
          <div className="flex gap-2">
            <div>Dine In</div>
            <select>
              {Array(5)
                .fill()
                .map((undefined, index) => (
                  <option>{index + 1}</option>
                ))}
            </select>
          </div>
        )}
        <input
          type={"text"}
          onChange={(e) => setAtasNama(e.target.value)}
          className="border border-blue-400 rounded-lg"
          placeholder="Atas nama siapa ya Kak?"
          defaultValue={customer?.atasNama}
        />
      </div>

      <div
        className={`grid grid-cols-5 ${
          atasNama.length > 0 ? "" : "pointer-events-none opacity-70"
        }`}
      >
        <div id="Category">
          <h1 className="text-lg font-bold">Category</h1>
          {menu.map((item) => (
            <div onClick={() => setPilihMenu(item.tipe)}>{item.tipe}</div>
          ))}
        </div>

        <div id="Menu">
          <h1 className="text-lg font-bold">Menu</h1>
          {product[pilihMenu].map((item) => (
            <div onClick={() => masukTroli(item)} className="flex gap-5">
              <div>{item.nama}</div>
              <div>{item.harga}</div>
            </div>
          ))}
        </div>

        <div id="Keranjang" className="col-span-2">
          <h1 className="text-lg font-bold">Keranjang</h1>
          <div>
            {troli.map((item, index) => (
              <div className="flex gap-5">
                <div>{item.nama}</div>
                <div>{item.harga}</div>
                <button onClick={() => plus(index)}>+</button>
                <button onClick={() => minus(index)}>-</button>
                <div>{item.jumlah}</div>
                <div>{item.total}</div>
                <button
                  onClick={() => hapusPesanan(index)}
                  className="bg-blue-500 rounded-lg px-2"
                >
                  X
                </button>
                <button onClick={() => showKet(index)}>V</button>
                {item.isiKet ? (
                  <>
                    <input className="border border-blue-400 rounded-lg" />
                    <button onClick={() => hideKet(index)}>X</button>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-lg font-bold">Total</h1>
          <div className="text-bold text-blue-700"> {allTotal}</div>
          <Link to="/admin/pembeli">
          <button onClick={beli}>BELI</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// sebelum push object ke array troli, cloning object tsb ditambah dengan key jumlah: 1 dan total : harganya
// buat function plus
// function plus mengirim parameter index dari troli.map
// sekarang focus memanipulasi array troli:
// buat variable untuk cloning troli menjadi newtroli
// akses array newtroli dengan indexnya
// newtroli[index].jumlah ditambah satu
// newtroli[index].total ditambah harga
