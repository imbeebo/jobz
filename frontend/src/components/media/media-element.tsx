import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Spinner, Td, Tr } from "@chakra-ui/react";
import { FC, useState } from "react";
import RestService from "../../rest/rest-service";
import Stream from "./stream";

interface IMediaElementProps {
    _id: string;
    qr: string;
    title: string;
    uploadDate: string;
}

const MediaElement: FC<IMediaElementProps> = (props) => {

    const service = new RestService();
    const [busy, setBusy] = useState<boolean>(false);

    return (<Tr>
        <Td><Stream id={props._id} title={props.title} /></Td>
        <Td>{props.qr}</Td>
        <Td>{props.uploadDate}</Td>
        <Td><IconButton aria-label='Delete Video' disabled={busy}
            icon={getDeleteIcon()}
            onClick={onClick} /></Td>
    </Tr>);

    function getDeleteIcon(): JSX.Element {
        if (busy) {
            return <Spinner />;
        }
        return <DeleteIcon />;
    }

    function onClick() {
        setBusy(true);
        service.deleteVideo(props._id)
            .then(() => setBusy(false));
    }
};
export default MediaElement;