import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { serverSessionCheck } from "email-armor";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const cookieStore = cookies()
        const id = cookieStore.get('id');
        const username = cookieStore.get('userName')
        const jwtToken = cookieStore.get('token')

        if (!id || !username || !jwtToken) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const response = await serverSessionCheck(username.value, id.value, jwtToken.value, userAgent);

        const { status, message, userName } = response;

        return NextResponse.json({ status, message, userName }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        return NextResponse.json({ message: "Hello" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}