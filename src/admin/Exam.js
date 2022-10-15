import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const menus = [{ tipe: "makanan" }, { tipe: "minuman" }, { tipe: "snack" }];
const produk = {
  makanan: [
    { nama: "nasi", harga: 5000 },
    { nama: "mie", harga: 5000 },
    { nama: "bakso", harga: 5000 },
  ],
  minuman: [
    { nama: "teh", harga: 2000 },
    { nama: "kopi", harga: 2000 },
    { nama: "susu", harga: 2000 },
  ],
  snack: [
    { nama: "tahu", harga: 3000 },
    { nama: "tempe", harga: 3000 },
    { nama: "sosis", harga: 3000 },
  ],
};

export default function  Exam () {
  const pembeli = JSON.parse(localStorage.getItem("pembeli"));
  const [tipe, setTipe] = useState("makanan");
  const [pesanan, setPesanan] = useState(pembeli.pesanan || []);
  const [nama, setNama] = useState()

  let newPesanan = [...pesanan];

  const pesananMasuk = (isi) => {
    const pesananSama = newPesanan.find((item) => item.nama === isi.nama);

    if (!pesananSama) {
      const newIsi = {
        ...isi,
        jumlah: 1,
        total: isi.harga,
        isKet: false,
      };
      newPesanan.push(newIsi);
    } else {
      pesananSama.jumlah++;
      // pesananSama.total = pesananSama.total + pesananSama.harga;
      pesananSama.total += pesananSama.harga;
    }
    setPesanan(newPesanan);
  };

  const plus = (index) => {
    newPesanan[index].jumlah++;
    newPesanan[index].total += newPesanan[index].harga;
    setPesanan(newPesanan);
  };

  const minus = (index) => {
    const currentItem = newPesanan[index];

    if (currentItem.jumlah === 1) {
      if (window.confirm("yakin ngga jadi pesen ?")) {
        newPesanan.splice(index, 1);
      }
    } else {
      currentItem.jumlah--;
      currentItem.total -= currentItem.harga;
    }
    setPesanan(newPesanan);
  };

  const hapusPesanan = (index) => {
    newPesanan.splice(index, 1);
    setPesanan(newPesanan);
  };

  const tampilkanKet = (index) => {
    newPesanan[index].isKet = true;
    setPesanan(newPesanan);
  };

  const sembunyikanKet = (index) => {
    newPesanan[index].isKet = false;
    setPesanan(newPesanan);
  };

  const totalPesanan = newPesanan.reduce(
    (akumulator, v) => akumulator + v.total,
    0
  );

  useEffect(() => {
    localStorage.setItem("pembeli", JSON.stringify({ pesanan, nama }));
  }, [pesanan, nama]);

  const beli = () => {
    axios.post("http://localhost:4000/customer", pembeli);
  };



  return (
    <div>
      <div className="flex gap-3">
        <input type={"checkbox"} />
        <div>Bawa Pulang</div>

        <input
        onChange={(event)=> setNama(event.target.value) }
          type={"text"}
          className="border border-teal-500 rounded-lg"
          placeholder="Atas nama ?"
        />
      </div>

      <div className="grid grid-cols-5">
        <div>
          {menus.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => setTipe(item.tipe)}
                className="cursor-pointer"
              >
                {item.tipe}
              </div>
            </div>
          ))}
        </div>

        <div>
          {produk[tipe].map((item, index) => (
            <div
              key={index}
              className="flex gap-3"
              onClick={() => pesananMasuk(item)}
            >
              <div>{item.nama}</div>
              <div>{item.harga}</div>
            </div>
          ))}
        </div>

        <div className="col-span-2">
          {newPesanan.map((ireng, index) => (
            <div key={index} className="flex gap-3">
              <div>{ireng.nama}</div>
              <div>{ireng.harga}</div>
              <button onClick={() => plus(index)}>+</button>
              <button onClick={() => minus(index)}>-</button>
              <button onClick={() => hapusPesanan(index)}>X</button>
              <div>{ireng.jumlah}</div>
              <div>{ireng.total}</div>
              <button onClick={() => tampilkanKet(index)}>Ket</button>
              {ireng.isKet ? (
                <>
                  <input className="border border-teal-500" />
                  <button onClick={() => sembunyikanKet(index)}>Del</button>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-lg text-teal-500 font-bold">Total</h1>
          <div>{totalPesanan}</div>
          <Link to="/admin/pembeli">
            <button onClick={beli}>BELI</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Algoritma I
// 1. buat array menus
// 2. buat list produk berupa array object, masing2 memiliki key
// 3. mapping menus dan produk
// 4. buat event onclick  pada menus = ketika diklik, menampilkan produk dgn dinamis (gunakan setState)
// 5. buat event onclik pada produk = ketika diklik, menampilkan produk yang dipilih ke keranjang dgn function pesananMasuk
// 6. dalam pesananMasuk, lakukan push method untuk menambah pesanan. cloning pesananan dgn newPesanan agar mutable

// Algoritma II
// 1. buat function pesananMasuk = gunakan find methode untuk menemukan persamaan yang unik dalam newPesanan (nama)
// 2. buat if else : jika newIsi tidak ada yg sama maka push newIsi baru ditambah jumlah & total.
// 3. jika ada yg sama maka jalankan else : newIsi.jumlah ditambah 1 dan newIsi total dgn newIsi + harga
// 4. munculkan jumlah dan total dalam mapping newPesanan.

// Algoritma 3
// 1. buat function plus untuk menambah newPesanan yg sama, dgn menambah jumlah++ & total.
// 2. buat button + dgn mengirim function plus yg declared, gunakan parameter [index]
// 3. lakukan hal yg sebaliknya untuk function minus, agar pengurangan hanya  berjalan sampai index 1 buat condition if else:
// 4. if: jika index !== dengan 1 makan jalankan jumlah-- dan pengurangan total. else : ketika index == 1 maka hapus newPesanan dengan splice methode
// 5. buat button X untuk hapus newPesanan, jalankan event onclick yang mengirimkan function hapusPesanan. hapusPesanan menggunakan splice methode utk menghapus newPesanan.
