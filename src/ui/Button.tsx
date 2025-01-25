interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full border-2 border-dark-primary px-4 py-2 text-center transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
