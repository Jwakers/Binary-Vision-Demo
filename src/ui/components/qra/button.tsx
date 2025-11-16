import { cn } from "@/lib/utils";

// Given this button is more specialised to the QRA component, I have scoped it into this folder.
// Typically I would have a global button in the ui or main components folder.

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-accent text-accent-foreground relative cursor-pointer rounded-full px-7 py-3 text-3xl font-extrabold uppercase shadow transition-colors",
        "hover:bg-accent/90",
        props.className
      )}
    >
      {children}
    </button>
  );
}
