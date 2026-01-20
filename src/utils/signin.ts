"use client";
import { useEffect } from "react";
import { signInWithGoogle } from "@/utils/auth/auth-client";

interface props {
  callback: string;
}

const SignIn = ({ callback }: props) => {
  useEffect(() => {
    void signInWithGoogle(callback);
  }, [callback]);

  return null;
};

export default SignIn;
