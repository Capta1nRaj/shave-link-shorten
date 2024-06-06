import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { logoutOnce } from "email-armor";
import { DeleteCookie } from "@/utils/DeleteCookie";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const cookieStore = cookies()
        const id = cookieStore.get('id');
        const username = cookieStore.get('userName');
        const jwtToken = cookieStore.get('token');

        await DeleteCookie();

        if (!id || !username || !jwtToken) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        await logoutOnce(id.value, username.value, userAgent, jwtToken.value);

        return NextResponse.json({ message: "Logout" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        return NextResponse.json({ message: "Hello" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}