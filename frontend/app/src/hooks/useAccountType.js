import React from 'react';
import { useEffect, useState } from 'react';
import Profile from '../utils/Profile/Profile';

export const useAccountType = () => {
    const [accountType, setAccountType] = useState(null);

    useEffect(() => {
        async function fetchAccountType() {
            try {
                const account = await Profile.getAccountType();
                setAccountType(account);
            } catch (error) {
                console.error("Failed to fetch account type", error);
            }
        }

        fetchAccountType();
    }, []);

    return accountType;
};
