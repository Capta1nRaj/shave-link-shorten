import FooterLayout from "@/layouts/FooterLayout";
import HeroLayout from "@/layouts/HeroLayout";
import KeyFeaturesOfShavelinksLayout from "@/layouts/KeyFeaturesOfShavelinksLayout";
import NavBarLayout from "@/layouts/NavBarLayout";
import PricingLayout from "@/layouts/PricingLayout";
import WebsiteStatsLayout from "@/layouts/WebsiteStatsLayout";

export default function Home() {
  return (
    <>
      <NavBarLayout />
      <HeroLayout />
      <KeyFeaturesOfShavelinksLayout />
      <PricingLayout />
      <WebsiteStatsLayout />
      <FooterLayout footerColor="bg-custom-dark" />
    </>
  );
}
