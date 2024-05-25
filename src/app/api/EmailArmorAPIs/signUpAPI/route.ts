import { NextResponse, type NextRequest } from "next/server";
import { signup, signUpVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";
import websiteStatsModel from "@/models/websiteStatsModel";
import { getWeekNumber, getMonthNumber, getYearNumber } from "@/utils/DateFunctions";
import userAccountsModel from "@/models/userAccountsModel";
import userLinksListModel from "@/models/userLinksListModel";

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const userIP = await FetchUserIP();

        const { userFullName, userName, userEmail, userPassword, userReferredBy } = await request.json();

        const response = await signup(userFullName, userName, userEmail, userPassword, userReferredBy, userAgent, userIP, 'merchant');

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
        const { userName, OTP } = await request.json();

        const response = await signUpVerify(userName, OTP);
        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { message, status } = response;

        if ([400, 500].includes(status)) { return NextResponse.json({ status, message }, { status: 200 }); }

        const getUserId = await userAccountsModel.findOne({ userName }).select("_id");
        await new userLinksListModel({
            userName: getUserId._id
        }).save();

        //! Increment active users count for current week, month, & year
        const updateWebsiteStats = await websiteStatsModel.updateOne({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber() }, { $inc: { activeUsers: 1 } });
        if (updateWebsiteStats.matchedCount === 0) {
            await websiteStatsModel({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber(), activeUsers: 1 }).save();
        }

        return NextResponse.json({ status, message }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}