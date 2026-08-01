import { cn } from "@/lib/cn";

type TableProps = React.HTMLAttributes<HTMLTableElement>;
type THeadProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TRProps = React.HTMLAttributes<HTMLTableRowElement>;
type THProps = React.HTMLAttributes<HTMLTableCellElement>;
type TDProps = React.HTMLAttributes<HTMLTableCellElement> & {
  colSpan?: number;
};

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: THeadProps) {
  return <thead className={cn("border-b border-white/10", className)} {...props} />;
}

export function TBody({ className, ...props }: TBodyProps) {
  return <tbody className={cn("", className)} {...props} />;
}

export function TR({ className, ...props }: TRProps) {
  return (
    <tr
      className={cn(
        "border-b border-white/5 transition-colors hover:bg-white/5 data-[selected=true]:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

export function TH({ className, ...props }: THProps) {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-text text-xs uppercase tracking-wider",
        className,
      )}
      {...props}
    />
  );
}

export function TD({ className, ...props }: TDProps) {
  return <td className={cn("p-4 align-middle text-soft-white", className)} {...props} />;
}
