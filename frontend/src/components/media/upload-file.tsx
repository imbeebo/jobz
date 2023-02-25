import { Button, FormControl, Input, InputProps, Spinner, Stack, useMultiStyleConfig } from "@chakra-ui/react";
import { FC, useState } from "react";
import RestService from "../../rest/rest-service";

interface IUploadFileProps {
    refresh: () => void;
}

const UploadFile: FC<IUploadFileProps> = ({ refresh }) => {


    const service = new RestService();
    const [videos, setFile] = useState<File>();
    const [qrCode, setQrCode] = useState<string>("")
    const [busy, setBusy] = useState<boolean>(false);


    return <>
        <Stack spacing={4}>
            <FormControl>
                <FileInput
                    margin="normal"
                    isRequired={true}
                    id="video"
                    name="video"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Input id="data-input"
                    placeholder="Data"
                    value={qrCode} variant='outline'
                    onChange={(e) => setQrCode(e.target.value)}
                    isRequired />
            </FormControl>
        </Stack>

        <Button colorScheme="blue" disabled={busy} mr={3} onClick={onSubmit}>
            {busy ? <Spinner /> : 'Create'}
        </Button>
    </>;



    function onSubmit(e) {

        setBusy(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("qr", qrCode);
        formData.append("title", 'title');
        formData.append("video", videos);

        service.uploadFile(formData).then(resp => {
            console.log(resp);
            refresh();
        }).catch(e => console.error(e))
            .finally(() => { setBusy(false) });
    }
};
export default UploadFile;

export const FileInput = (props: InputProps) => {
    const styles = useMultiStyleConfig("Button", { variant: "outline" });

    return (
        <Input
            type="file"
            sx={{
                "::file-selector-button": {
                    border: "none",
                    outline: "none",
                    mr: 2,
                    ...styles,
                },
            }}
            {...props}
        />
    );
};