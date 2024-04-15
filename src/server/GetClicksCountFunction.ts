'use server'

export async function GetClicksCountFunction(alias: string) {
    console.log(alias)
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/GetLinkCount?alias=${alias}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}