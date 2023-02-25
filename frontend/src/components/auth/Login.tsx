import {
    Button,
    Container,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import User from "../../models/dto-user";
import RestService from "../../rest/rest-service";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../context/context-actions";

const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const dispatch = useDispatch();

    const service = new RestService();

    return (
        <Modal isOpen={true} onClose={doNothing}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalBody>
                    <Container>
                        <Stack spacing={3}>
                            <Input autoComplete="email"
                                id="email-input"
                                placeholder="Email"
                                value={email}
                                onChange={onChangeEmail}
                                isRequired
                                type="email" />
                            <Input autoComplete="new-password"
                                id="password-input"
                                placeholder="Password"
                                value={password}
                                onChange={onChangePassword}
                                isRequired
                                type="password" />
                        </Stack>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={login}>
                        Login
                    </Button>
                    <Link to="/signup">
                        <Button colorScheme="gray" mr={3}>
                            Don't have an account?
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );


    function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    function doNothing() {

    }

    function login() {
        const user = new User(email);
        user.setPassword(password);

        service.signin(user)
            .then((user) => {
                dispatch(setCurrentUser(user));
            });

    }
};
export default Login;