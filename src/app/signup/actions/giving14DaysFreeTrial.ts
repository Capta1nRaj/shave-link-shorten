'use server'

import paymentsReciptsModel from "@/models/membershipModels/paymentsReciptsModel";
import premiumMembersModel from "@/models/membershipModels/premiumMembersModel";
import pricingPlansModel from "@/models/membershipModels/pricingPlansModel";
import userAccountsModel from "@/models/userAccountsModel";
import NodemailSetup from "@/utils/NodemailSetup";
import { connect2MongoDB } from "connect2mongodb";

export async function giving14DaysFreeTrial(userName: string) {

    await connect2MongoDB();

    //! Giving 14 days free Startup trial to new users
    const now = new Date();
    // Calculate the expiry date by adding the duration
    const expiryDateUTC = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    // Apply the IST offset (330 minutes = 5.5 hours)
    const ISTOffset = 330; // minutes
    const expiryDateIST = new Date(expiryDateUTC.getTime() + (ISTOffset * 60000));

    // Update user role to Startup
    const userData = await userAccountsModel.findOneAndUpdate({ userName }, { userRole: "Startup" }).select('_id userFullName userEmail');

    // Find plan details
    const findPlanDetails = await pricingPlansModel.findOne({ membershipType: "Startup" });

    // Add plan details in membership model
    const membershipID = await new premiumMembersModel({
        userName: userData._id,
        frequency: "Trial",
        membershipType: "Startup",
        membershipPrice: 0,
        monthlyLinks: findPlanDetails.monthlyLinks,
        trackedClicks: findPlanDetails.trackedClicks,
        analyticsRetention: findPlanDetails.analyticsRetention,
        tags: findPlanDetails.tags,
        linkExpirationByDate: findPlanDetails.linkExpirationByDate,
        linkExpirationByClicks: findPlanDetails.linkExpirationByClicks,
        customQRBranding: findPlanDetails.customQRBranding,
        passwordProtectedLinks: findPlanDetails.passwordProtectedLinks,
        discordChatSupport: findPlanDetails.discordChatSupport,
        instantMeetSupport: findPlanDetails.instantMeetSupport,
        expiryDate: expiryDateIST,
    }).save();

    // Create a payments recipt, & membershipID in it
    await new paymentsReciptsModel({
        userName: userData._id,
        frequency: "Trial",
        membershipType: "Startup",
        membershipPrice: 0,
        expiryDate: expiryDateIST,
        paymentDone: true,
        membershipID: membershipID._id,
    }).save();

    //! Send a mail to inform users about their free tier
    // Fetch the Email HTML template code
    const TrialEmaillHTMLTemplate = emailTemplate.replace(/{{userName}}/g, userData.userFullName);

    // Sending mail to user
    await NodemailSetup({ userEmail: userData.userEmail, emailSubject: "Enjoy a 14-Day Free Trial with Shavelinks! 🚀", emailHTMLTemplate: TrialEmaillHTMLTemplate });
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
                <div style="font-size: 28px; color: rgb(20, 27, 47); margin-bottom: 20px;">Your 14-Day Free Shavelinks Membership Starts Now! 🎉</div>
                <div style="font-size: 14px; margin-bottom: 18px; line-height: 1.43">Hi {{userName}},</div>
                <div style="font-size: 16px; margin-bottom: 18px; line-height: 1.43;">We're thrilled to have you on board! 🚀 At Shavelinks, you can shorten your links, track engagement, and boost your business with ease. As a special welcome, enjoy a 14-day free trial of all our premium features. Stay tuned for more exciting updates and features! 🌟</div>
            </div>
            <div style="height: 5px; font-size: 0px; background-color: #1D1E2C"></div>
            <div style="height: 5px; font-size: 0px; background-color: #00ABF0"></div>
            <div style="margin-top: 20px; padding: 5% 4%; background-color: #DBDFEA; border: 1px solid rgb(232, 233, 237)">
                <div style="text-align: center; margin-bottom: 20px">
                    <p style="margin: 0px; font-size: 13px; font-weight: 600; margin-bottom: 7px">Customer Service</p>
                    <p style="margin: 0px; font-size: 11px; line-height: 1.36; color: rgb(114, 118, 130)">Have questions? Please contact: <a href="mailto:contact@priyalraj.com" target="_blank">contact@priyalraj.com</a></p>
                </div>
                <div style="font-size: 0; display:flex; margin: auto; justify-content: center;">
                    <div>
                        <p style="margin: 0px; font-size: 20px; font-weight: 600; white-space: nowrap; color: #1D1E2C;">Follow ShaveLinks</p>
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