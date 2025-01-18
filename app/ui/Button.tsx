interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`my-4 rounded-2xl border-2 border-foreground px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
