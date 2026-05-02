import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Glossary from "../components/Glossary";
import "@testing-library/jest-dom";

describe("Glossary Component", () => {
  it("renders the glossary title", () => {
    render(<Glossary />);
    expect(screen.getByText(/Election Glossary/i)).toBeInTheDocument();
  });

  it("renders glossary terms", () => {
    render(<Glossary />);
    expect(screen.getByText(/Electoral College/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerrymandering/i)).toBeInTheDocument();
  });
});
