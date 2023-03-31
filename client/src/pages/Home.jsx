import React, { useState } from 'react';
import {FormControl, Input, Badge, Button, Text,
    Flex,Heading,InputGroup,Stack,Box} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { searchClinicByClinicName } from '../http/api';
import { setClinics } from '../store/clinicListSlice';
import { useDispatch } from 'react-redux';

export default function Home() {
    const [clinicName, setclinicName] = useState("");
    const [specilist, setSpecilist] = useState("");
    const [pincode, setPincode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(clinicName);
        console.log(specilist);
        console.log(pincode);
        try {
            const data = await searchClinicByClinicName(clinicName);
            if (data) {
                dispatch(setClinics(data));
            } else {
                setIsDone("Server problem!");
            }
            setIsLoading(false);
            navigate("/clinic-list");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
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
                <Heading color="teal.400">Search Clinics</Heading>
                <Box minW={{ base: "90%", md: "400px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={2}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <Input type="Name"
                                        onChange={event => setclinicName(event.currentTarget.value)}
                                        placeholder="Enter clinic name" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <Input type="Name"
                                        onChange={event => setSpecilist(event.currentTarget.value)}
                                        placeholder="Enter specilist doctor" />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <Input type="Name"
                                        onChange={event => setPincode(event.currentTarget.value)}
                                        placeholder="Enter address pincode" />
                                </InputGroup>
                            </FormControl>

                            <Button
                                borderRadius={0}
                                type='submit'
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Search
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
        </Flex>
    );
};