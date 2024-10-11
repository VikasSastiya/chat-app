import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p> Click <a href="${resetLink}"> here </a> to reset password. </p>`
    });
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "confirm your email",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
        });

        console.log("email sent: ", response);
    } catch (error) {
        console.log("error sending email: ", error);
    }
}