import React, { useState } from 'react'
import { Grid, GridItem, FormControl, Input, FormLabel, Select, Badge, Button, Heading, Text, Center } from '@chakra-ui/react';
import { registerClinic } from '../http/api';

export default function AddClinic() {
    const [name, setName] = useState();
    const [openingTime, setOpeningTime] = useState();
    const [closingTime, setClosingTime] = useState();
    const [place, setPlace] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isdone, setIsDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clinic = {
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
            const data = await registerClinic(clinic);
            setIsDone("Clinic Register Sccessfully!");
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
                        create New Clinic
                    </Badge>
                </Text>
                <div style={{ backgroundColor: "white", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Clinic Name</FormLabel>
                            <Input
                                onChange={event => setName(event.currentTarget.value)}
                                placeholder="name" />

                            <FormLabel>Opening Time</FormLabel>
                            <Input
                                onChange={event => setOpeningTime(event.currentTarget.value)}
                                placeholder="openin time" />

                            <FormLabel>Closing Time</FormLabel>
                            <Input
                                onChange={event => setClosingTime(event.currentTarget.value)}
                                placeholder="closing time" />

                            <FormLabel>Address</FormLabel>
                            <FormLabel>place</FormLabel>
                            <Input
                                onChange={event => setPlace(event.currentTarget.value)}
                                placeholder="place" />
                            <FormLabel>City</FormLabel>
                            <Input
                                onChange={event => setCity(event.currentTarget.value)}
                                placeholder="city" />
                            <FormLabel>State</FormLabel>
                            <Input
                                onChange={event => setState(event.currentTarget.value)}
                                placeholder="state" />
                            <FormLabel>Country</FormLabel>
                            <Input
                                onChange={event => setCountry(event.currentTarget.value)}
                                placeholder="country" />
                            <Button type='submit' mt={5} size='lg' colorScheme='green'>Submit</Button>
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