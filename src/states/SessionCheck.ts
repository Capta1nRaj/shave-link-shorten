import { GetCookiesList } from '@/utils/GetCookiesList';
import axios from 'axios';
import { create } from 'zustand';

//! Define types for state and actions
interface SessionState {
    isLoggedIn: boolean;
    userName: string | null;
}

interface SessionActions {
    checkSession: () => Promise<{ isLoggedIn: boolean; userName: string | null }>;
}

export const SessionCheck = create<SessionState & SessionActions>((set) => ({
    isLoggedIn: false,
    userName: null,
    checkSession: async () => {
        try {

            //! Fetching cookies list
            const cookies = GetCookiesList();

            //! Sending cookies data as headers to backend
            const { data: { status, userName } } = await axios.get('/api/EmailArmorAPIs/localSessionCheck', {
                headers: {
                    'Content-Type': 'application/json',
                    userName: cookies.userName,
                    token: cookies.token,
                }
            });

            const isLoggedIn = status === 202 ? true : false;
            set({ isLoggedIn, userName });
            return { isLoggedIn, userName }; // Return the values after setting state
        } catch (error) {
            console.error('Error checking session:', error);
            return { isLoggedIn: false, userName: null }; // Return default values if an error occurs
        }
    },
}));
