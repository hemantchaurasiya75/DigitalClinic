import React from 'react';
import { Wrap, WrapItem, Input, Avatar, Text, Button, ButtonGroup } from '@chakra-ui/react';
import "../styles/navbar.css";


export default function Footer() {
  return (
    <div className='footer'>
      <Wrap >
        <WrapItem>
          <Text>DigitalClinic@2023</Text>
        </WrapItem>
      </Wrap>
    </div>
  )
};