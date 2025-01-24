import axios from 'axios';
import { create } from 'zustand';

//! Define types for state and actions
interface SessionState {
    isLoggedIn: boolean;
    userName: string | null;
    isValidated: boolean;
}

interface SessionActions {
    checkSession: () => Promise<{ isLoggedIn: boolean; userName: string | null; isValidated: boolean }>;
    setIsValidSession: () => void; // New action to set isValidated to false
}

export const SessionCheck = create<SessionState & SessionActions>((set) => ({
    isLoggedIn: false,
    userName: null,
    isValidated: false,

    //! Check session function
    checkSession: async () => {
        try {
            //! Sending cookies data as headers to backend
            const { data: { status, userName } } = await axios.get('/api/EmailArmorAPIs/localSessionCheck');

            const isLoggedIn = status === 202;

            // Set the state after a successful API call
            set({ isLoggedIn, userName, isValidated: true });

            // Return the values after setting state
            return { isLoggedIn, userName, isValidated: true };
        } catch (error) {
            console.error('Error checking session:', error);

            // Return default values if an error occurs
            return { isLoggedIn: false, userName: null, isValidated: true };
        }
    },

    //! Invalidate session function
    setIsValidSession: () => {
        set({ isValidated: false });
    },
}));