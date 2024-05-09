import linksListModel from '@/models/LinksListModel';
import RandomStringGenerator from '@/utils/RandomStringGenerator';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        const { primaryURL, toSupport } = await request.json();

        //! Check if primaryURL is already present
        const checkIfPrimaryURLExist = await linksListModel.findOneAndUpdate({ primaryURL }, { toSupport }).select('-_id alias');

        if (checkIfPrimaryURLExist) { return NextResponse.json({ message: "URL already exist!", statusCode: 409, data: checkIfPrimaryURLExist }, { status: 200 }); }

        const alias = await generateAndCheckAlias();

        const data = await new linksListModel({ primaryURL, alias, toSupport }).save();
        const responseData = { alias: data.alias };

        return NextResponse.json({ message: "URL shortened.", statusCode: 200, data: responseData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

async function generateAndCheckAlias() {
    try {
        const alias = await RandomStringGenerator(6);

        //! Check if alias is already present
        const checkIfAliasExist = await linksListModel.exists({ alias });
        if (checkIfAliasExist) { return generateAndCheckAlias(); }

        return alias;
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}