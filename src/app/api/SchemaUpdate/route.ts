import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { secretPassword, toChange } = await request.json();

        if (secretPassword !== process.env.SECRET_CODE_FOR_PRIVATE_APIS) {
            return NextResponse.json({ message: "Just A POST call in /api/SchemaUpdate.", status: 401 }, { status: 200 });
        }

        //! Connecting to MongoDB
        await connect2MongoDB();

        //! Sending response to the client
        return NextResponse.json({ message: "Schema updated!", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}