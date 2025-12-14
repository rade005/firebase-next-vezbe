"use client"

import {useEffect, useState} from "react";
import { auth } from "@/app/firebase/firebase"
import {signOut, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/navigation";

export default function UserLogout() {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push("/user-login");
            }
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    async function handleLogout() {
        try {
            await signOut(auth)
            setMessage("You have been logged out");
            router.push("/user-login");
        } catch (error) {
            setMessage(error.message);
        }
    }

    if(loading) return <p>Loading...</p>

    return (
        <>
        <h1>Logout</h1>
            <p>You are logged in as: {user?.email}</p>

            <button onClick={handleLogout}>Logout</button>

            <p>{message}</p>
        </>
    )
}