import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
    const { palette }= useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const dark = palette.neutral.dark;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color="dark" variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt="ad"
                src="http://localhost:3001/assets/jupiter.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>GalacticGetaways</Typography>
                <Typography color={medium}>galacticgetaways.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Above and Beyond
            </Typography>

        </WidgetWrapper>
    )
}

export default AdWidget;

