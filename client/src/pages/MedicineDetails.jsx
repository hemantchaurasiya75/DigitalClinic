import React, { useEffect, useState } from 'react';
import { Grid, GridItem, FormLabel, Badge, Button, Text } from '@chakra-ui/react';
import { getMedicineById } from '../http/api';
import { Link, useParams } from 'react-router-dom';

export default function MedicineDetails() {
  const [medicine, setMedicine] = useState({});

  let medicineId = useParams().medicineId;

  useEffect(() => {
    const fetchMedicine = async () => {
      const data = await getMedicineById(medicineId);
      setMedicine(data);
    }
    fetchMedicine();
  }, [medicineId]);

  return (
    <Grid className='homeContainer' h='100vh'>
      <GridItem ml={20} marginRight={20} colSpan={5}>
        <Text mb={4} fontSize='xl' fontWeight='bold'>
          <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
            Medicine Details
          </Badge>
        </Text>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Link to={`/update-medicine/${medicineId}`}>
              <Button mr={3} size='sm' colorScheme='green'>Update Medicine</Button>
            </Link>
            <Button size='sm' colorScheme='green'>Delete Medicine</Button>
          </div>
          <FormLabel>Medicine Name :  {medicine.name}</FormLabel>
          <FormLabel>Disease Name  :  {medicine.disease}</FormLabel>
          <FormLabel>Disease type, :  {medicine.type}</FormLabel>
          <FormLabel>Disease frequency :  {medicine.frequency}</FormLabel>
          <FormLabel>Disease quantity  :  {medicine.quantity}</FormLabel>
          <FormLabel>Date :  {medicine.date !== undefined ? medicine.date.substring(0, 10) : ""}</FormLabel>
          <FormLabel>Description  :  {medicine.description}</FormLabel>
        </div>
      </GridItem>
    </Grid>
  )
};