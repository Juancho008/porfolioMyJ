export const siteConfig = {
  name: "M&J",
  title: "M&J | Desarrollo Web y Marketing Digital",
  description:
    "M&J desarrolla sitios web modernos, estrategias de marketing digital y soluciones tecnológicas para hacer crecer tu negocio en Argentina.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://myj-marketing.vercel.app",
  locale: "es_AR",
  whatsapp: "5491122532761",
  whatsappDisplay: "+54 9 11 2253-2761",
  keywords: [
    "desarrollo web",
    "marketing digital",
    "diseño web",
    "páginas web Argentina",
    "agencia digital",
    "M&J",
  ],
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
