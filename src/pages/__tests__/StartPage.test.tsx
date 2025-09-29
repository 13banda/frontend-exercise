
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StartPage } from "../StartPage";

describe("StartPage", () => {
    const mockOnStartGame = jest.fn();

    const renderStartPage = () =>
        render(
            <MemoryRouter>
                <StartPage onStartGame={mockOnStartGame} />
            </MemoryRouter>
        );

    beforeEach(() => {
        mockOnStartGame.mockClear();
    });

    test("renders form fields correctly", () => {
        renderStartPage();

        expect(screen.getByLabelText(/Player Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Board Size/i)).toBeInTheDocument();
        expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Start Game/i })).toBeDisabled();
    });

    test("enables start button when player name is entered", () => {
        renderStartPage();

        const input = screen.getByLabelText(/Player Name/i);
        fireEvent.change(input, { target: { value: "Sandeep" } });

        expect(screen.getByRole("button", { name: /Start Game/i })).toBeEnabled();
    });

    test("calls onStartGame with playerName, boardSize, difficulty", () => {
        renderStartPage();

        const input = screen.getByLabelText(/Player Name/i);
        fireEvent.change(input, { target: { value: "Sandeep" } });

        // Select board size
        const boardSizeBtn = screen.getByText(/4×4/i);
        fireEvent.click(boardSizeBtn);

        // Select difficulty
        const hardBtn = screen.getByText(/HARD/i);
        fireEvent.click(hardBtn);

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /Start Game/i }));

        expect(mockOnStartGame).toHaveBeenCalledWith(
            "Sandeep",
            expect.objectContaining({ rows: 4, cols: 4 }),
            "hard"
        );
    });

    test("does not call onStartGame when name is empty", () => {
        renderStartPage();
        fireEvent.click(screen.getByRole("button", { name: /Start Game/i }));
        expect(mockOnStartGame).not.toHaveBeenCalled();
    });
});
