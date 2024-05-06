import ClicksListModel from '@/models/clicksListModel';
import linksListModel from '@/models/LinksListModel';
import axios from 'axios';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    //! Connecting to MongoDB
    await connect2MongoDB();

    const searchParams = request.nextUrl.searchParams;
    const alias = searchParams.get('alias');

    const data = await linksListModel.findOneAndUpdate({ alias }, { $inc: { clicksCount: 0 } }).select('-_id userName primaryURL toSupport appOpener');

    if (!data) { return NextResponse.json({ message: "Link not found!", statusCode: 404 }, { status: 200 }); }

    //! Get user IP Address & fetch their country
    const ip = request.headers.get('X-Forwarded-For');
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { data: { query, status, country, countryCode, region, regionName, city, zip, timezone, isp, org, as } } = response;

    await new ClicksListModel({
        userName: data.userName, alias, ip: query, country, countryCode, region, regionName, city, zip, timezone, isp, org, as
    }).save();

    return NextResponse.json({ message: "Link fetched successfully.", statusCode: 200, primaryURL: data.primaryURL, toSupport: data.toSupport, appOpener: data.appOpener }, { status: 200 });
}

export async function POST(request: NextRequest) {

    return NextResponse.json(
        {
            message: "Just A POST Call In RedirectToLink.",
            statusCode: 200,
        },
        { status: 200 }
    );
}