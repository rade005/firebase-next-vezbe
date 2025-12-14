"use client"

import {useState, useEffect} from "react";
import {onAuthStateChanged,
        reauthenticateWithCredential,
        EmailAuthProvider} from "firebase/auth";
import { auth } from "@/app/firebase/firebase"
import { useRouter} from "next/navigation";

export default function ReauthenticatePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
            } else {
                router.push("/login");
            }
        })
        return () => unsubscribe();
    }, [])

    const handleReauthenticate = async () => {
        try {
            const credential = EmailAuthProvider.credential(
                user.email, password
            );

            await reauthenticateWithCredential(user, credential);
            setMessage("Re-authentication successful!");
        } catch (error) {
            setMessage(error.message);
        }
    }

    if(!user) return <p>Loading...</p>

    return (
        <>
        <h1>Re-authenticate</h1>
            <p>Logged in as: {user.email}</p>

            <input type="password" placeholder="Enter current password" value={password}
                   onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleReauthenticate}>Reauthenticate</button>
            <p>{message}</p>
        </>
    )
}