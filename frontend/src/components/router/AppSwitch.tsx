import { Input } from "@chakra-ui/react";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ContextState } from "../../context/context-state";
import Account from "../account/account";
import QRCodes from "../qr-codes/qr-codes";
import Media from "../media/media";

const AppSwitch = () => {
    const context = useSelector<RootState, ContextState>(state => state.context);

    if (!context.me) {
        return <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
        </Routes>;
    }

    function test(): JSX.Element {
        return <Input id="data-input"
            placeholder="Data"
            isRequired />;
    }

    return <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/account" element={<Account />} />
        <Route path="/qrcodes" element={<QRCodes />} />
        <Route path="/media" element={<Media />} />
    </Routes>;
};

export default AppSwitch;