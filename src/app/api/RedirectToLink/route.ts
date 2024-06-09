import clicksTrackingModel from '@/models/clicksTrackingModel';
import linksListModel from '@/models/linksListModel';
import websiteStatsModel from '@/models/websiteStatsModel';
import { getMonthNumber, getWeekNumber, getYearNumber } from '@/utils/DateFunctions';
import { FetchUserIP } from '@/utils/FetchUserIP';
import axios from 'axios';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest, userAgent } from 'next/server';

export async function GET(request: NextRequest) {
    try {

        const { browser, os, device, isBot } = userAgent(request)

        //! Connecting to MongoDB
        await connect2MongoDB();

        const searchParams = request.nextUrl.searchParams;
        const alias = searchParams.get('alias');

        const data = await linksListModel.findOne({ alias }).select('userName destinationURL toSupport appOpener appType status');
        if (!data) { return NextResponse.json({ message: "Link not found!", statusCode: 404 }, { status: 200 }); }

        // //! Get user IP Address & fetch their country
        const ip = await FetchUserIP();

        const response = await axios.get(`http://ip-api.com/json/${ip}`);

        const { data: { query, status, country, countryCode, region, regionName, city, zip, timezone, isp, org, as } } = response;

        if (status) {
            await new clicksTrackingModel({
                userName: data.userName,
                alias: data._id,
                ip: query,
                countryName: country,
                countryCode,
                stateCode: region,
                stateName: regionName,
                cityName: city,
                zip,
                timezone,
                isp,
                org,
                as,
                browser: browser.name,
                os: os.name,
                device: device.type || "Windows"
            }).save();

            await linksListModel.updateMany({ alias }, { $inc: { clicksCount: 1 } });

            //! Increment link click count for current week, month, & year
            const updateWebsiteStats = await websiteStatsModel.updateOne({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber() }, { $inc: { linksClicksCount: 1 } });

            if (updateWebsiteStats.matchedCount === 0) {
                await new websiteStatsModel({ weekNumber: getWeekNumber(), monthNumber: getMonthNumber(), yearNumber: getYearNumber(), linksClicksCount: 1 }).save();
            }
        }

        return NextResponse.json({ message: "Link fetched successfully.", statusCode: 200, destinationURL: data.destinationURL, toSupport: data.toSupport, appOpener: data.appOpener, status: data.status }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    return NextResponse.json({ message: "Just A POST Call In RedirectToLink.", statusCode: 200, }, { status: 200 });
}