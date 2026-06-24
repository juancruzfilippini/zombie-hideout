import { Badge } from "@/components/ui/badge";

export function PaymentStatus({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="mt-4" aria-live="polite">
      <Badge variant="orange">{message}</Badge>
    </div>
  );
}
