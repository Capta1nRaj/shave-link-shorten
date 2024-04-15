import LinksListModel from '@/models/LinksListModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    //! Connecting to MongoDB
    await connect2MongoDB();

    const searchParams = request.nextUrl.searchParams;
    const alias = searchParams.get('alias');

    //! Check if primaryURL is already present
    const checkIfAliasExist = await LinksListModel.findOne({ alias }).select('-_id alias clicksCount');

    if (checkIfAliasExist) { return NextResponse.json({ message: `Total clicks: ${checkIfAliasExist.clicksCount}`, statusCode: 200 }, { status: 200 }); }

    return NextResponse.json({ message: "No alias found.", statusCode: 404 }, { status: 200 });
}
