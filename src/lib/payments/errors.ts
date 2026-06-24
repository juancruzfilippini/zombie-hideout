export class PaymentProviderError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = "PaymentProviderError";
  }
}

export class ProviderConfigurationError extends PaymentProviderError {
  constructor(provider: string) {
    super(`${provider} is not configured`, 503);
    this.name = "ProviderConfigurationError";
  }
}
