import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./components/signin";
import RegistrationPage from "./components/loginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<RegistrationPage/>} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
