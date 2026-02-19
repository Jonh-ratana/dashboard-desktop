import { HashRouter, Routes, Route } from "react-router-dom"
import Layout from "../layout/Layout"
import Homepage from "../pages/Homepage"
import Table from "../pages/Table"
import Dashboard from "../pages/Dashboard"

export default function Router(){
    return(
        <>
        <HashRouter>
           <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Dashboard/>} />
                <Route path="/home" element={<Homepage/>} />
                <Route path="/table" element={<Table/>} />
            </Route>
           </Routes>
        </HashRouter>
        </>
    )
}
