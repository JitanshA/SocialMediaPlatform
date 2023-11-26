import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from 'pages/navbar';
import FriendListWidget from 'pages/Widgets/FriendListWidget';
import MyPostWidget from 'pages/Widgets/MyPostWidget';
import PostsWidget from 'pages/Widgets/PostsWidget';
import UserWidget from 'pages/Widgets/UserWidget';

const Profile = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobile = useMediaQuery("(min-width: 1000px")

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [])

  if( !user) {return null}

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobile ? "25%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "40%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};



export default Profile
