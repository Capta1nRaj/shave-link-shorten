import FooterLayout from "@/layouts/FooterLayout";
import HeroLayout from "@/layouts/HeroLayout";
import KeyFeaturesOfShavelinksLayout from "@/layouts/KeyFeaturesOfShavelinksLayout";
import NavBarLayout from "@/layouts/NavBarLayout";
import PricingLayout from "@/layouts/PricingLayout";
import WebsiteStatsLayout from "@/layouts/WebsiteStatsLayout";

export default async function Home() {

  let usersCount = 0;
  let linksCreatedCount = 0;
  let linksTrackedCount = 0;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/CommonAPI/FetchWebsiteStats`, { next: { revalidate: 86400 } });
    const { usersCount: fetchedUsers, linksCreatedCount: fetchedLinks, linksTrackedCount: fetchedTracked } = await response.json();
    usersCount = fetchedUsers || 0;
    linksCreatedCount = fetchedLinks || 0;
    linksTrackedCount = fetchedTracked || 0;
  } catch (error) {
    console.error(error);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/CommonAPI/FetchPricingData`, { next: { tags: ['pricingTag'] } });
  const { pricingData } = await res.json();

  return (
    <>
      <NavBarLayout />
      <HeroLayout />
      <KeyFeaturesOfShavelinksLayout />
      <PricingLayout pricingData={pricingData} />
      <WebsiteStatsLayout usersCount={usersCount} linksCreatedCount={linksCreatedCount} linksTrackedCount={linksTrackedCount} />
      <FooterLayout footerColor="bg-custom-dark" />
    </>
  );
}
