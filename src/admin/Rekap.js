import React from 'react';

export default function Rekap() {
  // string
  // number / integer
  // Object
  // array


const iniObject = {nama: "fazufi", kelas: 5, umur : 10}
const iniObject2 = {nama: "fazufi", kelas: 5, umur : 10, hoby: ["makan", "renang", "tidur"]}
const nomor2 = [1, 5, 6, 7]
const nama2 = ["fazufi", "amah", "agos"]
const data = [{nama: "fazufi", kelas: 5, umur : 10}, {nama: "agos", kelas: 2, umur : 2}]

let ini = 'roti'
ini = 'tisu'
let itu = 'kursi'
itu += ' dan meja'

// const aku = "fakrhy membeli " + ini + "dan" + ïtu
const aku2 = `fakrhy membeli ${ini} dan ${itu}`


let nomor = 4
nomor += 4
let nomor3 = 4
nomor3 *= 4
nomor3 = nomor3 * 4
let nomor4 = 4
nomor4++
let nomor5 = 5
nomor4--

let coba = "gabung"
coba +=1


// OBJECT
let obj = {name: "fazufi", class: 5}
const key = "name"
obj.name = "daffa"
obj[key] = "daffa"


const nilai = 5
let status 
if(nilai > 6  && nilai === 5){
status = "lulus"
}else{
  status= "gagal"
}
console.log("cek", nilai > 6  && nilai === 5)


const arr = [{name: "epep", class: 6}, {name: "ml" , class:6}]
arr.push({name: "bakso"})
arr.splice(2, 1)
console.log('1', arr)





  // let

  return <div>Rekap</div>;
}
