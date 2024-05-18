'use server'

import { cookies } from 'next/headers';

export async function DeleteCookie() {
    cookies().set("id", "", { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: new Date(0) });
    cookies().set("userName", "", { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: new Date(0) });
    cookies().set("token", "", { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: new Date(0) });
}