import type { NextConfig } from "next";

const r = (source: string, destination: string) => ({ source, destination, permanent: true });

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "16mb" } },
  async headers() {
    return [{ source: "/:path*", headers: security }];
  },
  async redirects() {
    return [
      // Old WordPress URLs
      r("/home-new-layout", "/"),
      r("/actueel", "/over/nieuws"),
      r("/nieuws", "/over/nieuws"),
      r("/team", "/over/team"),
      r("/vacatures", "/over/vacatures"),
      r("/actueel/category/projecten-overzicht", "/projecten"),
      r("/actueel/category/:cat*", "/over/nieuws"),
      r("/actueel/tag/:tag*", "/over/nieuws"),
      r("/actueel/author/:a*", "/over/nieuws"),
      r("/actueel/:year(\\d{4})/:rest*", "/over/nieuws"),
      r("/bestellen", "/shop"),
      r("/verlichting", "/shop"),
      r("/toepassingen", "/"),
      r("/sensoren", "/water-level-sensorstick"),
      r("/partners", "/over"),
      r("/technologie/partners", "/over"),
      r("/presentaties-en-expos", "/contact"),
      r("/instructie-videos", "/shop"),
      r("/brochure-water-level-sensorstick", "/water-level-sensorstick#brochure"),
      r("/brochure-water-level-sensorstick-succes", "/water-level-sensorstick#brochure"),
      r("/brochure-sensorstick", "/water-level-sensorstick#brochure"),
      r("/brochure-sensorstick-technical-specifications", "/water-level-sensorstick#brochure"),
      r("/brochure-sensorstick-technical-specifications-succes", "/water-level-sensorstick#brochure"),
      r("/brochure-soil-moisture-sensorstick", "/bodemvocht-sensorstick#brochure"),
      r("/brochure-soil-moisture-sensorstick-succes", "/bodemvocht-sensorstick#brochure"),
      r("/brochure-sensorstick-waterkwaliteit", "/waterkwaliteit-sensorstick#brochure"),
      r("/brochure-sensorstick-waterquality-succes", "/waterkwaliteit-sensorstick#brochure"),
      r("/waterkwaliteit_en_temperatuur-sensorstick", "/waterkwaliteit-sensorstick"),
      r("/404-2", "/"),
      r("/no-access", "/"),
      r("/wp-admin/:p*", "/beheer"),
      r("/wp-login.php", "/beheer"),
      r("/feed", "/over/nieuws"),
      r("/wp-content/uploads/:p*", "/media/:p*"),
    ];
  },
};

export default nextConfig;
