import React from 'react';
import { Wrap, WrapItem, Avatar, Button, ButtonGroup } from '@chakra-ui/react';
import "../styles/navbar.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='navbar'>
      <Wrap >
        <WrapItem>
          <Avatar ml={4} src='https://bit.ly/dan-abramov' />
          <ButtonGroup ml={6} mt={1} gap='4'>
            {
              !user ? (
                <>
                  <Button colorScheme='blackAlpha'>
                    <Link to={`/register-doctor`}>Register as Doctor</Link>
                  </Button>

                  <Button colorScheme='blackAlpha'>
                    <Link to={`/register-patient`}>Register as Patient</Link>
                  </Button>
                </>
              ) : user.role === "DOCTOR" ? (
                <>
                  <Button colorScheme='blackAlpha'>
                    <Link to={`/doctor-details/${user.userid}`}>Doctor Profile</Link>
                  </Button>

                  <Button colorScheme='blackAlpha'>
                    <Link to={`/patient-list`}>Patient List</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button colorScheme='blackAlpha'>
                    <Link to={`/patient-details/${user.userid}`}>Patient Profile</Link>
                  </Button>

                  <Button colorScheme='blackAlpha'>
                    <Link to={`/medicine-list/${user.userid}`}>My Medicine</Link>
                  </Button>
                </>
              )
            }
          </ButtonGroup>
        </WrapItem>
      </Wrap>
    </div>
  )
}

export default Navbar;

