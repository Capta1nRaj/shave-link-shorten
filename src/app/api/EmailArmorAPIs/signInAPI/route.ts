import { NextResponse, type NextRequest } from "next/server";
import { resendOTP, signIn, signInVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";
const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

if (!process.env.COOKIE_DOMAIN) {
    throw new Error("COOKIE_DOMAIN env is not defined!")
}

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }
        const userIP = await FetchUserIP();

        const { username, userpassword } = await request.json();

        const response = await signIn(username, userpassword, userAgent, userIP);

        const { status, message, userName, id } = response;

        if ([400, 401, 403].includes(status) || !userName) { return NextResponse.json({ status, message }, { status: 200 }); }

        //! Expire cookies in 365 days
        cookies().set("userName", userName, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("id", id, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        return NextResponse.json({ status, message }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { username, OTP } = await request.json();

        const cookieStore = cookies()
        const id = cookieStore.get('id')
        if (!id) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const response = await signInVerify(username, OTP, id.value, userAgent);

        const { status, message, signedJWTToken } = response;

        if ([400, 401].includes(status) || !signedJWTToken) { return NextResponse.json({ status, message }, { status: 200 }); }

        //! Expire cookies in 365 days
        cookies().set("token", signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        return NextResponse.json({ status, message }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}