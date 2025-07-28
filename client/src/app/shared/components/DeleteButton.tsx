import { Delete, DeleteOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function DeleteButton() {
  return (
    <Box>
        <Button 
            sx={{
                opacity: 0.8,
                transition: 'opacity 0.3s',
                position: 'relative',
                cursot: 'pointer'
            }}
        >
            <DeleteOutline 
                sx={{
                    fontSize: 32, 
                    color: 'white',
                    position: 'absolute'
                }}
            />

            <Delete
                sx={{
                    fontSize: 23, 
                    color:'red'
                }}
            />


        </Button>
        
    </Box>
  )
}
