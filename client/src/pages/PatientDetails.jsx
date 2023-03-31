import React, { useEffect, useState } from 'react'
import { Grid, GridItem, FormLabel, Badge, Button, Text } from '@chakra-ui/react';
import { getPatientById } from '../http/api';
import { Link, useParams } from 'react-router-dom';

export default function PatientDetails() {

  const [patient, setPatient] = useState({});

  let patientId = useParams().patientId;

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await getPatientById(patientId);
      console.log(data);
      setPatient(data);
    }
    fetchPatient();
  }, [patientId]);

  return (
    <Grid className='homeContainer' h='100vh'>
      <GridItem ml={20} marginRight={20} colSpan={5}>
        <Text mb={4} fontSize='xl' fontWeight='bold'>
          <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
            Patient Details
          </Badge>
        </Text>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Link to={`/update-patient/${patientId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Update Profile</Button>
            </Link>
            <Link to={`/add-medicine/${patientId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Add New Medicine</Button>
            </Link>
            <Link to={`/medicine-list/${patientId}`}>
              <Button size='sm' colorScheme='green'>Privious Medicine</Button>
            </Link>
          </div>
          <FormLabel>First name :  {patient.firstname}</FormLabel>
          <FormLabel>Last name  :  {patient.lastname}</FormLabel>
          <FormLabel>Email  :  {patient.email}</FormLabel>
          <FormLabel>Phone  :  {patient.phone}</FormLabel>
          <FormLabel>Age  :  {patient.age}</FormLabel>
          <FormLabel>blood Group  :  {patient.bloodGroup}</FormLabel>
        </div>
      </GridItem>
    </Grid>
  )
};
