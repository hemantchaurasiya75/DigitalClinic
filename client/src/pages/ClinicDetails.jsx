import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Badge, Button, Text,FormLabel } from '@chakra-ui/react';
import { getClinicById } from '../http/api';
import { Link, useParams } from 'react-router-dom';

export default function ClinicDetails() {

  const [clinic, setClinic] = useState({});

  let clinicId = useParams().clinicId;

  useEffect(() => {
    const fetchClinic = async () => {
      const data = await getClinicById(clinicId);
      console.log(data);
      setClinic(data);
    }
    fetchClinic();
  }, [clinicId]);

  return (
    <Grid className='homeContainer' h='100vh'>
      <GridItem ml={20} marginRight={20} colSpan={5}>
        <Text mb={4} fontSize='xl' fontWeight='bold'>
          <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
            Clinic Details
          </Badge>
        </Text>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Link to={`/update-clinic/${clinicId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Update Clinic</Button>
            </Link>
            <Link to={`/doctor-list/${clinicId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Doctors List</Button>
            </Link>
            <Link to={`/patient-list`}>
              <Button size='sm' colorScheme='green'>Patient List</Button>
            </Link>
          </div>
          <FormLabel>Cinic Name :  {clinic.name}</FormLabel>
          <FormLabel>Opening Time  :  {clinic.openingTime}</FormLabel>
          <FormLabel>Closing Time  :  {clinic.closingTime}</FormLabel>
          <FormLabel>Clinic Place  :  {clinic.address==undefined ?"": clinic.address.place}</FormLabel>
          <FormLabel>Clinic city  :  {clinic.address==undefined ?"":clinic.address.city}</FormLabel>
          <FormLabel>Clinic state  :  {clinic.address==undefined ?"":clinic.address.state}</FormLabel>
         <FormLabel>Closing Country  :  {clinic.address==undefined ?"":clinic.address.country}</FormLabel>
        </div>
      </GridItem>
    </Grid>
  )
};