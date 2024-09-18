'use server'

import userAccountsModel from "@/models/userAccountsModel";
import NodemailSetup from "@/utils/NodemailSetup";
import { connect2MongoDB } from "connect2mongodb";

export async function sendingWelcomeEmail(userName: string) {

    await connect2MongoDB();

    const getUserData = await userAccountsModel.findOne({ userName }).select('userFullName userName userEmail');

    //! Sending an welcome email
    // Fetch the Email HTML template code
    const signUpEmaillHTMLTemplate = emailTemplate.replace(/{{userName}}/g, getUserData.userFullName);

    // Sending mail to user
    await NodemailSetup({ userEmail: getUserData.userEmail, emailSubject: "Welcome to Shavelinks! Shorten Links, Track Engagement, Boost Your Business", emailHTMLTemplate: signUpEmaillHTMLTemplate });
}

const emailTemplate = `
<div style="width: 100%; margin: auto; font-size: 14px;">
    <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; width: 0"></span>
    <div style="background-color: #FFFFFF; padding-top: 15px; padding-bottom: 15px">
        <div style="width: 96%; margin: auto; max-width: 600px">
            <div style="display: flex; padding: 2% 5%; background-color: #1D1E2C; border: 1px solid rgb(232, 233, 237)">
                <a href='https://shavelinks.com/' target="_blank">
                    <img src='https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/CompanyLogo1.png' alt="shavelinks" style="width: 120px" />
                </a>
            </div>
            <div style="padding: 5%; text-align: left; background-color: #DBDFEA; border: 1px solid rgb(232, 233, 237); overflow: hidden">
                <div style="font-size: 28px; color: rgb(20, 27, 47); margin-bottom: 20px;">Welcome to Shavelinks!</div>
                <div style="font-size: 14px; margin-bottom: 18px; line-height: 1.43">Hi {{userName}},</div>
                <div style="font-size: 16px; margin-bottom: 18px; line-height: 1.43;">We're thrilled to have you on board! 🚀 At Shavelinks, you can shorten your links, track engagement, and boost your business with ease. Stay tuned for more exciting features and updates! 🌟</div>
            </div>
            <div style="height: 5px; font-size: 0px; background-color: #1D1E2C"></div>
            <div style="height: 5px; font-size: 0px; background-color: #00ABF0"></div>
            <div style="margin-top: 20px; padding: 5% 4%; background-color: #DBDFEA; border: 1px solid rgb(232, 233, 237)">
                <div style="text-align: center; margin-bottom: 20px">
                    <p style="margin: 0px; font-size: 13px; font-weight: 600; margin-bottom: 7px">Customer Service</p>
                    <p style="margin: 0px; font-size: 11px; line-height: 1.36; color: rgb(114, 118, 130)"> Have questions? Please contact: <a href="mailto:contact@priyalraj.com" target="_blank">contact@priyalraj.com</a></p>
                </div>
                <div style="font-size: 0; display:flex; margin: auto; justify-content: center;">
                    <div>
                        <p style="margin: 0px; font-size: 20px; font-weight: 600; white-space: nowrap; color: #1D1E2C;">Follow ShaveLinks </p>
                        <ul style="display:flex; margin: auto; justify-content: center; list-style: none; margin: 0 0 0 -4px; padding: 0; font-size: 0">
                            <li style="display: inline-block; vertical-align: top; margin: 0; padding: 0; width: 22%; max-width: 40px">
                                <a href='https://shavel.ink/shavelinkstwitter' style="display: block" target="_blank">
                                    <img src='https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000' alt="shavelinks" style="display: block; max-width: 100%; width: 100%; height: auto" />
                                </a>
                            </li>
                            <li style="display: inline-block; vertical-align: top; margin: 0; padding: 0; width: 22%; max-width: 40px">
                                <a href='https://shavel.ink/shavelinksinstagram' style="display: block" target="_blank">
                                    <img src='https://img.icons8.com/?size=100&id=32323&format=png&color=000000' alt="shavelinks" style="display: block; max-width: 100%; width: 100%; height: auto" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
`