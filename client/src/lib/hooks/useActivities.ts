import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useLocation } from 'react-router';

import agent from "../api/agent";
import { useAccount } from "./useAccount";
import type { Activity } from "../types";

export const useActivities = (id?: string) => {
    const location = useLocation();
    const {currentUser} = useAccount();
    const queryClient = useQueryClient();
    
    const {data: activities, isLoading} = useQuery({ //useQuery to fetch data
        queryKey: ['activities'],
        queryFn: async() => {
          const response = await agent.get<Activity[]>('/activities');
          return response.data;
        },
        enabled: !id && location.pathname === '/activities' && '/activities' && !!currentUser
      });

      const{data: activity, isLoading: isLoadingActivity} = useQuery({
            queryKey: ['activities', id],
            queryFn: async() => {
                const response = await agent.get<Activity>(`activities/${id}`);
                return response.data;
            },
            enabled: !!id && !!currentUser//only execute function if id and user cookie is present
      }) 

    //useMutation to mutate/change data
    const updateActivity = useMutation({
        mutationFn: async(activity: Activity) => {
            await agent.put('/activities', activity)
            
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    });

    const createActivity = useMutation({
        mutationFn: async(activity: Activity) => {
            const response = await agent.post('/activities', activity)
            return response.data;
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async(id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    return{
        activities, 
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    }

}