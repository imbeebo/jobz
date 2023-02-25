import React from "react";
import { Box, Divider, Flex, Grid, MenuItem, Stack, Text, VStack, } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import AppSwitch from "./components/router/AppSwitch";
import { useDispatch } from "react-redux";
import { connectToServer } from "./context/context-actions";
import { Link } from "react-router-dom";

export const App = () => {
    const dispatch = useDispatch();
    dispatch<any>(connectToServer());

    return (
        <Grid minH="10vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Flex>
                <Stack marginRight={5} width='15rem'>
                    {buildLink('Home', '/')}
                    {buildLink('My Account', '/account')}
                    {buildLink('QR Codes', '/qrcodes')}
                    {buildLink('Videos + Pictures', '/media')}
                </Stack>
                <Divider orientation='vertical' marginRight={5} />
                <VStack spacing={8}>
                    <AppSwitch />
                </VStack>
            </Flex>
        </Grid>);

    function buildLink(text: string, to: string): JSX.Element {
        return <Link to={to}>
            <Text display="block">
                {text}
            </Text>
        </Link>;
    }
}