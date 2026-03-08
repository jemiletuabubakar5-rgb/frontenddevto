
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
// import certegory from './certegory';
// import ProductsTable from './ProductsTable';


const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Overview />
          {/* <ProductsTable /> */}

        </div>

      </div>
    </div>
      // {stats.map((stat, index) => (
      //   <div key={index} className="bg-white shadow-md rounded-lg  border border-gray-200 flex flex-col space-y-2 pl-10 pr-10 pt-3 pb-3 w-[210px]">
      //     <div className="text-8 font-bold text-gray-800">{stat.value}</div>
      //     <div className="text-gray-500">{stat.label}</div>
      //     {stat.chart ? (
      //       <div className="h-10 bg-purple-500 w-full rounded-md"></div> // Placeholder for chart
      //     ) : (
      //       <div className="flex justify-between items-center">
      //         <span className={stat.changeColor}>{stat.change}</span>
      //         <span className={`p-2 rounded-lg text-white ${stat.bgColor}`}>{stat.icon}</span>
      //       </div>
      //     )}
      //   </div>
      // ))}
  );
};

export default Dashboard;





// import React from "react";
// import Sidebar from "./Sidebar";
// import Header from './Header';
// // import Navebar from "./Navebar";
// import { FaBitcoin, FaCoins, FaEthereum } from "react-icons/fa";


// const stats = [
//     {
//       value: "3450",
//       label: "Number of Sales",
//       change: "↑ 25%",
//       changeColor: "text-green-500",
//       bgColor: "bg-yellow-400",
//       icon: "📊",
//     },
//     {
//       value: "$35.256",
//       label: "Sales Revenue",
//       change: "↑ 15%",
//       changeColor: "text-green-500",
//       bgColor: "bg-blue-400",
//       icon: "📈",
//     },
//     {
//       value: "$35.256",
//       label: "Average Price",
//       change: "↓ 15%",
//       changeColor: "text-red-500",
//       bgColor: "bg-green-500",
//       icon: "💲",
//     },
//     {
//       value: "15.893",
//       label: "Operations",
//       chart: true, // Placeholder for a chart
//     },
//   ];

// const Dashboard = () => {
//   return (
//     <div>
//       <div className="flex items-start">
//         <Sidebar />
//         <Header/>
//       </div>
//       <div className=" flex gap-5 p-8 ml-55 mt-15">
//     <div className="flex gap-3">
//     {stats.map((stat, index) => (
//         <div key={index} className="bg-white shadow-md rounded-lg  border border-gray-200 flex flex-col space-y-2 pl-10 pr-10 pt-3 pb-3 w-[210px]">
//           <div className="text-8 font-bold text-gray-800">{stat.value}</div>
//           <div className="text-gray-500">{stat.label}</div>
//           {stat.chart ? (
//             <div className="h-10 bg-purple-500 w-full rounded-md"></div> // Placeholder for chart
//           ) : (
//             <div className="flex justify-between items-center">
//               <span className={stat.changeColor}>{stat.change}</span>
//               <span className={`p-2 rounded-lg text-white ${stat.bgColor}`}>{stat.icon}</span>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//     </div>
//    <div className="flex ">
//    <div className="ml-60 w-[70%] h-[400px]">
//    <div className="p-6 bg-gray-50 min-h-screen ">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Market Overview</h1>
//       </div>

//       {/* Activity and Goal Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg h-[400px]">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Activity</h2>
//           <h2 className="text-xl font-bold">Goal</h2>
//         </div>

//         {/* Chart Placeholder */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <div className="flex justify-between mb-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="text-center">
//                 <p className="text-sm text-gray-600">{i + 1}</p>
//               </div>
//             ))}
//           </div>

//           {/* Y-axis Labels */}
//           <div className="relative h-40">
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//               <p className="text-sm text-gray-600">100</p>
//               <p className="text-sm text-gray-600">50</p>
//               <p className="text-sm text-gray-600">0</p>
//             </div>

//             {/* Chart Bars */}
//             <div className="absolute bottom-0 left-0 w-full h-full flex justify-between items-end">
//               {[30, 60, 90, 50, 70, 40, 80, 60, 50, 70].map((height, i) => (
//                 <div
//                   key={i}
//                   className="w-8 bg-blue-500 rounded-t-lg"
//                   style={{ height: `${height}%` }}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     <div className="p-6 bg-gray-50 min-h-screen ">
//       <div className="mb-6">
//         <h1 className="text-3 font-bold">Today 22nd Jan, 20</h1>
//       </div>

//       <div className="grid-rows-4 gap-4 mr-3">
//         <div className="bg-white p-4 rounded-sm shadow-lg hover:shadow-xl transition-shadow mb-3">
//           <div className="flex items-center mb-6">
//             <FaBitcoin className="text-[24px] text-orange-500 mr-4" />
//             <div>
//               <h2 className="text-[10px] font-bold">Incoming Transfer</h2>
//               <p className=" text-20 text-gray-600">Bitcoin</p>
//             </div>
//           </div>
//           <p className="  text-[15px] text-gray-700">Amount: 0.5 BTC</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow mb-3">
//           <div className="flex items-center mb-4">
//             <FaEthereum className="text-[20px] text-purple-500 mr-4" />
//             <div>
//               <h2 className="text-[10px] font-bold">Sales Report</h2>
//               <p className="text-gray-600">Ethereum</p>
//             </div>
//           </div>
//           <p className="  text-[15px] text-gray-700">Amount: 10 ETH</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//           <div className="flex items-center mb-4 ">
//             <FaCoins className="text-4xl text-yellow-500 mr-4" />
//             <div>
//               <h2 className="text-[8px] font-bold">Incoming Transfer</h2>
//               <p className="text-gray-600">Binance</p>
//             </div>
//           </div>
//           <p className="  text-[13px] text-gray-700">Amount: 500 BNB</p>
//         </div>
//       </div>
//     </div>
//    </div>
//     </div>
//   );
// };

// export default Dashboard;