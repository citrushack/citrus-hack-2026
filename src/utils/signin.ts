"use client";
import { signInWithGoogle } from "@/utils/auth/auth-client";

interface props {
  callback: string;
}

const SignIn = ({ callback }: props) => void signInWithGoogle(callback);

export default SignIn;
