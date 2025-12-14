"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {onAuthStateChanged, updatePassword} from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

export default function UpdatePasswordPage () {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) setUser(u);
            else router.push("/user-login");
        })
        return () => unsubscribe();
    }, [])

    async function handleUpdatePassword() {
        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters")
            return;
        }
        try {
            await updatePassword(auth.currentUser, newPassword);
            setMessage("Password updated successfully.");
            setNewPassword("");
        } catch (error) {
            if(error.code === "auth/requires-recent-login") {
                setMessage("Please log in again to update your password");
            } else {
                setMessage(error.message);
            }
        }
    }
    if (!user) return <p>Loading...</p>;

    return (
        <>
        <h1>Update Password</h1>
            <p>Logged in as: {user.email}</p>

            <input type="password" placeholder="password" value={newPassword}
                   onChange={e => setNewPassword(e.target.value)} />

            <button onClick={handleUpdatePassword}>Update Password</button>
            <p>{message}</p>
        </>
    );
}