import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600"); // primary variant
    expect(button).toHaveClass("px-4 py-2"); // medium size
  });

  it("renders with custom text", () => {
    render(<Button>Custom Text</Button>);

    const button = screen.getByRole("button", { name: /custom text/i });
    expect(button).toBeInTheDocument();
  });

  describe("variants", () => {
    it("renders primary variant correctly", () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-blue-600", "text-white");
    });

    it("renders secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-200", "text-gray-900");
    });

    it("renders danger variant correctly", () => {
      render(<Button variant="danger">Danger</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-600", "text-white");
    });
  });

  describe("sizes", () => {
    it("renders small size correctly", () => {
      render(<Button size="small">Small</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-2 py-1", "text-sm");
    });

    it("renders medium size correctly", () => {
      render(<Button size="medium">Medium</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-4 py-2", "text-base");
    });

    it("renders large size correctly", () => {
      render(<Button size="large">Large</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-6 py-3", "text-lg");
    });
  });

  describe("disabled state", () => {
    it("renders disabled button correctly", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("does not trigger onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("loading state", () => {
    it("renders loading button correctly", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
        "opacity-75",
        "cursor-wait"
      );
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("shows loading spinner and text", () => {
      render(<Button loading>Submit</Button>);

      const loadingSpinner = screen.getByTestId("loading-spinner");
      const loadingText = screen.getByText("Loading...");

      expect(loadingSpinner).toBeInTheDocument();
      expect(loadingText).toBeInTheDocument();

      // Original text should not be visible
      expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    });

    it("does not trigger onClick when loading", () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("interactions", () => {
    it("triggers onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles multiple clicks", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("custom props", () => {
    it("applies custom className", () => {
      render(<Button className="custom-class">Custom</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      // Should also have default classes
      expect(button).toHaveClass("bg-blue-600");
    });

    it("passes through HTML button attributes", () => {
      render(
        <Button
          type="submit"
          id="custom-id"
          data-testid="custom-button"
          aria-label="Custom button"
        >
          Submit
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("id", "custom-id");
      expect(button).toHaveAttribute("data-testid", "custom-button");
      expect(button).toHaveAttribute("aria-label", "Custom button");
    });
  });

  describe("accessibility", () => {
    it("has proper focus styles", () => {
      render(<Button>Focus me</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2"
      );
    });

    it("maintains accessibility when disabled", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("maintains accessibility when loading", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("complex children", () => {
    it("renders with complex children", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );

      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });
  });
});
