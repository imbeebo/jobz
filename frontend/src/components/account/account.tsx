import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ContextState } from "../../context/context-state";
import DTOQRCode from "../../models/dto-qr-code";
import RestService from "../../rest/rest-service";
import { RootState } from "../../store/store";
import QRCodes from "../qr-codes/qr-codes";
import UploadFile from "../media/upload-file";

const Account = () => {

    const context = useSelector<RootState, ContextState>(state => state.context);

    return (<>
        <span>Hello {context.me.getFirstName()} {context.me.getLastName()}</span>
    </>);
}
export default Account;