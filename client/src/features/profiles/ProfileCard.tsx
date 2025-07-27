import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import type { Profile } from "../../lib/types";
import { Person } from "@mui/icons-material";

type Props = {
    profile: Profile
}

export default function ActivityCard({profile}: Props) {
    const following = false;
   
   
    return(
        <Link to={`/profiles/${profile.id}`} style={{textDecoration: 'none'}}>
            <Card elevation={4} sx={{borderRadius: 3, p: 3, maxWidth: 300, textDecoration: 'none', mb: 2}}>
                <CardMedia 
                    component='img'
                    src={profile?.imageUrl || '/images/user.png'} 
                    sx={{width: 200, zIndex: 50}}
                    alt={profile.displayName + ' image'}
                />
                <CardContent>
                    <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
                        <Typography variant="h5" fontWeight='bold' noWrap>{profile.displayName}</Typography>
                        {following && <Chip size="small" label='Following' color='secondary' />}

                    </Box>
                </CardContent>
                <Divider sx={{mb: 2}} />
                <Box display='flex' alignItems='center' justifyContent='start'>
                    <Person />
                    <Typography sx={{ml: 1}}>20 Followers</Typography>
                </Box>
            </Card>
        
        </Link>
    )   

}