import { siteConfig, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900 bg-black px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center text-sm text-neutral-500">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
        <a
          href={whatsappUrl(
            "¡Hola M&J! Me gustaría obtener más información sobre sus servicios."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 transition-colors hover:text-white"
        >
          Contáctanos por WhatsApp
        </a>
      </div>
    </footer>
  );
}
