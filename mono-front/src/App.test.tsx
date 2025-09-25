import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders Vite and React logos", () => {
    render(<App />);

    const viteLogo = screen.getByAltText("Vite logo");
    const reactLogo = screen.getByAltText("React logo");

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<App />);

    const heading = screen.getByRole("heading", { name: /vite \+ react/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders initial count as 0", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();
  });

  it("increments count when button is clicked", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    // Click the button
    fireEvent.click(button);

    // Check if count is now 1
    expect(
      screen.getByRole("button", { name: /count is 1/i })
    ).toBeInTheDocument();
  });

  it("increments count multiple times", () => {
    render(<App />);

    let button = screen.getByRole("button", { name: /count is 0/i });

    // Click the button 3 times
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Check if count is now 3
    expect(
      screen.getByRole("button", { name: /count is 3/i })
    ).toBeInTheDocument();
  });

  it("renders HMR instruction text", () => {
    render(<App />);

    // Using a custom text matcher function to handle text split across elements
    const hmrText = screen.getByText((content, element) => {
      const hasText = (node: Element | null) =>
        node?.textContent === "Edit src/App.tsx and save to test HMR";
      const nodeHasText = hasText(element);
      const childrenDontHaveText = element
        ? Array.from(element.children).every((child) => !hasText(child))
        : false;
      return nodeHasText && childrenDontHaveText;
    });
    expect(hmrText).toBeInTheDocument();
  });

  it("renders learn more instruction text", () => {
    render(<App />);

    const learnMoreText = screen.getByText(
      /click on the vite and react logos to learn more/i
    );
    expect(learnMoreText).toBeInTheDocument();
  });

  it("has correct links for logos", () => {
    render(<App />);

    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
    expect(viteLink).toHaveAttribute("target", "_blank");

    expect(reactLink).toHaveAttribute("href", "https://react.dev");
    expect(reactLink).toHaveAttribute("target", "_blank");
  });

  it("has correct CSS classes applied", () => {
    render(<App />);

    const viteLogo = screen.getByAltText("Vite logo");
    const reactLogo = screen.getByAltText("React logo");
    const card = screen.getByText(/count is 0/i).closest(".card");
    const readTheDocs = screen.getByText(
      /click on the vite and react logos to learn more/i
    );

    expect(viteLogo).toHaveClass("logo");
    expect(reactLogo).toHaveClass("logo", "react");
    expect(card).toBeInTheDocument();
    expect(readTheDocs).toHaveClass("read-the-docs");
  });

  it("renders code element with correct content", () => {
    render(<App />);

    const codeElement = screen.getByText("src/App.tsx");
    expect(codeElement.tagName).toBe("CODE");
  });
});
