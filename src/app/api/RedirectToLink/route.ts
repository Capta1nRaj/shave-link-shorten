import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    //! Connecting to MongoDB
    await connect2MongoDB();

    const searchParams = request.nextUrl.searchParams;

    return NextResponse.json(
        {
            message: "Just A GET Call In RedirectToLink",
            statusCode: 200,
        },
        { status: 200 }
    );

}

export async function POST(request: NextRequest) {

    return NextResponse.json(
        {
            message: "Just A POST Call In RedirectToLink",
            statusCode: 200,
        },
        { status: 200 }
    );
}