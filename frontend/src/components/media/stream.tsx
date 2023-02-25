import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react";
import { FC } from "react";
import RestService from "../../rest/rest-service";

interface IStreamProps {
    title: string;
    id: string;
}
const Stream: FC<IStreamProps> = (props) => {

    const { id, title } = props;

    const service = new RestService();

    return <>

        <Popover>
            <PopoverTrigger>
                <Button>{title}</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <video autoPlay controls width='200'>
                            <source src={service.getStreamUrl(id)} type='video/mp4' />
                        </video>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    </>;

    return null;
};
export default Stream;