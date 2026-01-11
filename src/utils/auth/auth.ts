import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { Pool } from "pg";

type Restrictions = Record<string, number[]>;

const postgresUrl = process.env.DB_URL || "";
const pool = new Pool({ connectionString: postgresUrl });

export const auth = betterAuth({
  database: pool,
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      overrideUserInfoOnSignIn: true,
      mapProfileToUser(profile) {
        return {
          name: profile.name || "",
          email: profile.email || "",
          image: profile.picture || "",
          emailVerified: !!profile.email_verified,
          firstName: profile.given_name || "",
          lastName: profile.family_name || "",
          team: "",
          photo: profile.picture || "",
          roles: {},
        };
      },
    },
  },
  user: {
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
      team: { type: "string", required: false },
      photo: { type: "string", required: false },
      roles: { type: "json", required: false },
      discord: { type: "string", required: false },
      phone: { type: "string", required: false },
      major: { type: "string", required: false },
      age: { type: "string", required: false },
      country: { type: "string", required: false },
      school: { type: "string", required: false },
      grade: { type: "string", required: false },
      gender: { type: "string", required: false },
      shirt: { type: "string", required: false },
      diet: { type: "string", required: false },
      affiliation: { type: "string", required: false },
      rounds: { type: "json", required: false },
      events: { type: "json", required: false },
      availability: { type: "string", required: false },
      response: { type: "string", required: false },
      title: { type: "string", required: false },
      panelist: { type: "string", required: false },
      company: { type: "string", required: false },
      position: { type: "string", required: false },
      tier: { type: "string", required: false },
      comments: { type: "string", required: false },
      eventSource: { type: "string", required: false },
      priorExperience: { type: "string", required: false },
      priorHackathons: { type: "string", required: false },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "",
});

export const getSession = async () => {
  return auth.api.getSession({ headers: headers() });
};

export const authenticate = async (restrictions: Restrictions = {}) => {
  const session = await getSession();

  if (!session?.user) {
    return { message: "Invalid Authentication Credentials.", auth: 401 };
  }

  const roles =
    (session.user as { roles?: Record<string, number> }).roles || {};
  const authorized = Object.entries(restrictions).some(([key, value]) =>
    value.includes(+roles[key]),
  );

  if (!authorized && Object.keys(restrictions).length > 0) {
    return { message: "Forbidden Access", auth: 403 };
  }

  return {
    message: null,
    auth: 200,
    uid: session.user.id,
    user: session.user,
  };
};
