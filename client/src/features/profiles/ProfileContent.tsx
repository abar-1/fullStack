import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react"
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";


export default function ProfileContent() {
    const [value, setValue] = useState(0);
    const tabContent = [
        { label: 'About', content: <div><ProfileAbout /></div> },
        {label: 'Photos', content: <div><ProfilePhotos /></div> },
        {label: 'Events', content: <div>Events Content</div>},
        { label: 'Followers', content: <div>Followers Content</div> },
        { label: 'Following', content: <div>Following Content</div> },
    ]

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

  return (
    <Box
        component={Paper}
        mt={2}
        p={3}
        elevation={500}
        height={500}
        sx={{display: 'flex', alignItems: 'flex-start', borderRadius: 3}}
    >
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{borderRight: 1, height: 450, mnWidth: 200}}
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
