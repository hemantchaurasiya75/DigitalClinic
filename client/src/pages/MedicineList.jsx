import React, { useEffect, useState } from 'react';
import {
    Grid, GridItem, Box, TableContainer, Table, Tr, Th,
    Thead, Td, Tbody, Text, Badge, Menu, MenuButton, MenuList,
    MenuItem, Wrap, WrapItem, ButtonGroup, Input, Button
} from '@chakra-ui/react';
import "../styles/home.css";
import { getAllMedicineOfPatient, searchMedicine } from '../http/api';
import { useParams, Link } from 'react-router-dom';

export default function MedicineList() {
    let patientId = useParams().patientId;
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchMedicines = async () => {
            console.log(patientId)
            const data = await getAllMedicineOfPatient(patientId);
            console.log(data);
            setMedicines(data);
        }
        fetchMedicines();
    }, [patientId !== undefined]);

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            console.log(search);
            const data = await searchMedicine(search);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid className='homeContainer' h='100%'>
            <GridItem ml={20} marginRight={20} colSpan={5}>
                <form onSubmit={submitHandle}>
                    <Wrap >
                        <WrapItem>
                            <Menu>
                                <MenuButton
                                    px={4}
                                    py={2}
                                    transition='all 0.2s'
                                    borderRadius='md'
                                    borderWidth='1px'
                                    _hover={{ bg: 'gray.400' }}
                                    _expanded={{ bg: 'blue.400' }}
                                    _focus={{ boxShadow: 'outline' }}
                                >
                                    Choose
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Search using patient name</MenuItem>
                                    <MenuItem>Search using patient phone</MenuItem>
                                </MenuList>
                            </Menu>
                            <Input
                                onChange={event => setSearch(event.currentTarget.value)}
                                placeholder='Search...' ml={3} mt={1} />
                            <ButtonGroup ml={3} mt={1} gap='4'>
                                <Button type='submit' colorScheme='blackAlpha'>
                                    Search Patient
                                </Button>
                            </ButtonGroup>
                        </WrapItem>
                    </Wrap>
                </form>
                <Box
                    mt={5}
                    w='100%'
                    // h='100%'
                    className='rightSection'>
                    <TableContainer >
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Medicine</Th>
                                    <Th>Medicine Name</Th>
                                    <Th>Disease Name</Th>
                                    <Th isNumeric>Date</Th>
                                </Tr>
                            </Thead>
                            {
                                medicines.length ? medicines.map(medicine => (
                                    <Tbody key={medicine.id}>
                                        <Tr>
                                            <Link to={`/medicine-details/${medicine.id}`}>
                                                <Text ml={5} fontSize='xl' fontWeight='bold'>
                                                    <Badge fontSize='1.0em' colorScheme='green'>
                                                        Go To
                                                    </Badge>
                                                </Text>
                                            </Link>
                                            <Td>{medicine.name}</Td>
                                            <Td>{medicine.disease}</Td>
                                            <Td isNumeric>{medicine.date.substring(0, 10)}</Td>
                                        </Tr>
                                    </Tbody>
                                )) : <Text mt={5} ml={5}>No medicines is available.</Text>
                            }
                        </Table>
                    </TableContainer>
                </Box>
            </GridItem>
        </Grid>
    )
};