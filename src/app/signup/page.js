"use client"

import {useState} from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth} from "@/app/firebase/firebase"

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    async function handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("User created successfully!");
            router.push("/user-login");
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <>
        <h1>Sign Up</h1>
            <input type="email" placeholder="Email" value={email}
                   onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={handleSignUp}>Sign up</button>
            <p>{message}</p>
        </>
    )
}