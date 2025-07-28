import { Grid2 } from "@mui/material";
import  ProfileHeader  from "./ProfileHeader";
import  ProfileContent  from "./ProfileContent";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfilePage() {
    const {id} = useParams();
    const {profile, loadingProfile} = useProfile(id);

    if (loadingProfile) return <h1>Loading profile...</h1>;
    if (!profile) return <h1>Profile not found</h1>;


    return(

        <Grid2 container>
            <Grid2 size={12}>
                <ProfileHeader profile={profile}/>
            <ProfileContent />
            </Grid2>
        </Grid2>
    )

}
