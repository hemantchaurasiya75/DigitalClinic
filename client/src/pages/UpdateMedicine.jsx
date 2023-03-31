import React, { useState,useEffect } from 'react'
import { Grid, GridItem, FormControl, Input, FormLabel, Textarea, Badge, Button, Heading, Text, Center } from '@chakra-ui/react';
import { createMedicine, getMedicineById, getPatientById, updateMedicineById} from '../http/api';
import { useParams} from 'react-router-dom';

export default function UpdateMedicine() {
    let medicineId = useParams().medicineId;
    const [medicine, setMedicine] = useState({});

    useEffect(() => {
        const fetchMedicine = async () => {
            const data = await getMedicineById(medicineId);
            console.log(data);
            setMedicine(data);
        }
        fetchMedicine();
    }, [medicineId]);


    const [name, setName] = useState(medicine.name);
    const [disease, setDisease] = useState(medicine.disease);
    const [description, setDescription] = useState(medicine.description);
    const [type, setType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const medicine = {
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
            console.log(medicine);
            const data = await updateMedicineById(medicineId, medicine);
            setIsDone("Medicine Updated Sccessfully!");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <Grid className='homeContainer' h='100vh'>
            <GridItem ml={20} marginRight={20} colSpan={5}>
                <Text mb={4} fontSize='xl' fontWeight='bold'>
                    <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                        Update Medicine
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Medicine name</FormLabel>
                            <Input
                                onChange={event => setName(event.currentTarget.value)}
                                placeholder={medicine.name} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Disease name</FormLabel>
                            <Input
                                onChange={event => setDisease(event.currentTarget.value)}
                                placeholder={medicine.disease} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Input
                                onChange={event => setType(event.currentTarget.value)}
                                placeholder={medicine.type} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Frequency</FormLabel>
                            <Input
                                onChange={event => setFrequency(event.currentTarget.value)}
                                placeholder={medicine.frequency} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                onChange={event => setQuantity(event.currentTarget.value)}
                                placeholder={medicine.quantity} x/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                onChange={event => setDescription(event.currentTarget.value)}
                                placeholder={medicine.description} />
                        </FormControl>
                        <Button type='submit' mt={5} size='lg' colorScheme='green'>Update Medicine</Button>
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
