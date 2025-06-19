import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg bg-slate-900 mx-auto p-4 flex justify-between items-center text-white shadow-md h-14 maxwidth-4xl px-8'>
        <div className="logo font-bold text-2xl flex ">
          <span className="text-green-500">&lt;</span>
          
          <span>KeepMy</span>
          <span className="text-green-500 ">Pass/&gt;</span>
          </div>

       <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-2 flex justify-center items-center gap-2 rounded-full transition duration-300">
        <lord-icon
    src="https://cdn.lordicon.com/ioihllwu.json"
    trigger="hover"
    target="button"
    style={{ width: '44px', height: '44px' }}
    >
</lord-icon>
         GitHub
       </button>

    </nav>
  )
}

export default Navbar
