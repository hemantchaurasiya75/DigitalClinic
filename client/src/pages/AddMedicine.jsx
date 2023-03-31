import React, { useState, useEffect } from 'react'
import { Grid, GridItem, FormControl, Input, FormLabel, Textarea, Badge, Button, Heading, Text, Center } from '@chakra-ui/react';
import { createConsultant, createMedicine, getPatientById } from '../http/api';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AddPatient() {
    let patientId = useParams().patientId;
    const { user } = useSelector((state) => state.auth);
    let doctorId = user.userid;
    const [patient, setPatient] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        const fetchPatient = async () => {
            const data = await getPatientById(patientId);
            console.log(data);
            setPatient(data);
        }
        fetchPatient();
    }, [patientId]);


    const [name, setName] = useState("");
    const [disease, setDisease] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const medicineObj = {
            name,
            disease,
            description,
            type,
            frequency,
            quantity,
            date: new Date(),
        }
        setIsLoading(true);
        
        try {
            console.log(medicineObj);
            const medicine = await createMedicine(patientId, medicineObj);
            console.log(medicine.data);
            setIsDone("Medicine Register Sccessfully!");
            const consultant = await createConsultant(patientId, doctorId, medicine.data.id,1);
            console.log(consultant);
            navigate(`/consultant/${consultant.id}`);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <Grid className='homeContainer' h='100%'>
            <GridItem ml={20} marginRight={20} colSpan={5}>
                <Text mb={4} fontSize='xl' fontWeight='bold'>
                    <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                        create New Medicine
                    </Badge>
                </Text>
                <Text mb={4} fontSize='xl' fontWeight='bold'>
                    <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                        Patient Name : {patient.firstname + " " + patient.lastname}
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Medicine name</FormLabel>
                            <Input
                                onChange={event => setName(event.currentTarget.value)}
                                placeholder='Medicine name' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Disease name</FormLabel>
                            <Input
                                onChange={event => setDisease(event.currentTarget.value)}
                                placeholder='Disease name' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            {/* <Select onChange={handleChange} placeholder='Select Clinic'>
                                <option value="1">Tablet</option>
                                <option value="1">Syrup</option>
                                <option value="1"></option>
                            </Select> */}
                            <Input
                                onChange={event => setType(event.currentTarget.value)}
                                placeholder='Enter Medicine Type' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Frequency</FormLabel>
                            <Input
                                onChange={event => setFrequency(event.currentTarget.value)}
                                placeholder='Enter Frequency' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                onChange={event => setQuantity(event.currentTarget.value)}
                                placeholder='Enter Quantity' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                onChange={event => setDescription(event.currentTarget.value)}
                                placeholder='Enter Medicine Description' />
                        </FormControl>


                        <Button type='submit' mt={5} size='lg' colorScheme='green'>Submit</Button>
                        <Text mb={4} fontSize='xl' fontWeight='bold'>
                            <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                                {isdone}
                            </Badge>
                        </Text>
                    </form>
                </div>
            </GridItem>
        </Grid>
    )
};