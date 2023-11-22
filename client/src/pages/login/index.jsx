import React from 'react'
import { Box, Typography, useTheme, useMediaQuery, InputBase } from '@mui/material'
import Form from "./Form.jsx";

const Login = () => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box 
        width="100%" 
        backgroundColor={theme.palette.background.alt} 
        p="1rem 6%" 
        textAlign="center" 
        marginBottom="20px"
      >
        <Typography
          fontWeight="bold"
          fontSize="40px"
          color="primary"
        >
          Connectify
        </Typography>
      </Box>

      <Box
        width={isNonMobile ? "60%" : "90%"}
        backgroundColor={theme.palette.background.alt} 
        p="2rem 6%" 
        textAlign="center" 
        border="1rem" 
        margin="auto"
      >
        <Typography fontWeight="500" variant='h5' sx={{ mb: "1.5rem"}} fontSize="30px" textAlign="left">
          Sign In
        </Typography>

        <Typography fontWeight="400" variant='h6' sx={{ mb: "1.5rem"}} fontSize="14px" textAlign="left">
          Stay Tuned, Stay Engaged: Your Source for What's Happening Now.
        </Typography>

        <Typography fontWeight="500" variant='h5' sx={{ mb: "1.5rem"}} fontSize="20px" textAlign="left">
          <InputBase name="enter-email" placeholder='Enter your email' />
        </Typography>
        
        <Form />

      </Box>
    </Box>
  )
}

export default Login
