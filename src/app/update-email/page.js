"use client"

import { useState, useEffect } from "react";
import {onAuthStateChanged, updateEmail} from "firebase/auth";
import { auth } from "@/app/firebase/firebase"
import { useRouter} from "next/navigation"

export default function UpdateEmailPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [newEmail, setNewEmail] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u)
                setUser(u);
             else
                router.push("/login");
                   })
        return () => unsubscribe();
    }, [])

    const handleUpdateEmail = async () => {
        if (!newEmail) return setMessage("Please enter a valid email");
        try {
            await updateEmail(auth.currentUser, newEmail);
            setMessage("Email updated successfully.");
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                setMessage("Please log in again to update your email")
            } else {
                setMessage(error.message);
            }
        }
    }

    if(!user) return <p>Loading...</p>

    return (
        <>
        <h1>Update Email</h1>
            <p>Current Email: {user.email}</p>

            <input type="email" placeholder="Email" value={newEmail}
            onChange={e => setNewEmail(e.target.value)} />

            <button onClick={handleUpdateEmail}>Update Email</button>
            <p>{message}</p>
        </>
    );
}