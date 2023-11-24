import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutLined,
    MicOffOutlined,
    MoreHorizOutlined
} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme, Button, InputBase, IconButton, useMediaQuery } from "@mui/material"
import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { UseSelector, useDispatch, useSelector } from "react-redux/es/hooks/useSelector"
import { useState } from "react"
import Dropzone from "react-dropzone"
import { setPosts } from "state"

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const[isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const[post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async() => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData
        })

        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");

        return (
            <WidgetWrapper>
                <FlexBetween gap="1.5rem">
                    <UserImage image={picturePath} />
                    <InputBase placeholder="What's on your mind right now...." 
                        onChange={(e) => setPost(e.target.value)} 
                        value={post} 
                        sx={{
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                        }} 
                    />
                </FlexBetween>

                {isImage && (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                <IconButton
                                    onClick={() => setImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                                )}
                            </FlexBetween>
                            )}
                        </Dropzone>
                    </Box>
                )}

                

            </WidgetWrapper>
        )
    }



}

