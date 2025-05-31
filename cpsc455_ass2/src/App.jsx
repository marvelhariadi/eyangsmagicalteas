import React from "react";
import CompanyLogo from "./assets/images/CompanyLogo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop, Layout, Home } from "./utils/Route";
import "./App.css";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <ScrollToTop />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Layout>
//                 <Home />
//               </Layout>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// we know the app.js can render this just fine
function App() {
  return (
    <div style={{ padding: '20px', margin: '20px' }}>
      <h1>Eyang's magic teas</h1>
      <img src={CompanyLogo} alt="Eyang's Magic Teas Company Logo" />

    </div>
  );
}
export default App;
