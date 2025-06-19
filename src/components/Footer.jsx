import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-2 text-sm flex-wrap text-center">
          <div>

          <span className="text-green-500 font-bold">&lt;</span>
          <span className="font-bold">KeepMy</span>
          <span className="text-green-500 font-bold">Pass/&gt;</span>
          </div>
          <span>Created with</span>
          <lord-icon
            src="https://cdn.lordicon.com/ajzwsrcs.json"
            trigger="hover"
            target="div"
            colors="primary:#e83a30,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          <span>by Vedant Raje</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
