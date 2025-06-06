import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Choose your preferred app name from suggestions above
const APP_NAME = "MessageHub"; 

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    const logoUrl = '/MessageHub-logo.png';

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                <div style="margin: 0 auto 20px;">
                    <img src="${logoUrl}" alt="${APP_NAME}" width="80" height="80" style="display: block; margin: 0 auto;">
                </div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">${APP_NAME}</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Password Reset Request</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #2d3748; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                <p style="color: #4a5568; line-height: 1.6; margin: 0 0 25px; font-size: 16px;">
                    We received a request to reset your password for your ${APP_NAME} account. Click the button below to create a new password.
                </p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                        Reset Password
                    </a>
                </div>
                
                <p style="color: #718096; font-size: 14px; line-height: 1.5; margin: 25px 0 0;">
                    This link will expire in 1 hour for security reasons. If you didn't request this password reset, you can safely ignore this email.
                </p>
                
                <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 15px; margin: 25px 0; border-radius: 4px;">
                    <p style="color: #4a5568; margin: 0; font-size: 14px;">
                        <strong>Security tip:</strong> Never share your password or this reset link with anyone.
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; margin: 0; font-size: 14px;">
                    Need help? Contact us at <a href="mailto:support@MessageHub.in" style="color: #667eea; text-decoration: none;">support@MessageHub.in</a>
                </p>
                <p style="color: #a0aec0; margin: 10px 0 0; font-size: 12px;">
                    © 2024 ${APP_NAME}. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    await resend.emails.send({
        from: "MessageHub@xlnce.xyz",
        to: email,
        subject: `🔐 Reset your ${APP_NAME} password`,
        html: htmlTemplate,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const logoUrl = '/MessageHub-logo.png';

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 20px; text-align: center;">
                <div style="margin: 0 auto 20px;">
                    <img src="${logoUrl}" alt="${APP_NAME}" width="80" height="80" style="display: block; margin: 0 auto;">
                </div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">${APP_NAME}</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Welcome to the community!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #2d3748; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                <p style="color: #4a5568; line-height: 1.6; margin: 0 0 25px; font-size: 16px;">
                    Welcome to ${APP_NAME}! We're excited to have you join our community. To complete your registration and start chatting, please verify your email address.
                </p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="${confirmLink}" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4); transition: all 0.3s ease;">
                        Verify Email Address
                    </a>
                </div>
                
                <div style="background-color: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #22543d; margin: 0 0 10px; font-size: 16px; font-weight: 600;">What's next?</h3>
                    <ul style="color: #2f855a; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Start chatting with friends and colleagues</li>
                        <li>Create or join group conversations</li>
                        <li>Share files and media seamlessly</li>
                        <li>Customize your profile and preferences</li>
                    </ul>
                </div>
                
                <p style="color: #718096; font-size: 14px; line-height: 1.5; margin: 25px 0 0;">
                    This verification link will expire in 24 hours. If you didn't create an account with ${APP_NAME}, you can safely ignore this email.
                </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; margin: 0; font-size: 14px;">
                    Questions? We're here to help at <a href="mailto:support@MessageHub.in" style="color: #48bb78; text-decoration: none;">support@MessageHub.in</a>
                </p>
                <p style="color: #a0aec0; margin: 10px 0 0; font-size: 12px;">
                    © 2024 ${APP_NAME}. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    try {
        const response = await resend.emails.send({
            from: "MessageHub@xlnce.xyz",
            to: email,
            subject: `🎉 Welcome to ${APP_NAME} - Verify your email`,
            html: htmlTemplate,
        });

        console.log("✅ Verification email sent successfully:", response);
        return { success: true, data: response };
    } catch (error) {
        console.error("❌ Error sending verification email:", error);
        return { success: false, error };
    }
};
