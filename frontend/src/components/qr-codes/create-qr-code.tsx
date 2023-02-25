import { Button, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux";
import { ContextState } from "../../context/context-state";
import RestService from "../../rest/rest-service";
import { RootState } from "../../store/store";

interface ICreateQRCodeProps {
    onCodeCreated: () => void;
}

const CreateQRCode: FC<ICreateQRCodeProps> = (props) => {


    const [name, setName] = useState<string>();
    const [data, setData] = useState<string>();
    const context = useSelector<RootState, ContextState>(state => state.context);

    const service = new RestService();

    return <>
        <Stack spacing={3}>
            <Input autoComplete="name"
                id="name-input"
                placeholder="Name"
                value={name}
                isRequired />
            <Input autoComplete="data"
                id="data-input"
                placeholder="Data"
                value={data}
                isRequired />
        </Stack>

        <Button colorScheme="blue" mr={3} onClick={onCreateClick}>
            Create
        </Button>
    </>;


    function onChangeName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function onChangeData(e: ChangeEvent<HTMLInputElement>) {
        setData(e.currentTarget.value);
    }

    function onCreateClick() {
        service.generateQrCode(name, data)
            .then(props.onCodeCreated)
            .then(() => {
                setName(null);
                setData(null);
            });
    }

}
export default CreateQRCode;