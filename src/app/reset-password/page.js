"use client"

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!email) {
            setMessage("Please enter your email");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent");
        } catch (error) {
            setMessage(error.message);
        }
    }
    return (
        <>
        <h1>Reset Password</h1>

            <input type="email" placeholder="Enter your email" value={email}
                   onChange={(e) => setEmail(e.target.value)} />

            <button onClick={handleResetPassword}>Reset Password</button>
            <p>{message}</p>
        </>
    )
}