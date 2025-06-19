import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';


const Manager = () => {
  const [show, setShow] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const getpasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswords(passwords)
  }

  useEffect(() => {
    getpasswords();
  }, []);

  const togglePasswordVisibility = (id) => {
  setVisiblePasswords(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};

const copyToClipboard = (password) => {
  navigator.clipboard.writeText(password);
  toast.success("Password copied to clipboard!");
};

  const confirmDelete = (id) => {
    setShowConfirm(true);
    setPendingDeleteId(id);
  };

  const proceedDelete = () => {
    deletePassword(pendingDeleteId);
    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  const savePassword = async() => {
    if(form.site.length>2 && form.username.length>2 && form.password.length>2) {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, id: uuidv4() })
      });
      // const data = await response.json();
      setPasswords((prev) => [...prev, { ...form, id: uuidv4() }]);
      setform({ site: "", username: "", password: "" });
      setShow(false);
      toast.success("Password saved");
    } else {
      toast.error("Please fill all fields with minimum 3 characters");
    }
  };

  const deletePassword = async (id) => {
    const updatedPasswords = passwords.filter((item) => item.id !== id);
    setPasswords(updatedPasswords);
    const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  id })
      });
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast.success("Password deleted");
  };

  const editPassword = async (id) => {
    setform(passwords.find((item) => item.id === id));
    const updatedPasswords = passwords.filter((item) => item.id !== id);
    setPasswords(updatedPasswords);
    const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  id })
      });
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setShow(true);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
<div className="px-4 md:px-0 container mx-auto max-w-4xl rounded-lg shadow-lg mt-10">
        <h1 className="logo font-bold text-4xl text-center">
          <span className="text-green-600">&lt;</span>KeepMy
          <span className="text-green-600">Pass/&gt;</span>
        </h1>
        <p className="text-center text-green-700 my-2 font-bold">
          Manage your passwords securely
        </p>

        <div className="flex flex-col p-4 rounded-lg mx-auto gap-5">
  <input
    value={form.site}
    onChange={handleChange}
    name="site"
    type="text"
    placeholder="Enter website url"
    className="border-green-700 w-full border rounded-lg p-2"
  />
  <div className="flex flex-col md:flex-row gap-4 w-full">
    <input
      value={form.username}
      onChange={handleChange}
      name="username"
      type="text"
      placeholder="Enter username"
      className="border-green-700 w-full border rounded-lg p-2"
    />
    <div className="relative w-full">
      <input
        value={form.password}
        onChange={handleChange}
        name="password"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        className="border-green-700 w-full border rounded-lg p-2 pr-10"
      />
      <span
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </span>
    </div>
  </div>
</div>


        <div className="flex justify-center items-center mt-4">
          <button
            onClick={savePassword}
            className="bg-green-700 text-white px-4 py-2 flex justify-center items-center gap-1 rounded-full hover:bg-green-800 transition duration-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sqmqtgjh.json"
              trigger="hover"
              target="button"
            ></lord-icon>
            Save Password
          </button>
        </div>

        {showConfirm && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg flex justify-between items-center">
            <span className="text-red-700 font-semibold">
              Are you sure you want to delete?
            </span>
            <div className="flex gap-2">
              <button
                onClick={proceedDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        )}

        <div className="passwords flex flex-col mt-6">
          <h2 className="font-bold text-2xl mx-3">Your Passwords</h2>
          {passwords.length === 0 && (
            <div className="text-gray-600 italic text-center mt-5">
              No passwords saved yet.
            </div>
          )}
          {passwords.length > 0 && (
            <div className="overflow-x-auto">
  <table className="table-auto w-full rounded-2xl shadow-lg mt-4 min-w-[600px] mb-7 overflow-hidden">
  <thead className="bg-green-700 text-white">
    <tr>
      <th className="py-2 px-4 first:rounded-tl-2xl">Site</th>
      <th className="py-2 px-4">Username</th>
      <th className="py-2 px-4">Password</th>
      <th className="py-2 px-4 last:rounded-tr-2xl">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-green-100">
    {passwords.map((item, index) => (
      <tr
        key={item.id}
        className="hover:bg-green-200 transition-colors duration-200"
      >
        <td className={`py-2 px-4 border border-white text-center ${
          index === passwords.length - 1 ? 'first:rounded-bl-2xl' : ''
        }`}>
          <a
            href={item.site}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all"
          >
            {item.site}
          </a>
        </td>
        <td className="py-2 px-4 border border-white text-center break-all">
          {item.username}
        </td>
        <td className="py-2 px-4 border border-white text-center break-all">
  <div className="flex items-center justify-center gap-2">
    <span className="font-mono">
      {visiblePasswords[item.id] ? item.password : "••••••••"}
    </span>
    <button
      onClick={() => togglePasswordVisibility(item.id)}
      className="text-green-600 hover:text-green-800 p-1"
      title={visiblePasswords[item.id] ? "Hide password" : "Show password"}
    >
      {visiblePasswords[item.id] ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </button>
    <button
      onClick={() => copyToClipboard(item.password)}
      className="text-green-600 hover:text-green-800 p-1"
      title="Copy password"
    >
      <Copy className="w-4 h-4" />
    </button>
  </div>
</td>
        <td className={`py-2 px-4 border border-white text-center flex justify-center gap-2 ${
          index === passwords.length - 1 ? 'last:rounded-br-2xl' : ''
        }`}>
          <button onClick={() => editPassword(item.id)}>
            <lord-icon
              src="https://cdn.lordicon.com/exymduqj.json"
              trigger="hover"
              stroke="bold"
              state="hover-line"
              colors="primary:#121331,secondary:#16c72e"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
          </button>
          <button onClick={() => confirmDelete(item.id)}>
            <lord-icon
              src="https://cdn.lordicon.com/jzinekkv.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#16c72e"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
