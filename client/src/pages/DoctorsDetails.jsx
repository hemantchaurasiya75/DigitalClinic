import React, { useEffect, useState } from 'react'
import { Grid, GridItem, FormLabel, Badge, Button, Text } from '@chakra-ui/react';
import { getDoctorById} from '../http/api';
import { Link, useParams } from 'react-router-dom';

export default function DoctorDetails() {

  const [doctor, setDoctor] = useState({});

  let doctorId = useParams().doctorId;

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctorById(doctorId);
      console.log(data);
      setDoctor(data);
    }
    fetchDoctors();
  }, [doctorId]);

  return (
    <Grid className='homeContainer' h='100vh'>
      <GridItem ml={20} marginRight={20} colSpan={5}>
        <Text mb={4} fontSize='xl' fontWeight='bold'>
          <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
            Doctor Details
          </Badge>
        </Text>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Link to={`/update-doctor/${doctorId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Update Profile</Button>
            </Link>
          </div>
          <FormLabel>First name :  {doctor.firstname}</FormLabel>
          <FormLabel>Last name  :  {doctor.lastname}</FormLabel>
          <FormLabel>Email  :  {doctor.email}</FormLabel>
          <FormLabel>Phone  :  {doctor.phone}</FormLabel>
          <FormLabel>Age  :  {doctor.age}</FormLabel>
          <FormLabel>blood Group  :  {doctor.bloodGroup}</FormLabel>
        </div>
      </GridItem>
    </Grid>
  )
};
