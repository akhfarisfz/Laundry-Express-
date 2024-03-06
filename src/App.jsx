import {HashRouter, Route, Routes, useLocation, useParams} from "react-router-dom";
import SalesResult from "./pages/SalesResult.jsx";
import PageAuthSignIn from "./pages/auth/PageAuthSignIn.jsx";
import { useState } from "react";
import { ContextApplication } from "./libs/config/contexts.js";
import PageCommonOutlet from "./pages/commons/PageCommonOutlet.jsx";
import PageBarangList from "./pages/barang/PageBarangList.jsx";
import PageBarangCreate from "./pages/barang/PageBarangCreate.jsx";
import PageBarangDetail from "./pages/barang/PageBarangDetail.jsx";
import PageTerimaList from "./pages/terima/PageTerimaList.jsx";
import PageTerimaPrint from "./pages/terima/PageTerimaPrint.jsx";
import PageKasList from "./pages/kas/PageKasList.jsx";
import PageTerimaAmbil from "./pages/terima/PageTerimaAmbil.jsx";




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <ContextApplication.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageBarangList />} />
              <Route path={"new"} element={<PageBarangCreate />} />
              <Route path={"detail/:id"} element={<PageBarangDetail />} />
            </Route>
            <Route path="/terima" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageTerimaList />} />
              <Route path={"ambil"} element={<PageTerimaAmbil />} />
              <Route path={"print"} element={<PageTerimaPrint />} />
            </Route>
            <Route path="/kas" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageKasList />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  )
}

export default App



