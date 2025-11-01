import { TypographyH1, TypographyLead } from "@/components/ui/typography";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-8 space-y-2 ${className}`}>
      <TypographyH1>{title}</TypographyH1>
      {description && <TypographyLead>{description}</TypographyLead>}
    </div>
  );
}
