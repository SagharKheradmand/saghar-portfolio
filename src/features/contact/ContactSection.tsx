import { Section } from "../../components/layout/Section";
import { ArrowUpRight } from "lucide-react";
import { useContact } from "./use-contact";

function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function ContactSection() {
  const state = useContact();
  const email = state.status === "ready" ? state.data.email?.trim() : null;
  const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  const links =
    state.status === "ready"
      ? state.data.links.filter((link) => link.label.trim() && isWebUrl(link.url.trim()))
      : [];

  return (
    <Section id="contact" title="Contact">
      <div aria-busy={state.status === "loading"}>
        {state.status === "loading" && (
          <p role="status" className="border-t border-rule pt-8 text-muted-ink">
            Loading contact details…
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="border-t border-rule pt-8 text-muted-ink">
            Contact details could not be loaded.
          </p>
        )}
        {state.status === "ready" && !validEmail && links.length === 0 && (
          <div className="border-t border-rule pt-8">
            <p className="font-display text-4xl leading-tight text-ink">
              The contact index is empty.
            </p>
            <p className="mt-5 text-muted-ink">No contact details are available yet.</p>
          </div>
        )}
        {state.status === "ready" && (validEmail || links.length > 0) && (
          <ul className="border-t border-rule">
            {validEmail && (
              <li className="border-b border-rule py-8">
                <span className="text-xs font-semibold tracking-[0.18em] text-muted-ink uppercase">
                  Email
                </span>
                <a
                  className="group mt-3 flex w-fit max-w-full items-center gap-3 break-all font-display text-3xl leading-tight text-blue transition-colors hover:text-blue-hover hover:underline min-[900px]:text-4xl"
                  href={`mailto:${validEmail}`}
                >
                  {validEmail}
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )}
            {links.map((link) => (
              <li key={`${link.label}-${link.url}`} className="border-b border-rule py-8">
                <a
                  className="group inline-flex min-h-11 items-center gap-3 font-display text-4xl leading-tight text-blue transition-colors hover:text-blue-hover hover:underline min-[900px]:text-5xl"
                  href={link.url.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label.trim()}
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <p className="mt-2 break-all text-sm text-muted-ink">{link.url.trim()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
