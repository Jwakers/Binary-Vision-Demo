import { cn } from "@/lib/utils";

// Given this button is more specialised to the QRA component, I have scoped it into this folder.
// Typically I would have a global button in the ui or main components folder.

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "relative cursor-pointer rounded-full font-extrabold bg-accent hover:bg-accent/90 text-accent-foreground text-3xl px-7 py-3 shadow uppercase",
        props.className
      )}
    >
      {children}
    </button>
  );
}
