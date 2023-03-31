import React, { useEffect, useState } from 'react';
import { Grid, GridItem, FormControl, Input, FormLabel, Select, Button, Badge, Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getClinicById, updateClinicById } from '../http/api';

export default function UpdateClinic() {
    const [clinic, setClinic] = useState({
        name: "",
        openingTime: "",
        closingTime: "",
        address: {
            place: "",
            city: "",
            state: "",
            country: "",
        }
    });
    const clinicId = useParams().clinicId;

    const [name, setName] = useState(clinic.name);
    const [openingTime, setOpeningTime] = useState(clinic.openingTime);
    const [closingTime, setClosingTime] = useState(clinic.closingTime);
    const [place, setPlace] = useState(clinic.address != null ? clinic.address.place : "");
    const [city, setCity] = useState(clinic.address != null ? clinic.address.city : "");
    const [state, setState] = useState(clinic.address != null ? clinic.address.state : "");
    const [country, setCountry] = useState(clinic.address != null ? clinic.address.country : "");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    useEffect(() => {
        const getClinicDetails = async () => {
            const data = await getClinicById(clinicId);
            setClinic(data);
            setName(data.name);
            setOpeningTime(data.openingTime);
            setClosingTime(data.closingTime);
            setPlace(data.address.place);
            setCity(data.address.city);
            setState(data.address.state);
            setCountry(data.address.country);
        }
        getClinicDetails();
    }, [clinicId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clinicObj = {
            name,
            openingTime,
            closingTime,
            address: {
                place,
                city,
                state,
                country,
            }
        }
        setIsLoading(true);
        try {
            console.log(clinicObj);
            const data = await updateClinicById(clinicId, clinicObj);
            setIsDone("Clinic Updated Successfully!");
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
                        Update Clinic
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Clinic Name</FormLabel>
                            <Input
                                onChange={event => setName(event.currentTarget.value)}
                                placeholder={clinic.name} />

                            <FormLabel>Opening Time</FormLabel>
                            <Input
                                onChange={event => setOpeningTime(event.currentTarget.value)}
                                placeholder={clinic.openingTime} />

                            <FormLabel>Closing Time</FormLabel>
                            <Input
                                onChange={event => setClosingTime(event.currentTarget.value)}
                                placeholder={clinic.closingTime} />

                            <FormLabel>Address</FormLabel>
                            <FormLabel>place</FormLabel>
                            <Input
                                onChange={event => setPlace(event.currentTarget.value)}
                                placeholder={clinic.address !== null ? clinic.address.place : ""} />
                            <FormLabel>City</FormLabel>
                            <Input
                                onChange={event => setCity(event.currentTarget.value)}
                                placeholder={clinic.address !== null ? clinic.address.city : ""} />
                            <FormLabel>State</FormLabel>
                            <Input
                                onChange={event => setState(event.currentTarget.value)}
                                placeholder={clinic.address !== null ? clinic.address.state : ""} />
                            <FormLabel>Country</FormLabel>
                            <Input
                                onChange={event => setCountry(event.currentTarget.value)}
                                placeholder={clinic.address !== null ? clinic.address.country : ""} />
                            <Button type='submit' mt={5} size='lg' colorScheme='green'>Update Clinic</Button>
                            <Text mb={4} fontSize='xl' fontWeight='bold'>
                                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                                    {isdone}
                                </Badge>
                            </Text>
                        </FormControl>
                    </form>
                </div>
            </GridItem>
        </Grid>
    )
};