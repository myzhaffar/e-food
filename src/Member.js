import React, { useState, useRef } from "react";
import { products } from "./utils";
import { debounce } from "debounce";
import { FaTrash } from "react-icons/fa";
import { FcExpand } from "react-icons/fc";
import { ImSpoonKnife } from "react-icons/im";
import { GiCoffeeCup } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import Default from "./layout/Default";
import { currency } from "./Refactory/utils";

export default function Member() {
  const menus = [
    { name: "makanan", icon: <ImSpoonKnife /> },
    { name: "minuman", icon: <GiCoffeeCup /> },
    { name: "lainnya", icon: <MdFastfood /> },
  ];
  const [selected, setSelected] = useState("makanan");
  const [pesanan, setPesanan] = useState({
    isBungkus: false,
    name: "",
    duduk: "",
    keranjang: [],
  });
  let cPesanan = JSON.parse(JSON.stringify(pesanan));
  let { keranjang } = cPesanan;

  const pesan = (v) => {
    const isExist = keranjang.find((x) => x.id === v.id);
    if (isExist) {
      isExist.jumlah++;
      isExist.total += isExist.harga;
    } else {
      keranjang.push({
        ...v,
        jumlah: 1,
        total: v.harga,
        isKet: false,
        keterangan: "",
      });
    }
    setPesanan(cPesanan);
  };

  const plus = (i) => {
    keranjang[i].jumlah++;
    keranjang[i].total += keranjang[i].harga;
    setPesanan(cPesanan);
  };
  const minus = (i) => {
    if (keranjang[i].jumlah > 1) {
      keranjang[i].jumlah--;
      keranjang[i].total -= keranjang[i].harga;
    } else {
      keranjang.splice(i, 1);
    }
    setPesanan(cPesanan);
  };
  const viewInput = (i) => {
    keranjang[i].isKet = true;
    setPesanan(cPesanan);
  };
  const saveKet = (e, i) => {
    keranjang[i].keterangan = e.target.value;
    setPesanan(cPesanan);
  };
  const delKet = (i) => {
    keranjang[i].isKet = false;
    keranjang[i].keterangan = "";
    setPesanan(cPesanan);
  };
  const delItempesanan = (i) => {
    keranjang.splice(i, 1);
    setPesanan(cPesanan);
  };
  const allTotal = keranjang.reduce(
    (akumulator, currentValue) => akumulator + currentValue.total,
    0
  );
  console.log(pesanan);
  const disable =
    pesanan.name.length < 1 ? "pointer-events-none opacity-70" : "";
  return (
    <Default>
      <div>
        <div className="flex justify-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              onClick={(e) =>
                setPesanan({ ...cPesanan, isBungkus: e.target.checked })
              }
            />
            <label className="ml-1">BUNGKUS</label>
          </div>

          <div className="mx-5">
            <label>Pembeli:</label>
            <input
              onChange={debounce(
                (e) => setPesanan({ ...cPesanan, name: e.target.value }),
                1000
              )}
              placeholder="atas nama"
              className="ml-1 border border-blue-400 p-1 rounded-lg"
            />
          </div>

          {!cPesanan.isBungkus && (
            <div>
              <label>Tempat duduk:</label>
              <select
                onClick={(e) =>
                  setPesanan({ ...cPesanan, duduk: e.target.value })
                }
              >
                <option>---</option>
                {Array(10)
                  .fill(null)
                  .map((v, i) => (
                    <option> {i}</option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <div id="content" className={`${disable} grid grid-cols-9`}>
          <div id="menus" className="px-2">
            <div>KATEGORI</div>
            <hr />
            {menus.map((v, i) => (
              <div
                onClick={() => setSelected(v.name)}
                className="bg-[#a58808] flex font-semibold font-sans my-3 drop-shadow-md  p-2 "
              >
                {v.icon}
                <div>{v.name}</div>
              </div>
            ))}
          </div>
          <div id="items" className="col-span-6 px-2">
            <div>PRODUK</div>
            <hr />
            <div className=" grid grid-cols-5 gap-3">
              {products[selected].map((v, i) => (
                <div className="bg-[#8d0f0f] h-60" onClick={() => pesan(v)}>
                  <img
                    src={`/${selected}/${v.gambar}`}
                    alt="produk"
                    className="h-3/5"
                  ></img>
                  <div>{v.nama}</div>
                  <div>{v.harga} </div>
                </div>
              ))}
            </div>
          </div>
          <div id="pesanan" className="col-span-2 px-2  ">
            <div>pesanan</div>
            <div>
              <div className="flex">
                <div className="grow my-auto">Total:</div>
                <div className="text-black font-bold text-2xl">
                  Rp {currency( allTotal)}
                </div>
              </div>
              <button
                disabled={allTotal < 1}
                className="w-full bg-[#058516] rounded-xl p-1 text-center font-bold text-white"
              >
                CHECKOUT
              </button>
            </div>
            <div className="h-[30rem] overflow-y-auto">
              {keranjang.map((v, i) => (
                <div className="rounded-lg p-2 shadow-2xl my-1 bg-[#44d6a6] ">
                  <div className="flex">
                    <div>
                      <div className="overflow-hidden h-5">{v.nama}</div>
                      <div>@ {v.harga}</div>
                    </div>
                    <div className="grow">
                      <div className="flex justify-center items-start">
                        <button
                          disabled={v.jumlah === 1}
                          onClick={() => minus(i)}
                          className="p-1"
                        >
                          <AiFillMinusCircle />
                        </button>
                        <div className="mx-3">{v.jumlah}</div>
                        <button onClick={() => plus(i)} className="p-1">
                          <AiFillPlusCircle />
                        </button>
                      </div>
                      <div
                        onClick={() => delItempesanan(i)}
                        className="flex justify-center"
                      >
                        <FaTrash />
                      </div>
                    </div>
                    <div>
                      <div>{v.total}</div>
                      <div
                        onClick={() => viewInput(i)}
                        className="flex justify-end"
                      >
                        <FcExpand />
                      </div>
                    </div>
                  </div>                 
                  {v.isKet && (
                    <div className="flex">
                      <button onClick={() => delKet(i)}>
                        <AiFillCloseCircle />
                      </button>
                      <input
                        className="p-1 text-xs mx-1 w-full"
                        placeholder="tambahkan keterangan"
                        defaultValue={v.keterangan}
                        onChange={debounce((e) => saveKet(e, i), 1000)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}
