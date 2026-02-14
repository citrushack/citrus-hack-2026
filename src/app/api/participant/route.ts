import { AUTH } from "@/data/user/participant";
import { authenticate } from "@/utils/auth/auth";
import { ensureAppTables, pool } from "@/utils/db";
import { Resend } from "resend";

export const POST = async (req: Request) => {
  const { auth, message, user } = await authenticate(AUTH.POST);
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (auth !== 200) {
    return Response.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const { phone, major, age, country, school, grade, gender, shirt, diet } =
    await req.json();

  if (!user?.id) {
    return Response.json(
      { message: "User ID is undefined after authentication." },
      { status: 500 },
    );
  }

  try {
    await ensureAppTables();
    await pool.query(
      `UPDATE "user"
       SET "phone" = $1,
           "major" = $2,
           "age" = $3,
           "country" = $4,
           "school" = $5,
           "grade" = $6,
           "gender" = $7,
           "shirt" = $8,
           "diet" = $9
       WHERE id = $10`,
      [phone, major, age, country, school, grade, gender, shirt, diet, user.id],
    );

    try {
      if (user?.email) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "YAY, You're Registered!",
          html: `
            <h2>You're officially registered!</h2>
            <p>Thanks for signing up for Citrus Hack 2026.</p>
            <p>We will send more info soon.</p>
          `,
        });

        console.log("Email sent to:", user.email);
      } else {
        console.log("No email found on user object");
      }
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    return Response.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
