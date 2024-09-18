import { NextResponse, type NextRequest } from "next/server";
import { forgotPassword, updatePassword } from "email-armor";
import { FetchUserIP } from "@/utils/FetchUserIP";


export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }
        const userIP = await FetchUserIP();

        const { username } = await request.json();

        let response = { message: "", status: 0 };

        if (username.includes('@')) {
            const signInResponse = await forgotPassword(username, '', userAgent, userIP);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await forgotPassword('', username, userAgent, userIP);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        }

        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { status, message } = response;

        if (status !== 201) { return NextResponse.json({ message, status }, { status: 200 }); }

        return NextResponse.json({ message, status }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { username, userOTP, userNewPassword } = await request.json();

        let response = { message: "", status: 0 };

        if (username.includes('@')) {
            const signInResponse = await updatePassword(username, '', userAgent, userOTP, userNewPassword);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await updatePassword('', username, userAgent, userOTP, userNewPassword);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        }

        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { status, message } = response;

        if (status !== 201) { return NextResponse.json({ message, status }, { status: 200 }); }

        return NextResponse.json({ message, status }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}