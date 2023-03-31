import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
    Text,
    Badge
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  registerPatient } from "../../http/api";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function RegisterDoctor() {
    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const handlePatientSubmit = async (e) => {
        e.preventDefault();
        const patient = {
            firstname,
            lastname,
            email,
            password,
            phone,
            role: "PATIENT"
        }
        setIsLoading(true);
        try {
            console.log(patient)
            const data = await registerPatient(patient);
            if (data) {
                setIsDone("Patient Register Sccessfully!");
            } else {
                setIsDone("Server problem!");
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100%"
            backgroundColor="gray.200"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                margin="5"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "400px" }}>
                    <form onSubmit={handlePatientSubmit}>
                        <Stack
                            spacing={2}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="Name"
                                        onChange={event => setFirstname(event.currentTarget.value)}
                                        placeholder="first name" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="Name"
                                        onChange={event => setLastname(event.currentTarget.value)}
                                        placeholder="last name" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="email"
                                        onChange={event => setEmail(event.currentTarget.value)}
                                        placeholder="email address" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type='tel'
                                        onChange={event => setPhone(event.currentTarget.value)}
                                        placeholder="phone" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        onChange={event => setPassword(event.currentTarget.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button
                                borderRadius={0}
                                type='submit'
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Signup
                            </Button>
                            <Text mb={4} fontSize='xl' fontWeight='bold'>
                                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                                    {isdone}
                                </Badge>
                            </Text>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                <Link to={"/login"}>
                    Go to Sign In page
                </Link>
            </Box>
        </Flex>
    );
};