import linksListModel from '@/models/linksListModel';
import RandomStringGenerator from '@/utils/RandomStringGenerator';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        const { destinationURL, toSupport } = await request.json();

        //! Check if destinationURL is already present
        const checkIfdestinationURLExist = await linksListModel.findOneAndUpdate({ destinationURL }, { toSupport }).select('-_id alias');

        if (checkIfdestinationURLExist) { return NextResponse.json({ message: "URL already exist!", statusCode: 409, data: checkIfdestinationURLExist }, { status: 200 }); }

        const alias = await generateAndCheckAlias();

        const data = await new linksListModel({ destinationURL, alias, toSupport }).save();
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