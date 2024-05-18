'use server'

export async function RedirectSSR(params: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/RedirectToLink?alias=${params}`, { cache: 'no-store' })
        const data = await response.json(); return data;
    } catch (error) {
        console.error(error); return { primaryURL: "" };
    }
}