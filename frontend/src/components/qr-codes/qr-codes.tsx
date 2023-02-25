import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextState } from "../../context/context-state";
import DTOQRCode from "../../models/dto-qr-code";
import RestService from "../../rest/rest-service";
import { RootState } from "../../store/store";
import QRCode from "./qr-code";
import CreateQRCode from "./create-qr-code";

const QRCodes = () => {

    const context = useSelector<RootState, ContextState>(state => state.context);

    const service = new RestService();

    const [codes, setCodes] = useState<Array<DTOQRCode>>();

    useEffect(getCodes, [])

    if (codes) {
        return <>
            <CreateQRCode onCodeCreated={getCodes} />
            <div>
                {codes.map(c => <QRCode name={c.name} code={c.data} />)}
            </div>
        </>
    }
    return <CreateQRCode onCodeCreated={getCodes} />;


    function getCodes() {
        if (service) {
            service.getQrCodes().then(list => {
                setCodes(list)
            });
        }
    }

}
export default QRCodes;