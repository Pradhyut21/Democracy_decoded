import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AIAssistant from '@/components/AIAssistant';

// Mock the hook
vi.mock('@/hooks/useGemini', () => ({
  useGemini: () => ({
    sendMessage: vi.fn(async (text, onChunk) => {
      onChunk('Response');
      return 'Response';
    }),
    loading: false,
    error: null,
    reset: vi.fn(),
    messages: []
  })
}));

describe('AIAssistant Component', () => {
  it('renders title and input', () => {
    render(<AIAssistant onBackToGlobe={() => {}} />);
    expect(screen.getByText(/Electoral Guide/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about elections/i)).toBeInTheDocument();
  });

  it('allows typing and sending a message', async () => {
    render(<AIAssistant onBackToGlobe={() => {}} />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const sendButton = screen.getByLabelText(/Send message/i);

    fireEvent.change(input, { target: { value: 'What is democracy?' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('What is democracy?')).toBeInTheDocument();
    });
  });

  it('displays suggested prompts initially', () => {
    render(<AIAssistant onBackToGlobe={() => {}} />);
    expect(screen.getByText(/Explain the Electoral College/i)).toBeInTheDocument();
  });
});
