export const siteConfig = {
  name: "Sorry Mom Tattoo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Solo tattoo artist in Antipolo City, Rizal. Minimalist, black & grey and illustrative tattoos, plus original designs and merch. Book a session online.",
  phone: "+639298257646",
  email: "sorrymomtatt00@gmail.com",
  address: {
    name: "CAMLON SILKSCREEN PRINTING SERVICES",
    street: "960 Onyx Ln",
    locality: "Antipolo City",
    region: "Rizal",
    postalCode: "1870",
    country: "PH",
    link: "https://maps.app.goo.gl/jgwFcM7n8pnfUiKbA",
  },
  socials: {
    instagram: "https://www.instagram.com/sorrymomtatt00",
    facebook: "https://www.facebook.com/jhomarmusnit12",
    tiktok: "https://www.tiktok.com/@sorrymomtatt00",
  },
} as const;
