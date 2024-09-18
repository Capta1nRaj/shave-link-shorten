import { NextResponse, type NextRequest } from "next/server";
import { signIn } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";
const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

if (!process.env.COOKIE_DOMAIN) { throw new Error("COOKIE_DOMAIN env is not defined!") }

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { username, userpassword } = await request.json();

        let response = { id: "", userName: "", signedJWTToken: "", message: "", status: 0 };

        const userIP = await FetchUserIP();

        if (username.includes('@')) {
            const signInResponse = await signIn(username, '', userpassword, userAgent, userIP);
            response = {
                id: signInResponse.id || "",
                userName: signInResponse.userName || "",
                signedJWTToken: signInResponse.signedJWTToken || "",
                message: signInResponse.message || "",
                status: signInResponse.status
            };
        } else {
            const signInResponse = await signIn('', username, userpassword, userAgent, userIP);
            response = {
                id: signInResponse.id || "",
                userName: signInResponse.userName || "",
                signedJWTToken: signInResponse.signedJWTToken || "",
                message: signInResponse.message || "",
                status: signInResponse.status
            };
        }

        const { id, userName, signedJWTToken, status, message } = response;

        if (status !== 202) { return NextResponse.json({ message, status }, { status: 200 }); }

        //! Expire cookies in 365 days
        cookies().set("id", id, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("userName", userName, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("token", signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}