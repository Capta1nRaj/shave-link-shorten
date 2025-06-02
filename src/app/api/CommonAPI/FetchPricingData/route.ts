import pricingPlansModel from '@/models/membershipModels/pricingPlansModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET() {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        //! Fetching pricing plans
        const pricingData = await pricingPlansModel.findOne({}).lean();

        //! Sending response to the client
        return NextResponse.json({ pricingData, message: "OK!", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    console.info(data);
    return NextResponse.json({ message: "Just A POST call in FetchWebsiteStats.", status: 200 }, { status: 200 });
}