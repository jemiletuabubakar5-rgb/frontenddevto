
// import React from 'react';

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center bg-gray-200 p-4">
//       <h1 className="text-xl font-bold">Dashboard</h1>
//       <div>
//         <span className="mr-4">Admin</span>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>
//     </header>
//   );
// };

// export default Header;






import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Best Buy</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};

export default Header;