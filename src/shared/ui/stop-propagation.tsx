interface StopPropagationProps {
  children: React.ReactNode;
  className?: string;
}

export const StopPropagation = ({ children, className }: StopPropagationProps) => (
  <div onClick={(e) => e.stopPropagation()} className={className}>
    {children}
  </div>
);
