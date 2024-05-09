import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { logoutOnce } from "email-armor";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const cookieStore = cookies()
        const id = cookieStore.get('id');
        const username = cookieStore.get('userName');
        const jwtToken = cookieStore.get('token');

        cookies().delete('id');
        cookies().delete('userName');
        cookies().delete('token');

        if (!id || !username || !jwtToken) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        await logoutOnce(id.value, username.value, userAgent, jwtToken.value);

        return NextResponse.json({ message: "Logout" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}