import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import SocialProofSection from '@/components/SocialProofSection';
import UrgencySection from '@/components/UrgencySection';
import AwardSection from '@/components/AwardSection';
import CountriesSection from '@/components/CountriesSection';
import TrailSection from '@/components/TrailSection';
import GallerySection from '@/components/GallerySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import fs from 'fs/promises';
import path from 'path';

async function getSiteData() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'site-data.json');
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site data:', error);
    return null;
  }
}

export default async function HomePage() {
  const siteData = await getSiteData();

  return (
    <>
      <Navigation />
      <HeroSection data={siteData?.hero} />
      <IntroSection data={siteData?.introduction} />
      <SocialProofSection />
      <UrgencySection />
      <AwardSection />
      <CountriesSection />
      <TrailSection />
      <GallerySection data={siteData?.gallery} />
      <CTASection />
      <Footer />
    </>
  );
}