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
import React, { ChangeEvent, useState } from "react";
import User from "../../models/dto-user";
import RestService from "../../rest/rest-service";

const SignUp = () => {

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const service = new RestService();

    return (
        <Modal isOpen={true} onClose={() => {
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalBody>
                    <Container>
                        <Stack spacing={3}>
                            <Input autoComplete="given-name"
                                id="given-name-input"
                                placeholder="First Name"
                                value={firstName}
                                onChange={onChangeFirstname}
                                isRequired
                                autoFocus />
                            <Input autoComplete="family-name"
                                id="last-name-input"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={onChangeLastname}
                                isRequired />
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
                    <Button colorScheme="blue" mr={3} onClick={signup}>
                        Sign Up
                    </Button>
                    <Link to="/login">
                        <Button colorScheme="gray" mr={3}>
                            Already Have an Account?
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );


    function onChangeFirstname(e: ChangeEvent<HTMLInputElement>) {
        setFirstName(e.currentTarget.value);
    }

    function onChangeLastname(e: ChangeEvent<HTMLInputElement>) {
        setLastName(e.currentTarget.value);
    }

    function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    function signup() {

        const user = new User(email, firstName, lastName);
        user.setPassword(password);
        service.register(user);
    }
};
export default SignUp;