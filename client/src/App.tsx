import { useState, useEffect } from 'react';
import { Typography, ListItem, ListItemText } from "@mui/material";
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data));
  }, []);

  useEffect(() => {
    console.log("Activities:", activities);
  }, [activities]);

  return (
    <>
      <Typography variant='h3'> Reactivities </Typography>
      <ul>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>
             {activity.title} 
            </ListItemText>
          </ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
