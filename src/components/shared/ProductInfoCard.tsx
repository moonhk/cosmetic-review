import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyMuted } from "@/components/ui/typography";

interface ProductInfoItem {
  label: string;
  value: string;
}

interface ProductInfoCardProps {
  items: ProductInfoItem[];
}

export function ProductInfoCard({ items }: ProductInfoCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.label}>
              <div className="flex justify-between">
                <TypographyMuted>{item.label}</TypographyMuted>
                <span className="font-medium">{item.value}</span>
              </div>
              {index < items.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
