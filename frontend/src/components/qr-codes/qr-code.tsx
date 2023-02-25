import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import QR from 'qrcode';

interface IQRCodeProps {
    name: string;
    code: string;
}

const QRCode: FC<IQRCodeProps> = (props) => {
    const { name, code } = props;
    const ref = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (ref.current){
            QR.toCanvas(ref.current, code);
        }
    });

    return <Popover>
        <PopoverTrigger>
            <Button>{name}</Button>
        </PopoverTrigger>
        <Portal>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>

                    <canvas ref={ref} id="qr-canvas"></canvas>
                </PopoverBody>
            </PopoverContent>
        </Portal>
    </Popover>;
}
export default QRCode;