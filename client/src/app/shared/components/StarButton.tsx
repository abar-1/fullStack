import { Star, StarBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

type Props = {
    selected: boolean;
}
export default function StarButton({selected}: Props) {
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
            <StarBorder 
                sx={{
                    fontSize: 32, 
                    color: 'white',
                    position: 'absolute'
                }}
            />

            <Star
                sx={{
                    fontSize: 23, 
                    color: selected ? 'yellow' : 'rgba(0,0,0,0.5)'
                }}
            />


        </Button>
        
    </Box>
  )
}
