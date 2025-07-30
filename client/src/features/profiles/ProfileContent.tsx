import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react"
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";


export default function ProfileContent() {
    const [value, setValue] = useState(0);
    const tabContent = [
        { label: 'About', content: <div><ProfileAbout /></div> },
        {label: 'Photos', content: <div><ProfilePhotos /></div> },
        {label: 'Events', content: <div><ProfileActivities /></div>},
        { label: 'Followers', content: <div><ProfileFollowings activeTab={value} /></div> },
        { label: 'Following', content: <div><ProfileFollowings activeTab={value} /></div> },
    ]

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

  return (
    <Box
        component={Paper}
        mt={2}
        p={3}
        elevation={100}
        sx={{
            display: 'flex',
            alignItems: 'stretch',
            minHeight: 500,
            borderRadius: 3,
        }}
    >
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{
                borderRight: 1,
                width: 200,
                flexShrink: 0,
            }}
        >
            {tabContent.map((tab, index) => (
                <Tab key={index} label={tab.label} value={index} sx={{mr: 3}}/>
            ))}; 
        </Tabs>
         <Box sx={{flexGrow: 1, p: 3, pt: 0}}>
                {tabContent[value].content}
            </Box>
    </Box>
  )
}
