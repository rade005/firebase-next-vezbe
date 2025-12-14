"use client"

import {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase"
import {useRouter} from "next/navigation";


export default function UserLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful!");
            router.push("/");
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <>
        <h1>Login User</h1>

            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Sign in</button>

                <p>{message}</p>
            </form>
        </>
    )
}