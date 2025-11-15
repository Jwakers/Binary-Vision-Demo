import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import LinkIcon from "@/ui/icons/link";
import Search from "@/ui/icons/search";
import Logo from "@/ui/logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-primary border-t-[5px] absolute top-0 inset-x-0 z-50">
      <div className=" flex gap-2 justify-between items-center mx-auto px-7.5">
        <div className="flex items-start">
          <Link href={ROUTES.HOME}>
            <div className="px-5 h-[74px] bg-primary rounded-br-lg rounded-bl-lg flex items-center">
              <Logo className="w-25 h-auto" />
            </div>
          </Link>
          <Link
            href={ROUTES.CADETS}
            className="bg-background/30 text-tertiary-foreground px-5 py-2.5 rounded-br-lg hover:scale-105 transition-transform duration-300 origin-top-left"
          >
            Cadets
          </Link>
        </div>

        <div className="py-4 text-background">
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
        className="w-0 group-hover:w-full h-[2px] bg-accent transition-all duration-300"
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
