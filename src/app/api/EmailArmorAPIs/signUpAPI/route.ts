import { NextResponse, type NextRequest } from "next/server";
import { signup, signUpVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";
import { getWeekNumber, getMonthNumber, getYearNumber } from "@/utils/DateFunctions";
import userAccountsModel from "@/models/userAccountsModel";
import userLinksDataModel from "@/models/userLinksDataModel";
import websiteStatsModel from "@/models/websiteStatsModel";
import fs from 'fs';
import path from 'path';
import NodemailSetup from "@/utils/NodemailSetup";

const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const userIP = await FetchUserIP();

        const { userFullName, userName, userEmail, userPassword, userReferredBy } = await request.json();

        const response = await signup(userFullName, userName, userEmail, userPassword, userReferredBy, userAgent, userIP, 'Free Forever');

        const { message, status } = response;

        if ([400, 500, 401, 206].includes(status) || !response.userName) { return NextResponse.json({ status, message }, { status: 200 }); }

        cookies().set('userName', response.userName);

        return NextResponse.json({ status, message }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function PUT(request: NextRequest) {
    try {

        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { userName, OTP } = await request.json();

        const response = await signUpVerify(userName, OTP, userAgent);
        console.log(response) //* Don't Delete it
        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // id, userName, signedJWTToken,
        if ([400, 500].includes(response.status)) { return NextResponse.json({ status: response.status, message: response.message }, { status: 200 }); }

        const getUserId = await userAccountsModel.findOne({ userName }).select("_id userFullName userEmail");
        await new userLinksDataModel({
            userName: getUserId._id
        }).save();

        console.log(getUserId) //* Don't Delete it

        // Increment active users count for current week, month, & year
        const updateWebsiteStats = await websiteStatsModel.updateOne({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber() }, { $inc: { newUsers: 1 } });
        if (updateWebsiteStats.matchedCount === 0) {
            await new websiteStatsModel({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber(), newUsers: 1 }).save();
        }

        // Expire cookies in 365 days
        cookies().set("userName", userName, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("id", response.id, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        //@ts-ignore because signedJWTToken will be sent otherwise check the package for the issue
        cookies().set("token", response.signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        //! Sending an welcome email
        // Fetch the Email HTML template code
        const emailHTMLTemplate = getEmailTemplate().replace(/{{username}}/g, getUserId.userFullName);

        // Sending mail to user
        await NodemailSetup({ userEmail: getUserId.userEmail, emailSubject: "Welcome to Shavelinks! Shorten Links, Track Engagement, Boost Your Business", emailHTMLTemplate });

        return NextResponse.json({ status: response.status, message: response.message }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

//! Fetch contact us email template
function getEmailTemplate() {
    const filePath = path.join(process.cwd(), 'src', 'utils', 'NodemailEmailTemplates', './SignUpWelcomeEmailTemplate.html');
    return fs.readFileSync(filePath, 'utf-8');
}