import { Box, Button } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";
import {  useQueryClient } from "@tanstack/react-query";

type Props = {
    setEditMode: (editMode: boolean) => void
}

export default function ProfileEditForm({setEditMode}: Props) {
    const queryClient = useQueryClient();
    const {id} = useParams();
    const { updateProfile, profile } = useProfile(id);
    const {control, handleSubmit, reset, formState: {isDirty, isValid} } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onTouched'
    });
    
    const onSubmit = (data: EditProfileSchema) => {
        updateProfile.mutate(data, {
            onSuccess: () => {
                setEditMode(false);
                if (id) {
                queryClient.invalidateQueries({ queryKey: ['profile', id] });

                }
            }
        });
    }

    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });
    },[profile, reset])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' alignContent='center' gap={3} mt={3}>
      <TextInput 
        fullWidth
        label="Display Name"
        name="displayName"
        control={control}
        margin="normal"
      />
      <TextInput
        label="Add your bio"
        name='bio'
        control={control}
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!isValid || !isDirty || updateProfile.isPending}>
        Update Profile
      </Button>
    </Box>
  );
}
