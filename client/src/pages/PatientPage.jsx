import React, { useEffect, useState } from 'react';
import {
    Grid, GridItem, Box, Flex, Spacer, Input, Button,
    Menu, MenuButton, MenuList, MenuItem, Wrap, WrapItem, ButtonGroup
} from '@chakra-ui/react';
import "../styles/home.css";
import { getAllPatients, searchPatient } from '../http/api';
import { Previous, Paginator, Next, } from 'chakra-paginator';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import PatientsList from '../components/PatientsList';

export default function PatientPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const itemLimit = 10;
    const [pagesQuantity, setPagesQuantity] = useState(1);
    const [curPage, setCurPage] = useState(0);

    const normalStyles = {
        bg: 'white'
    };

    const activeStyles = {
        bg: 'blue.300'
    };

    const handlePageChange = (page) => {
        setCurPage(page - 1);
    };

    useEffect(() => {
        const pagesTotal = Math.ceil(users.length / itemLimit) + 1;

        setPagesQuantity(pagesTotal);
    }, [users.length]);


    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllPatients();
            setUsers(data);
        }
        fetchUsers();
    }, []);

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            console.log(search);
            const data = await searchPatient(search);
            console.log(data);
            setUsers(data);
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
                    w='100%'
                    mt={5}
                    // h='100%'
                    className='rightSection'>

                    <PatientsList patients={users} curPage={curPage} patientLimit={itemLimit} />

                    <Flex p={2}>
                        <Spacer />
                        <Paginator
                            onPageChange={handlePageChange}
                            pagesQuantity={pagesQuantity - 1}>
                            <Previous mr={5} bg="green">
                                <CgChevronLeft />
                            </Previous>
                            <Next bg="green">
                                <CgChevronRight />
                            </Next>
                        </Paginator>
                    </Flex>
                </Box>
            </GridItem>
        </Grid>
    )
};