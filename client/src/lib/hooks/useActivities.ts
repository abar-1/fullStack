import { useQuery, useMutation, useQueryClient, useInfiniteQuery, keepPreviousData} from "@tanstack/react-query";
import { useLocation } from 'react-router';

import agent from "../api/agent";
import { useAccount } from "./useAccount";
import type { Activity, PagedList } from "../types";
import { useStore } from "./useStore";

export const useActivities = (id?: string) => {
    const {activityStore: {filter, startDate}} = useStore();
    const location = useLocation();
    const {currentUser} = useAccount();
    const queryClient = useQueryClient();
    
    const {data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useInfiniteQuery<PagedList<Activity, string>>({ //useQuery to fetch data
        queryKey: ['activities', filter, startDate],
        queryFn: async({pageParam = null}) => {
          const response = await agent.get<PagedList<Activity, string>>('/activities', {
            params: {
                cursor: pageParam,
                pageSize: 3,
                filter,
                startDate
            }
          });
          return response.data;
        },
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !id && location.pathname === '/activities' && '/activities' && !!currentUser,
        select: data => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(activity => {
                    const host = activity.attendees.find(x => x.id === activity.hostId);
                    return {
                        ...activity,
                        isHost: currentUser?.id === activity?.hostId,
                        isGoing: activity?.attendees.some(x => x.id === currentUser?.id),
                        hostImageUrl: host?.imageUrl
                    }
                })
            }))
                    
        })
            
    });

      const{data: activity, isLoading: isLoadingActivity} = useQuery({
            queryKey: ['activities', id],
            queryFn: async() => {
                const response = await agent.get<Activity>(`activities/${id}`);
                return response.data;
            },
            enabled: !!id && !!currentUser, //only execute function if id and user cookie is present
            select: (data => {
                const host = data.attendees.find(x => x.id === data.hostId);
                
                return {
                    ...data,
                    isHost: currentUser?.id === data?.hostId,
                    isGoing: data?.attendees.some(x => x.id === currentUser?.id),
                    hostImageUrl: host?.imageUrl
                }
            })
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
    });

    const updateAttendance = useMutation({
        mutationFn: async(id: string) => {
            await agent.post(`activities/${id}/attend`)
        },
        onMutate: async (activityId: string) => { //optimistic loading update
            await queryClient.cancelQueries({queryKey: ['activities', activityId]});
            const previousActivities = queryClient.getQueryData<Activity[]>(['activities', activityId]);
            queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
                if(!oldActivity  || !currentUser) {
                    return oldActivity;
                }

                const isHost = oldActivity.hostId === currentUser.id;
                const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

                return {
                    ...oldActivity,
                    isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isAttending 
                        ? isHost 
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter(x => x.id !== currentUser.id)
                        : [...oldActivity.attendees, 
                            {
                                id: currentUser.id, 
                                displayName: currentUser.displayName, 
                                imageUrl: currentUser.imageUrl
                            }]
                    
                }
            });
            return {previousActivities}
        },
        onError: (error, activityId, context) => {
            console.log(error);
            if(context?.previousActivities) {
                queryClient.setQueryData(['activities', activityId], context.previousActivities);
            }
        }
    });

    return{
        activitiesGroup, 
        isFetchingNextPage,
        hasNextPage, 
        fetchNextPage,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance
    }

}