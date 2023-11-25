import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'pages/navbar'
import { useSelector } from 'react-redux';
import UserWidget from 'pages/Widgets/UserWidget';
import MyPostWidget from 'pages/Widgets/MyPostWidget';

const Home = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display={isNonMobile ? "flex": "block"} gap="0.5rem" justifyContent="space-between">
        <Box flexBasis={isNonMobile ? "25%": undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobile ? "40%": undefined} mt={isNonMobile ? undefined: "2rem"}>
          <MyPostWidget picturePath={picturePath} />
        </Box>
        {isNonMobile && (
          <Box flexBasis="25%">
            
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Home
