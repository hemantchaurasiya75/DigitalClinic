import React, { useEffect, useState } from 'react';
import {
    Badge, Text, TableContainer, Table, Tr, Th, Thead, Td, Tbody
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "../styles/home.css";

export default function PatientsList({ patients, curPage, patientLimit }) {
    const [currPatients, setCurrPatients] = useState([]);

    useEffect(() => {
        const offset = curPage * patientLimit;
        const getList = (curPage, patientLimit) => {
            setCurrPatients(patients.slice(offset, offset + patientLimit));
        };

        getList(curPage, patientLimit);
    }, [curPage, patientLimit, patients]);

    return (
        <TableContainer >
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>PROFILE</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th isNumeric>Phone</Th>
                    </Tr>
                </Thead>
                {
                    currPatients.length ? currPatients.map(user => (
                        <Tbody key={user.userid}>
                            <Tr>
                                <Link to={`/patient-details/${user.userid}`}>
                                    <Text ml={5} fontSize='xl' fontWeight='bold'>
                                        <Badge fontSize='1.0em' colorScheme='green'>
                                            Go To Profile
                                        </Badge>
                                    </Text>
                                </Link>
                                <Td>{user.firstname}</Td>
                                <Td>{user.email}</Td>
                                <Td isNumeric>{user.phone}</Td>
                            </Tr>
                        </Tbody>
                    )) : <Text>No users is available.</Text>
                }
            </Table>
        </TableContainer>
    )
};