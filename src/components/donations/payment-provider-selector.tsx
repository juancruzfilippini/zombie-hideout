import type { PaymentProviderState } from "@/lib/payments/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function PaymentProviderSelector({
  providers,
  dict,
}: {
  providers: PaymentProviderState[];
  dict: Dictionary;
}) {
  return (
    <>
      {providers.map((provider) => (
        <option key={provider.id} value={provider.id} disabled={!provider.enabled}>
          {provider.label}
          {provider.enabled ? "" : ` - ${dict.common.disabled}`}
        </option>
      ))}
    </>
  );
}
