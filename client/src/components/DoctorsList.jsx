import React, { useEffect, useState } from 'react';
import {
    Badge, Text, TableContainer, Table, Tr, Th, Thead, Td, Tbody
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "../styles/home.css";

export default function DoctorsList({ doctors, curPage, doctorLimit }) {
    const [currDoctors, setCurrDoctors] = useState([]);

    useEffect(() => {
        const offset = curPage * doctorLimit ;
        const getList = (curPage, doctorLimit ) => {
            setCurrDoctors(doctors.slice(offset, offset + doctorLimit ));
        };

        getList(curPage, doctorLimit );
    }, [curPage, doctorLimit , doctors]);

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
                    currDoctors.length ? currDoctors.map(doctor => (
                        <Tbody key={doctor.userid}>
                            <Tr>
                                <Link to={`/doctor-details/${doctor.userid}`}>
                                    <Text ml={5} fontSize='xl' fontWeight='bold'>
                                        <Badge fontSize='1.0em' colorScheme='green'>
                                            Go To Profile
                                        </Badge>
                                    </Text>
                                </Link>
                                <Td>{doctor.firstname}</Td>
                                <Td>{doctor.email}</Td>
                                <Td isNumeric>{doctor.phone}</Td>
                            </Tr>
                        </Tbody>
                    )) : <Text>No Doctors is available.</Text>
                }
            </Table>
        </TableContainer>
    )
};