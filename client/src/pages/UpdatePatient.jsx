import React, { useEffect, useState } from 'react';
import { Grid, GridItem, FormControl, Input, FormLabel, Select, Button, Badge, Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getPatientById, updatePatientById } from '../http/api';

export default function UpdatePatient() {
    const [patient, setPatient] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        bloodgroup: "",
        address: {
            place: "",
            city: "",
            state: "",
            country: "",
        }
    });
    const patientId = useParams().patientId;

    const [firstname, setFirstname] = useState(patient.firstname);
    const [lastname, setLastname] = useState(patient.lastname);
    const [email, setEmail] = useState(patient.email);
    const [phone, setPhone] = useState(patient.phone);
    const [age, setAge] = useState(patient.age);
    const [height, setHeight] = useState(patient.height);
    const [weight, setWeight] = useState(patient.weight);
    const [bloodgroup, setBloodgroup] = useState(patient.bloodgroup);
    const [place, setPlace] = useState(patient.address != null ? patient.address.place : "");
    const [city, setCity] = useState(patient.address != null ? patient.address.city : "");
    const [state, setState] = useState(patient.address != null ? patient.address.state : "");
    const [country, setCountry] = useState(patient.address != null ? patient.address.country : "");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    useEffect(() => {
        const getPatientDetails = async () => {
            const data = await getPatientById(patientId);
            setPatient(data);
        }
        getPatientDetails();
    }, [patientId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patient = {
            firstname,
            lastname,
            email,
            phone,
            age,
            height,
            weight,
            bloodgroup,
            address: {
                place,
                city,
                state,
                country,
            }
        }
        setIsLoading(true);
        try {
            console.log(patient)
            const data = await updatePatientById(patientId,patient);
            setIsDone("User Updated Successfully!");
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
                        Update New Patient
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input
                                onChange={event => setFirstname(event.currentTarget.value)}
                                placeholder={patient.firstname} />

                            <FormLabel>Last name</FormLabel>
                            <Input
                                onChange={event => setLastname(event.currentTarget.value)}
                                placeholder={patient.lastname} />

                            <FormLabel>Email</FormLabel>
                            <Input
                                onChange={event => setEmail(event.currentTarget.value)}
                                placeholder={patient.email} />

                            <FormLabel>Phone</FormLabel>
                            <Input
                                onChange={event => setPhone(event.currentTarget.value)}
                                placeholder={patient.phone} />

                            <FormLabel>Age</FormLabel>
                            <Input
                                onChange={event => setAge(event.currentTarget.value)}
                                placeholder={patient.age} />

                            <FormLabel>Height</FormLabel>
                            <Input
                                onChange={event => setHeight(event.currentTarget.value)}
                                placeholder={patient.height} />

                            <FormLabel>Weight</FormLabel>
                            <Input
                                onChange={event => setWeight(event.currentTarget.value)}
                                placeholder={patient.weight} />

                            <FormLabel>Blood Group</FormLabel>
                            <Select placeholder='Select Blood Group'>
                                <option value={"O+"}>O+</option>
                                <option value={"O-"}>O-</option>
                                <option value={"A+"}>A+</option>
                                <option value={"A-"}>A-</option>
                            </Select>

                            <FormLabel>Address</FormLabel>
                            <FormLabel>place</FormLabel>
                            <Input
                                onChange={event => setPlace(event.currentTarget.value)}
                                placeholder={patient.address !== null ? patient.address.place : ""} />
                            <FormLabel>City</FormLabel>
                            <Input
                                onChange={event => setCity(event.currentTarget.value)}
                                placeholder={patient.address !== null ? patient.address.city : ""} />
                            <FormLabel>State</FormLabel>
                            <Input
                                onChange={event => setState(event.currentTarget.value)}
                                placeholder={patient.address !== null ? patient.address.state : ""} />
                            <FormLabel>Country</FormLabel>
                            <Input
                                onChange={event => setCountry(event.currentTarget.value)}
                                placeholder={patient.address !== null ? patient.address.country : ""} />
                            <Button type='submit' mt={5} size='lg' colorScheme='green'>Update Patient</Button>
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