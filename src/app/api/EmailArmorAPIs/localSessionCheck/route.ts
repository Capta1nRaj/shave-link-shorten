import { NextResponse, type NextRequest } from "next/server";
import { localSessionCheck } from "email-armor";
import { DeleteCookie } from "@/utils/DeleteCookie";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const userNameCookie = cookies().get('userName');
        const jwtToken = cookies().get('token');

        if (!userNameCookie || !jwtToken) { await DeleteCookie(); return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const response = await localSessionCheck(userNameCookie.value, jwtToken.value, userAgent);

        const { status, message } = response;

        if (status === 400) { await DeleteCookie(); }

        return NextResponse.json({ status, message, userName: userNameCookie.value }, { status: 200 });
    } catch (error) {
        console.error(error);
        await DeleteCookie();
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.info(data);
        return NextResponse.json({ message: "Hello" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}