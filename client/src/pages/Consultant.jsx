import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConsultantById } from '../http/api';
import jsPDF from 'jspdf';
import {Grid, GridItem, FormLabel, Badge, Button, Text} from '@chakra-ui/react';

export default function Consultant() {
  let consultantId = useParams().consultantId;
  const [consultant, setConsultant] = useState({
    consultant: null
  });

  useEffect(() => {
    const fetchConsultant = async () => {
      const data = await getConsultantById(consultantId);
      console.log(data);
      setConsultant(data);
    }
    fetchConsultant();
  }, [consultantId])


  const generatePdf = () => {
    console.log("ok")
    var doc = new jsPDF('p', 'pt');

    doc.text(20, 20, `CLINIC DETAILS`);
    doc.text(20, 60, `Clinic Name : ${consultant.clinic.name}`);
    doc.text(20, 80, `Clinic openingTime : ${consultant.clinic.openingTime}`);
    doc.text(20, 100, `Clinic closingTime : ${consultant.clinic.closingTime}`);
    doc.text(20, 120, `Clinic Address :${consultant.clinic.address.place} ${consultant.clinic.address.city} ${consultant.clinic.address.state} ${consultant.clinic.address.country}`);


    doc.text(20, 160, `DOCTOR DETAILS`);
    doc.text(20, 200, `Doctor Name : ${consultant.doctor.firstname} ${consultant.doctor.lastname}`);
    doc.text(20, 220, `Doctor Email : ${consultant.doctor.email}`);
    doc.text(20, 240, `Doctor Phone : ${consultant.doctor.phone}`);
    doc.text(20, 260, `Doctor department : ${consultant.doctor.department}`);
    doc.text(20, 280, `Doctor specialist : ${consultant.doctor.specialist}`);

    doc.text(20, 320, `PATIENT DETAILS`);
    doc.text(20, 360, `Patient First Name : ${consultant.patient.firstname}`);
    doc.text(20, 380, `Patient Last Name : ${consultant.patient.lastname}`);
    doc.text(20, 400, `Patient Age : ${consultant.patient.age}`);
    doc.text(20, 420, `Patient bloodGroup : ${consultant.patient.bloodGroup != null ? consultant.patient.bloodGroup : "Not Mention"}`);
    doc.text(20, 440, `Patient height : ${consultant.patient.height}`);
    doc.text(20, 460, `Patient weight : ${consultant.patient.weight}`);

    doc.text(20, 500, `DISEASE DETAILS`);
    doc.text(20, 520, `Disease Name : ${consultant.medicine.disease}`);
    doc.text(20, 540, `Medicine Name : ${consultant.medicine.name}`);
    doc.text(20, 560, `Medicine Type : ${consultant.medicine.type}`);
    doc.text(20, 580, `Medicine frequency : ${consultant.medicine.frequency}`);
    doc.text(20, 600, `Medicine quantity : ${consultant.medicine.quantity}`);
    doc.text(20, 620, `Medicine date : ${consultant.medicine.date}`);
    doc.text(20, 640, `Medicine description : ${consultant.medicine.description}`);
    // doc.setFont('helvetica')
    doc.save('sample-file.pdf')
  }

  return (
    <Grid className='homeContainer' h='100%'>
      <GridItem ml={20} marginRight={20} colSpan={5}>
        <Text mb={4} fontSize='xl' fontWeight='bold'>
          <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
            Consultant
          </Badge>
        </Text>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={generatePdf} mr={3} size='sm' colorScheme='green'>Download Consultant</Button>
          </div>

          <div style={{display:"flex"}}>

            <div style={{justifyContent:"center"}}>
              <Text mb={4} fontSize='xl' fontWeight='bold'>
                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                  Patient Detail
                </Badge>
              </Text>
              <FormLabel>Name :  </FormLabel>
              <FormLabel>Email  :  </FormLabel>
              <FormLabel>Phone  :  </FormLabel>
              <FormLabel>Age  :  </FormLabel>
              <FormLabel>blood Group  :  </FormLabel>
            </div>

            <div style={{justifyContent:"center"}}>
              <Text mb={4} fontSize='xl' fontWeight='bold'>
                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                  Doctor Detail
                </Badge>
              </Text>
              <FormLabel>Name :  </FormLabel>
              <FormLabel>Email  :  </FormLabel>
              <FormLabel>Phone  :  </FormLabel>
              <FormLabel>Age  :  </FormLabel>
              <FormLabel>blood Group  :  </FormLabel>
            </div>
          </div>

          <div style={{display:"flex"}}>

            <div style={{justifyContent:"center"}}>
              <Text mb={4} fontSize='xl' fontWeight='bold'>
                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                  Medicine Detail
                </Badge>
              </Text>
              <FormLabel>Name :  </FormLabel>
              <FormLabel>Disease :  </FormLabel>
              <FormLabel>Date :  </FormLabel>
              <FormLabel>Type :  </FormLabel>
              <FormLabel>Quantity :  </FormLabel>
              <FormLabel>Frequency :  </FormLabel>
              <FormLabel>Description :  </FormLabel>
            </div>

            <div style={{justifyContent:"center"}}>
              <Text mb={4} fontSize='xl' fontWeight='bold'>
                <Badge mr={1} ml='1' fontSize='1.0em' colorScheme='green'>
                  Clinic Detail
                </Badge>
              </Text>
              <FormLabel>Name :  </FormLabel>
              <FormLabel>Address :  </FormLabel>
              <FormLabel>Opening Time :  </FormLabel>
              <FormLabel>Closing Time :  </FormLabel>
            </div>
          </div>
        </div>
      </GridItem>
    </Grid>
  )
}