import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { forgotPassword, localSessionCheck, resendOTP } from "email-armor";
import { FetchUserIP } from "@/utils/FetchUserIP";

console.clear();

export async function POST(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await FetchUserIP();

    const { username } = await request.json();

    const response = await forgotPassword(username, userAgent, '', '', userIP);
    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const { status, message, userName } = response;

    return NextResponse.json({ status, message, userName }, { status: 200 });
}

export async function PUT(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await FetchUserIP();

    const { username, userOTP, userNewPassword } = await request.json();

    const response = await forgotPassword(username, userAgent, userOTP, userNewPassword, userIP);

    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const { status, message } = response;

    return NextResponse.json(
        {
            status, message
        },
        { status: 200 }
    );
}