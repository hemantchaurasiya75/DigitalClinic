import { useEffect, useState } from 'react';
import { Grid, GridItem, Box, Flex, Spacer, } from '@chakra-ui/react';
import "../styles/home.css";
import { Previous, Paginator, Next, } from 'chakra-paginator';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import ClinicList from '../components/ClinicList';
import { useSelector } from 'react-redux';

export default function ClinicPage() {
    const clinicList = useSelector((state) => state.clinicList);

    const itemLimit = 10;
    const [pagesQuantity, setPagesQuantity] = useState(1);
    const [curPage, setCurPage] = useState(0);

    const handlePageChange = (page) => {
        setCurPage(page - 1);
    };

    useEffect(() => {
        const pagesTotal = Math.ceil(clinicList.length / itemLimit) + 1;
        setPagesQuantity(pagesTotal);
    }, [clinicList.length]);

    return (
        <Grid className='homeContainer' h='100%'>
            <GridItem ml={20} marginRight={20} colSpan={5}>
                <Box
                    w='100%'
                    mt={5}
                    className='rightSection'>
                    <ClinicList clinics={clinicList} curPage={curPage} clinicLimit={itemLimit} />

                    <Flex p={2}>
                        <Spacer />
                        <Paginator
                            onPageChange={handlePageChange}
                            pagesQuantity={pagesQuantity - 1}>
                            <Previous mr={5} bg="green">
                                <CgChevronLeft />
                            </Previous>
                            <Next bg="green">
                                <CgChevronRight />
                            </Next>
                        </Paginator>
                    </Flex>
                </Box>
            </GridItem>
        </Grid>
    )
};