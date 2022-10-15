import "./App.css";
import Member from "./Member";
import Rekap from "./admin/Rekap";
import Pembayaran from "./admin/Pembayaran";
import Dapur from "./admin/Dapur";
import InputData from "./admin/InputData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FakeApi from "./admin/FakeApi";
import Customers from "./admin/Customers";
import Pembeli from "./admin/Pembeli";
import Lifecycle from "./admin/Lifecycle";
import Exam from "./admin/Exam";
import Makanan from "./Info/Makanan";
import Test from "./latihan/Test";
import Logic from "./Refactory/Logic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Logic />} />
        <Route path="admin" element={<InputData />}>
          <Route path="rekap" element={<Rekap />} />
          <Route path="pembayaran" element={<Pembayaran />} />
          <Route path="dapur" element={<Dapur />} />
          <Route path="input" element={<InputData />} />
          <Route path="api" element={<FakeApi />} />
          <Route path="customer" element={<Customers />} />
          <Route path="pembeli" element={<Pembeli />} />
          <Route path="life" element={<Lifecycle />} />
          <Route path="exam" element={<Exam />} />
        </Route>
        <Route path="makanan/:id" element={<Makanan />} />
        <Route path="latihan">
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
