'use server'

export async function FetchWebsiteStats() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/CommonAPI/FetchWebsiteStats`, { next: { revalidate: 86400 } })
    const { usersCount, linksCreatedCount, linksTrackedCount } = await response.json();
    return { usersCount, linksCreatedCount, linksTrackedCount };
}