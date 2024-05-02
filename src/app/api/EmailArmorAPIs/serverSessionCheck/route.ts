import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";
import { serverSessionCheck } from "email-armor";

export async function GET(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await FetchUserIP();

    const cookieStore = cookies()
    const username = cookieStore.get('userName')
    const jwtToken = cookieStore.get('token')
    const id = cookieStore.get('id');
    if (!username || !jwtToken || !id) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const response = await serverSessionCheck(username.value, id.value, jwtToken.value, userAgent);

    const { status, message, userName } = response;

    return NextResponse.json(
        {
            status, message, userName
        },
        { status: 200 }
    );
}