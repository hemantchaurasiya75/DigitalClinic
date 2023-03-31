import React, { useEffect, useState } from 'react';
import { Badge, Text, TableContainer, Table, Tr, Th, Thead, Td, Tbody } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "../styles/home.css";

export default function ClinicList({ clinics, curPage, clinicLimit }) {
    const [currClinics, setCurrClinics] = useState([]);

    useEffect(() => {
        const offset = curPage * clinicLimit;
        const getList = (curPage, clinicLimit) => {
            setCurrClinics(clinics.slice(offset, offset + clinicLimit));
        };

        getList(curPage, clinicLimit);
    }, [curPage, clinicLimit, clinics]);

    return (
        <TableContainer >
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Clinic</Th>
                        <Th>Name</Th>
                        <Th>Opening Time</Th>
                        <Th >Closing Time</Th>
                    </Tr>
                </Thead>
                {
                    currClinics.length ? currClinics.map(clinic => (
                        <Tbody key={clinic.id}>
                            <Tr>
                                <Link to={`/clinic-details/${clinic.id}`}>
                                    <Text ml={5} mt={1} fontSize='xl' fontWeight='bold'>
                                        <Badge fontSize='1.0em' colorScheme='green'>
                                            Go To Clinic
                                        </Badge>
                                    </Text>
                                </Link>
                                <Td>{clinic.name}</Td>
                                <Td>{clinic.openingTime}</Td>
                                <Td>{clinic.closingTime}</Td>

                            </Tr>
                        </Tbody>
                    )) : <Text>No clinic is available.</Text>
                }
            </Table>
        </TableContainer>
    )
};