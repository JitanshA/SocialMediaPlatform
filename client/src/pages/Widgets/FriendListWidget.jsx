import { Box, Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import {useTheme} from "@mui/material";
import { setFriends } from "state";
import { useDispatch, useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)

    const primaryLight = palette.primary.light;
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.main;

    const getFriends = async() => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        })

        const data = await response.json();
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends();
    }, [])

    return (
        <WidgetWrapper>
            <Typography
                color={dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Friend List
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        userPicturePath={friend.picturePath}
                    />

                ))}
            </Box>
        </WidgetWrapper>
    )

}

export default FriendListWidget
