import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  // Check if className contains custom padding (py-*)
  const hasCustomPadding = /py-[\d.]+|!py-[\d.]+/.test(className);
  const baseStyles = hasCustomPadding 
    ? "typography-btn1 px-8 transition-all duration-300"
    : "typography-btn1 px-8 py-4 transition-all duration-300";
  
  if (variant === "primary") {
    return (
      <button
        className={`${baseStyles} ${className} btn-primary`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  if (variant === "secondary") {
    return (
      <button
        className={`${baseStyles} ${className} btn-secondary`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Outline variant (View Our Work button)
  return (
    <button
      className={`${baseStyles} ${className} btn-outline`}
      {...props}
    >
      {children}
    </button>
  );
}

