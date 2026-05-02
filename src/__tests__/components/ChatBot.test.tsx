import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatBot    from '../../components/ChatBot/index';

vi.mock('../../hooks/useGemini', () => ({
  useGemini: vi.fn(() => ({
    messages:       [],
    loading:        false,
    error:          null,
    sendMessage:    vi.fn(),
    reset:          vi.fn(),
    remainingCalls: 15,
  })),
}));

import { useGemini } from '../../hooks/useGemini';

describe('ChatBot', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('renders toggle button', () => {
    render(<ChatBot />);
    expect(screen.getByRole('button', { name: /open democracybot/i })).toBeInTheDocument();
  });

  it('opens chat panel when toggle is clicked', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open democracybot/i }));
    expect(screen.getByRole('complementary', { name: /democracybot/i })).toBeInTheDocument();
  });

  it('shows input field after opening', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByPlaceholderText(/ask about elections/i)).toBeInTheDocument();
  });

  it('disables send button when input is empty', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open/i }));
    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });
});
