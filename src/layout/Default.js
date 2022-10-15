import React from "react";
import { Link } from "react-router-dom";

export default function Default({ children }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div id="navbar" className="bg-[#1579a0] flex gap-5 p-2">
        <div className="font-[Fantasy] font-bold text-white grow">
          WARMINDO H2
        </div>
        <Link to="/admin/api">
          <div>Home</div>
        </Link>
        <Link to="/admin/customer">
          <div>Customers </div>
        </Link>
      </div>
      {children}
    </div>
  );
}
