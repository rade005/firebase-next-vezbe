"use client"

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import { auth } from "@/app/firebase/firebase"
import { onAuthStateChanged, sendEmailVerification} from "firebase/auth";

export default function EmailVerifyPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) {
                router.push("/login");
            } else {
                setUser(u);
            }
            setLoading(false);
        })
        return () => unsub();
    }, [])

    async function handleSendVerification() {
        if(!auth.currentUser) return;

        try {
            await sendEmailVerification(auth.currentUser);
            setMessage("Verification email sent!");
        } catch (error) {
            setMessage(error.message);
        }
    }
    async function handleRefreshStatus() {
        if (!auth.currentUser) return;

        await auth.currentUser.reload();
        setUser({...auth.currentUser});
        setMessage("Status refreshed");
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
        <h1>Email Verification</h1>

            <p>Logged in as: {user.email}</p>
            <p>Email verified: {user.emailVerified ? "YES" : "NO"}</p>

            <button onClick={handleSendVerification}>Send verification email</button>
            <button onClick={handleRefreshStatus}>Refresh verification status</button>
            <p>{message}</p>
        </>
    )
}