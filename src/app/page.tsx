import FooterLayout from "@/layouts/FooterLayout";
import HeroLayout from "@/layouts/HeroLayout";
import KeyFeaturesOfShavelinksLayout from "@/layouts/KeyFeaturesOfShavelinksLayout";
import NavBarLayout from "@/layouts/NavBarLayout";
import PricingLayout from "@/layouts/PricingLayout";
import WebsiteStatsLayout from "@/layouts/WebsiteStatsLayout";

export default async function Home() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/CommonAPI/FetchWebsiteStats`, { next: { revalidate: 86400 } });
  const { usersCount, linksCreatedCount, linksTrackedCount } = await response.json();

  return (
    <>
      <NavBarLayout />
      <HeroLayout />
      <KeyFeaturesOfShavelinksLayout />
      <PricingLayout />
      <WebsiteStatsLayout usersCount={usersCount} linksCreatedCount={linksCreatedCount} linksTrackedCount={linksTrackedCount} />
      <FooterLayout footerColor="bg-custom-dark" />
    </>
  );
}
