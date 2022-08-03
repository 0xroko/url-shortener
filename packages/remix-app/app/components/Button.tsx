interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | React.ReactNode[];
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`flex h-9 w-full items-center justify-center gap-2 rounded-2xl bg-white  text-center font-medium text-black duration-300 hover:bg-opacity-90 focus:outline-black disabled:bg-opacity-80  disabled:opacity-80`}
    >
      {children}
    </button>
  );
};
