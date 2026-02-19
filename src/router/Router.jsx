import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../layout/Layout"
import Homepage from "../pages/Homepage"
import Table from "../pages/Table"

export default function Router(){
    return(
        <>
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Homepage/>} />
                <Route path="/table" element={<Table/>} />
            </Route>
           </Routes>
        </BrowserRouter>
        </>
    )
}