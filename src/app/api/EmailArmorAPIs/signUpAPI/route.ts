import { NextResponse, type NextRequest } from "next/server";
import { signUp } from 'email-armor'
import { cookies } from 'next/headers'
import { getWeekNumber, getMonthNumber, getYearNumber } from "@/utils/DateFunctions";
import userAccountsModel from "@/models/userAccountsModel";
import userAccountDataModel from "@/models/userAccountDataModel";
import websiteStatsModel from "@/models/websiteStatsModel";
import userMonthlyStats from "@/models/userMonthlyStats";
import { connect2MongoDB } from "connect2mongodb";

const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export async function POST(request: NextRequest) {
    try {

        // Retrieve user-agent header to check if request is from a legitimate source
        const userAgent = request.headers.get('user-agent');
        // If no user-agent is provided, return an internal server error
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // Destructure the incoming request body to get user information
        const { userFullName, userName, userEmail, userPassword, userReferredBy } = await request.json();

        if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true') {
            await connect2MongoDB();
            await userAccountsModel.deleteOne({ userEmail });
        }

        // Call the signUp function with user details, default role 'Free Forever', and referral code if provided, otherwise 'Captain'
        const response = await signUp(userFullName, userName, userEmail, userPassword, userReferredBy || "Captain", userAgent, 'Free Forever');

        // Destructure the response to get the message and status returned by the signUp function
        const { message, status } = response;

        // If sign-up was unsuccessful (status not 202), return the message and status
        if (status !== 202) { return NextResponse.json({ message, status }, { status: 200 }); }

        //* Set cookies for user information: userName, id, and JWT token
        // Cookies will expire in 365 days
        cookies().set("userName", userName, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("id", response.id, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore because signedJWTToken will be sent, ignore TypeScript check for this line
        cookies().set("token", response.signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        //* Creting user links data document
        const getUserId = await userAccountsModel.findOne({ userName }).select("_id userFullName userEmail");
        await new userAccountDataModel({ userName: getUserId._id }).save();

        //* Starting billing cycle of user once they signup
        await new userMonthlyStats({ userName: getUserId._id }).save();

        //* Update website statistics to increment new user count for the current week, month, and year
        const updateWebsiteStats = await websiteStatsModel.updateOne({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber() }, { $inc: { newUsers: 1 } });
        // If no matching document is found, create a new record for the current time period with 1 new user
        if (updateWebsiteStats.matchedCount === 0) { await new websiteStatsModel({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber(), newUsers: 1 }).save(); }

        // Return a successful response with the sign-up message and status
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        // In case of any error, return an internal server error message
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}