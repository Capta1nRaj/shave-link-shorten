import { NextResponse, type NextRequest } from "next/server";
import { cookies, headers } from 'next/headers'
import { localSessionCheck } from "email-armor";
import { DeleteCookie } from "@/utils/DeleteCookie";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        //! Fetching headers for verification
        const headersList = headers();
        const username = headersList.get('userName');
        const jwtToken = headersList.get('token');

        if (!username || !jwtToken) { await DeleteCookie(); return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const response = await localSessionCheck(username, jwtToken, userAgent);

        const { status, message, userName } = response;

        if (status === 400) { await DeleteCookie(); }

        return NextResponse.json({ status, message, userName }, { status: 200 });
    } catch (error) {
        console.error(error);
        await DeleteCookie();
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}