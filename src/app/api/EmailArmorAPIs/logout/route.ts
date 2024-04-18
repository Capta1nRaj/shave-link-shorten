import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { localSessionCheck, logoutOnce } from "email-armor";
import { FetchUserIP } from "@/utils/FetchUserIP";

console.clear();

export async function GET(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await FetchUserIP();

    cookies().delete('id')
    cookies().delete('userName')
    cookies().delete('token')

    // const response = await logoutOnce(id.value, userName.value, userAgent, token.value);

    return NextResponse.json(
        {
            message: "Logout"
        },
        { status: 200 }
    );
}