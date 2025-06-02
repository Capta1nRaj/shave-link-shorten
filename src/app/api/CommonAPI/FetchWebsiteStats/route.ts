import websiteStatsModel from '@/models/websiteStatsModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET() {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        //! Fetching website stats
        const websiteStats = await websiteStatsModel.find({}).select('newUsers linksCreated linksClicksCount').lean();

        //! Declaring variables to calculate website stats
        let usersCount: number = 0;
        let linksCreatedCount: number = 0;
        let linksTrackedCount: number = 0;

        //! Calculating the website stats
        for (let i = 0; i < websiteStats.length; i++) {
            usersCount += websiteStats[i].newUsers
            linksCreatedCount += websiteStats[i].linksCreated
            linksTrackedCount += websiteStats[i].linksClicksCount
        }

        //! Sending response to the client
        return NextResponse.json({ usersCount, linksCreatedCount, linksTrackedCount, message: "Website stats fetched successfully.", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    await request.json();
    return NextResponse.json({ message: "Just A POST call in FetchWebsiteStats.", status: 200 }, { status: 200 });
}