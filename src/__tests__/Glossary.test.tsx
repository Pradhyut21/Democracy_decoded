import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Glossary from "../components/Glossary";
import "@testing-library/jest-dom";

describe("Glossary Component", () => {
  it("renders the glossary title", () => {
    render(<Glossary />);
    expect(screen.getByText(/Election Glossary/i)).toBeInTheDocument();
  });

  it("filters terms by search input", () => {
    render(<Glossary />);
    const searchInput = screen.getByPlaceholderText(/Search terms/i);
    fireEvent.change(searchInput, { target: { value: "Ballot" } });
    expect(screen.getAllByText(/Ballot/i).length).toBeGreaterThan(0);
  });

  it("shows no results message", () => {
    render(<Glossary />);
    const searchInput = screen.getByPlaceholderText(/Search terms/i);
    fireEvent.change(searchInput, { target: { value: "NonExistentTerm" } });
    expect(screen.getByText(/No terms found/i)).toBeInTheDocument();
  });
});
