import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CopyServerAddressButton } from "@/components/server/copy-server-address-button";

describe("CopyServerAddressButton", () => {
  it("copies the configured command", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <CopyServerAddressButton
        value="connect 168.100.162.59:27031"
        label="Copy IP"
        copiedLabel="Copied"
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /copy ip/i }));

    expect(writeText).toHaveBeenCalledWith("connect 168.100.162.59:27031");
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });
});
