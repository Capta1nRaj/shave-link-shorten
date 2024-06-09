import contactUsListModel from '@/models/contactUsListModel';
import websiteStatsModel from '@/models/websiteStatsModel';
import sendConfirmationMailToUser from '@/utils/Nodemail/NodemailSetup';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        const websiteStats = await websiteStatsModel.find({}).select('newUsers linksCreated linksClicksCount').lean();

        let usersCount: number = 0;
        let linksCreatedCount: number = 0;
        let linksTrackedCount: number = 0;

        for (let i = 0; i < websiteStats.length; i++) {
            usersCount += websiteStats[i].newUsers
            linksCreatedCount += websiteStats[i].linksCreated
            linksTrackedCount += websiteStats[i].linksClicksCount
        }

        return NextResponse.json({ usersCount, linksCreatedCount, linksTrackedCount, message: "Website stats fetched successfully.", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    return NextResponse.json({ message: "Just A POST call in FetchWebsiteStats.", status: 200 }, { status: 200 });
}