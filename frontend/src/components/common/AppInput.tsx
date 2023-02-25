import {createMultiStyleConfigHelpers} from "@chakra-ui/react";
import {inputAnatomy} from '@chakra-ui/anatomy';

const {defineMultiStyleConfig} = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

export const inputTheme = defineMultiStyleConfig({
    defaultProps: {
        size: 'md',
        variant: 'outline'
    }
});
