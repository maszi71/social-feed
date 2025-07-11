import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "../components/LanguageSwitcher";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("LanguageSwitcher", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/en/feed");
  });

  it("renders with the current locale selected", () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("en");
  });

  it("displays both language options", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("switches locale and updates URL when a new option is selected", () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "es" } });
    expect(mockPush).toHaveBeenCalledWith("/es/feed");
  });
});
