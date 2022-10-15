import React, { useEffect, useState } from "react";
import Default from "../layout/Default";

// buat array menus
// map array menus dlm html
// setiap item menu mempunyai key tipe
// buat object products
// object produk berisi keys : makanan, minuman, lainnya
// setiap key mempunyai value array list product
// map array list produk berdasarkan key dari produk

const products = {
  makanan: [
    { name: "bakso", harga: 100000 },
    { name: "sate", harga: 100000 },
    { name: "bubur", harga: 100000 },
    { name: "nasi", harga: 100000 },
  ],
  minuman: [
    { name: "kopi", harga: 100 },
    { name: "teh", harga: 100 },
    { name: "susu", harga: 100 },
  ],
  snack: [
    { name: "roti", harga: 100 },
    { name: "burger", harga: 100 },
    { name: "pohong", harga: 100 },
  ],
};

export default function Dapur() {
  const pembeli = JSON.parse(localStorage.getItem("pembeli"));
  const [selectedTipe, setSelectedTipe] = useState("makanan");
  const [keranjang, setKeranjang] = useState(pembeli?.keranjang || []);
  const [isBungkus, setIsBungkus] = useState(pembeli?.isBungkus || false);
  const [name, setName] = useState(pembeli?.name || "");
  const menus = [{ tipe: "makanan" }, { tipe: "minuman" }, { tipe: "snack" }];
  let newKeranjang = [...keranjang];

  const masukKeranjang = (obj) => {
    const itemSamadiKeranjang = newKeranjang.find(
      (item) => item.name === obj.name
    );

    if (!itemSamadiKeranjang) {
      const newObj = { ...obj, jumlah: 1, total: obj.harga, isKet: false };
      newKeranjang.push(newObj);
    } else {
      itemSamadiKeranjang.jumlah++;
      itemSamadiKeranjang.total += itemSamadiKeranjang.harga;
    }
    setKeranjang(newKeranjang);
  };

  const plus = (index) => {
    newKeranjang[index].jumlah++;
    newKeranjang[index].total += newKeranjang[index].harga;
    setKeranjang(newKeranjang);
  };
  const min = (index) => {
    if (newKeranjang[index].jumlah !== 1) {
      newKeranjang[index].jumlah--;
      newKeranjang[index].total -= newKeranjang[index].harga;
    } else {
      const confirmed = window.confirm("are you sure to delete this item?");
      if (confirmed) {
        newKeranjang.splice(index, 1);
      }
    }

    setKeranjang(newKeranjang);
  };

  const totalSemua = keranjang.reduce(
    (akumulator, obj) => akumulator + obj.total,
    0
  );

  const delPesanan = (index) => {
    newKeranjang.splice(index, 1);
    setKeranjang(newKeranjang);
  };
  const tampilkanKet = (index) => {
    newKeranjang[index].isKet = true;
    setKeranjang(newKeranjang);
  };
  const delKet = (index) => {
    newKeranjang[index].isKet = false;
    setKeranjang(newKeranjang);
  };

  useEffect(() => {
    localStorage.setItem(
      "pembeli",
      JSON.stringify({ isBungkus: isBungkus, name: name, keranjang: keranjang })
    );
  }, [isBungkus, name, keranjang]);

  return (
    <div>
      <div id="top" className="flex justify-center gap-6">
        <div className="flex gap-2">
          <input
            type={"checkbox"}
            onChange={(e) => setIsBungkus(e.target.checked)}
            defaultChecked={pembeli?.isBungkus}
          />
          <div>BUNGKUS</div>
        </div>

        {!isBungkus ? (
          <div className="flex gap-1">
            <div>kursi</div>
            <select>
              {Array(6)
                .fill()
                .map((undefined, index) => (
                  <option>{index + 1} </option>
                ))}
            </select>
          </div>
        ) : null}

        <input
          type="text"
          placeholder="type your name "
          onChange={(e) => setName(e.target.value)}
          className="border border-yellow-800"
          defaultValue={pembeli?.name}
        />
      </div>

      <div
        className={`grid grid-cols-4 ${
          name.length > 0 ? "" : "pointer-events-none opacity-70"
        }`}
      >
        <div id={"category"}>
          <h1 className="text-bold text-3xl">category</h1>
          {menus.map((item) => (
            <>
              <div onClick={() => setSelectedTipe(item.tipe)}>{item.tipe} </div>
            </>
          ))}
        </div>

        <div id={"product"}>
          <h1 className="text-bold text-3xl">product</h1>
          {products[selectedTipe].map((item) => (
            <div onClick={() => masukKeranjang(item)} className="flex gap-3">
              <div>{item.name} </div>
              <div>{item.harga} </div>
            </div>
          ))}
        </div>

        <div id={"keranjang"} className="col-span-2">
          <div id="total">
            <h1 className="text-bold text-3xl">Total</h1>
            <div className="text-blue-400 font-bold ">{totalSemua}</div>
          </div>
          <h1 className="text-bold text-3xl">keranjang</h1>
          {keranjang.map((item, index) => (
            <div className="flex gap-5">
              <div>{item.name}</div>
              <div>{item.harga}</div>
              <button onClick={() => plus(index)}>+</button>
              {/* <button disabled={keranjang[index].jumlah === 1} onClick={() => min(index)}>-</button> */}
              <button onClick={() => min(index)}>-</button>
              <div>{item.jumlah}</div>
              <div>{item.total}</div>
              <button onClick={() => delPesanan(index)}>X</button>
              <button onClick={() => tampilkanKet(index)}>v</button>
              {item.isKet ? (
                <>
                  <input className="border border-yellow-500" />
                  <button onClick={() => delKet(index)}>x</button>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ketika push ke array keranjang, masukkan key isket dengan defaultvalue false
// di map item keranjang buat button v untuk tamplikan ket
// buat function tampilkanKet :
// > akses index dengan parameter
// > newKeranjang[index].isKet diganti dengan true
// > simpan perubahan di setState (setKeranjang)
// untuk show hide input keterangan, gunakan ternary ..?...:... berdasarkan item.isKet

// untuk mebuat function delKet, lakukan seperti di atas namun rubah value isKet jadi false

// masuk keranjan dengan conditional:
// > cek apakah di keranjang sudah ada item yang sama dengan item yang diklik
// > cara ceknya dengan array.find  >> matchingkan sesuatu yang unix misal .nama
// > jika find itu ada outputnya maka itu dlm boolean true jika tidak ada outputnya (undefined) maka dlm boolean itu false
// > buat if jika tidak ketemu maka: array keranjang di push value item tadi
// > else  : item.jumlah plus 1 dan item.total plus item.harga
