import { NextResponse, type NextRequest } from "next/server";
import { resendOTP, signup, signUpVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        const userIP = await FetchUserIP();

        const { userName, method } = await request.json();

        const cookieStore = cookies();
        let id = cookieStore.get('id')?.value || "";

        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const response = await resendOTP(userName, method, userAgent, id || "", userIP);

        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { message, status } = response;

        return NextResponse.json({ status, message }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}