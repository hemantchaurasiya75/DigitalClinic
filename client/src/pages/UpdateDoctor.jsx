import React, { useEffect, useState } from 'react';
import { Grid, GridItem, FormControl, Input, FormLabel, Select, Button, Badge, Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getDoctorById, updateDoctorById } from '../http/api';

export default function UpdateDoctor() {
    const [doctor, setDoctor] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        department :"",
        specialist : "",
        education :"",
        address: {
            place: "",
            city: "",
            state: "",
            country: "",
        }
    });
    const doctorId = useParams().doctorId;

    const [firstname, setFirstname] = useState(doctor.firstname);
    const [lastname, setLastname] = useState(doctor.lastname);
    const [email, setEmail] = useState(doctor.email);
    const [phone, setPhone] = useState(doctor.phone);
    const [age, setAge] = useState(doctor.age);
    const [department, setDepartment] = useState(doctor.department);
    const [specialist, setSpecialist] = useState(doctor.specialist);
    const [education, setEdcation] = useState(doctor.education);
    const [place, setPlace] = useState(doctor.address != null ? doctor.address.place : "");
    const [city, setCity] = useState(doctor.address != null ? doctor.address.city : "");
    const [state, setState] = useState(doctor.address != null ? doctor.address.state : "");
    const [country, setCountry] = useState(doctor.address != null ? doctor.address.country : "");
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    useEffect(() => {
        const getDoctorDetails = async () => {
            const data = await getDoctorById(doctorId);
            setDoctor(data);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setEmail(data.email);
            setPhone(data.phone);
            setAge(data.age);
            setDepartment(data.department);
            setSpecialist(data.specialist);
            setEdcation(data.education);
            setPlace(data.address.place);
            setCity(data.address.city);
            setState(data.address.state);
            setCountry(data.address.country);
            
        }
        getDoctorDetails();
    }, [doctorId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doctor = {
            firstname,
            lastname,
            email,
            phone,
            age,
            department,
            specialist,
            education,
            address: {
                place,
                city,
                state,
                country,
            }
        }
        setIsLoading(true);
        try {
            console.log(doctor)
            const data = await updateDoctorById(doctorId,doctor);
            setIsDone("Doctor Updated Successfully!");
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
                        Update Doctor
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input
                                onChange={event => setFirstname(event.currentTarget.value)}
                                placeholder={doctor.firstname} />

                            <FormLabel>Last name</FormLabel>
                            <Input
                                onChange={event => setLastname(event.currentTarget.value)}
                                placeholder={doctor.lastname} />

                            <FormLabel>Email</FormLabel>
                            <Input
                                onChange={event => setEmail(event.currentTarget.value)}
                                placeholder={doctor.email} />

                            <FormLabel>Phone</FormLabel>
                            <Input
                                onChange={event => setPhone(event.currentTarget.value)}
                                placeholder={doctor.phone} />

                            <FormLabel>Age</FormLabel>
                            <Input
                                onChange={event => setAge(event.currentTarget.value)}
                                placeholder={doctor.age} />

                            <FormLabel>Department</FormLabel>
                            <Input
                                onChange={event => setDepartment(event.currentTarget.value)}
                                placeholder={doctor.department} />

                            <FormLabel>Education</FormLabel>
                            <Input
                                onChange={event => setEdcation(event.currentTarget.value)}
                                placeholder={doctor.education} />

                            <FormLabel>Specialist</FormLabel>
                            <Input
                                onChange={event => setSpecialist(event.currentTarget.value)}
                                placeholder={doctor.specialist} />

                            <FormLabel>Address</FormLabel>
                            <FormLabel>place</FormLabel>
                            <Input
                                onChange={event => setPlace(event.currentTarget.value)}
                                placeholder={doctor.address !== null ? doctor.address.place : ""} />
                            <FormLabel>City</FormLabel>
                            <Input
                                onChange={event => setCity(event.currentTarget.value)}
                                placeholder={doctor.address !== null ? doctor.address.city : ""} />
                            <FormLabel>State</FormLabel>
                            <Input
                                onChange={event => setState(event.currentTarget.value)}
                                placeholder={doctor.address !== null ? doctor.address.state : ""} />
                            <FormLabel>Country</FormLabel>
                            <Input
                                onChange={event => setCountry(event.currentTarget.value)}
                                placeholder={doctor.address !== null ? doctor.address.country : ""} />
                            <Button type='submit' mt={5} size='lg' colorScheme='green'>Update Doctor</Button>
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