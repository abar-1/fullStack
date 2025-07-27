import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from '../../../lib/util/util';
import type { Activity } from "../../../lib/types";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
    activity: Activity
}

export default function ActivityCard({activity}: Props) {
    const label = activity.isHost ? 'You are hosting' : 'You are going';
    const color = activity.isHost ?'secondary' : activity.isGoing ? 'warning' : 'default';

    return(

        <Card elevation={3} sx={{borderRadius: 3}}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar sx={{height: 80, width: 80}}/>}
                    title={activity.title}
                    titleTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                    subheader={
                        <>
                            Hosted by{' '}
                            <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
                        </>
                    }
                />
                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(activity.isHost || activity.isGoing) && <Chip label={label} color={color} sx={{borderRadius: 2}} />}
                    {activity.isCancelled && <Chip label='Cancelled' color='error' sx={{borderRadius: 2}} /> }
                </Box>
            </Box>
            
            <Divider sx={{mb: 3}} />

            <CardContent sx={{p: 0}}>
                <Box display='flex' alignItems='center' mb={2} px={2}>
                    <Box display='flex' flexGrow={0} alignItems='center'>
                        <AccessTime sx={{mr: 1}} />
                        <Typography variant="body2" noWrap>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>
                    <Place sx={{ml: 3, mr: 1}} />
                    <Typography variant="body2">{activity.venue}</Typography>
                </Box>
                <Divider />
                <Box display='flex' gap={2} sx={{backgroundColor: 'grey.200', py: 3, pl: 3}}> 
                        {activity.attendees.map(attendee => (
                            <Box key={attendee.id} display='flex' flexDirection='column' alignItems='center' gap={1}>
                                <AvatarPopover profile={attendee} key={attendee.id} />
                                <Typography variant="body2" noWrap>
                                    {attendee.displayName}
                                </Typography>
                            </Box>
                        ))}
                </Box>
                        
            </CardContent>

            <CardContent>
                
            </CardContent>
            <CardActions sx={{pb: 2}}>
                <Box display="flex" width="100%" alignItems="center">
                    <Typography variant="body2" sx={{flexGrow: 1}}>
                        {activity.description}
                    </Typography>
                    <Button
                        component={Link}
                        to={`/activities/${activity.id}`}
                        size="medium"
                        variant="contained"
                        sx={{borderRadius: 3, ml: 2}}
                    >
                        View
                    </Button>
                </Box>
            </CardActions>
        </Card>

    );
}