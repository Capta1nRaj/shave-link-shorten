import LinksListModel from '@/models/LinksListModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    //! Connecting to MongoDB
    await connect2MongoDB();

    const searchParams = request.nextUrl.searchParams;
    const alias = searchParams.get('alias');

    const data = await LinksListModel.findOneAndUpdate({ alias }, { $inc: { clicksCounter: 1 } }).select('-_id primaryURL toSupport');

    if (!data) { return NextResponse.json({ message: "Link not found!", statusCode: 404, }, { status: 200 }); }

    return NextResponse.json(
        {
            message: "Link fetched successfully.",
            statusCode: 200,
            primaryURL: data.primaryURL,
            toSupport: data.toSupport

        },
        { status: 200 }
    );

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