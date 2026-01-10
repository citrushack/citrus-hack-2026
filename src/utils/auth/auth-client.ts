import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()]
});
export const { signIn, signUp, useSession } = authClient;

export const signInWithGoogle = async (callbackUrl = "/") => {
    const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
    });

    if (response?.data?.redirect && response.data.url) {
        window.location.href = response.data.url;
    }
};

export const signOut = async (callbackUrl = "/") => {
    await authClient.signOut();
    window.location.href = callbackUrl;
};
