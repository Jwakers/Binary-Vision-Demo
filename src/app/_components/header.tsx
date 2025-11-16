import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import LinkIcon from "@/ui/icons/link";
import Search from "@/ui/icons/search";
import Logo from "@/ui/logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-primary absolute inset-x-0 top-0 z-50 w-full border-t-[5px]">
      <div className="mx-auto flex items-center justify-between gap-2 px-7.5">
        <div className="flex items-start">
          <Link href={ROUTES.HOME}>
            <div className="bg-primary flex h-[74px] items-center rounded-br-lg rounded-bl-lg px-5">
              <Logo className="h-auto w-25" />
            </div>
          </Link>
          <Link
            href={ROUTES.CADETS}
            className="bg-background/30 text-tertiary-foreground origin-top-left rounded-br-lg px-5 py-2.5 transition-transform duration-300 hover:scale-105"
          >
            Cadets
          </Link>
        </div>

        <div className="text-background py-4">
          <nav className="text-sm font-semibold">
            <ul className="flex items-center gap-12.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <UnderlinedLink href={item.href}>
                    <span>{item.label}</span>
                  </UnderlinedLink>
                </li>
              ))}
              <li>
                <UnderlinedLink href={ROUTES.SEARCH}>
                  <Search />
                </UnderlinedLink>
              </li>
              <li className="group">
                {/* It seems on the design this is more of a ghost button. 
                For simplicity I'm just leaving this as a standard link
                 so I can focus on the main functionality of the demo. */}
                <UnderlinedLink
                  href={ROUTES.SEARCH}
                  className="relative px-4 py-2"
                >
                  <span>Join the RAF</span>
                  <LinkIcon className="absolute top-0 right-0" />
                </UnderlinedLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Helper component for the underlined transition on links in the header
function UnderlinedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group inline-block", className)}>
      {children}
      <div
        aria-hidden
        className="bg-accent h-[2px] w-0 transition-all duration-300 group-hover:w-full"
      />
    </Link>
  );
}

const NAV_ITEMS = [
  {
    label: "What we do",
    href: ROUTES.WHAT_WE_DO,
  },
  {
    label: "Our organisation",
    href: ROUTES.OUR_ORGANISATION,
  },
  {
    label: "Aircraft",
    href: ROUTES.AIRCRAFT,
  },
  {
    label: "Display teams",
    href: ROUTES.DISPLAY_TEAMS,
  },
  {
    label: "Community & Support ",
    href: ROUTES.COMMUNITY_AND_SUPPORT,
  },
  {
    label: "News",
    href: ROUTES.NEWS,
  },
];
