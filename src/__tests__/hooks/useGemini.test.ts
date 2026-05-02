import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGemini } from '@/hooks/useGemini';

// Mock the service
vi.mock('@/services/gemini', () => {
  return {
    DemocracyChat: vi.fn().mockImplementation(function() {
      return {
        sendMessageStream: vi.fn(async (text: string, onChunk: (t: string) => void) => {
          onChunk('Response');
          return 'Response';
        }),
        clearHistory: vi.fn(),
        history: []
      };
    })
  };
});

describe('useGemini Hook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useGemini());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.messages).toHaveLength(0);
  });

  it('updates state when sending a message', async () => {
    const { result } = renderHook(() => useGemini());
    const onChunk = vi.fn();

    await act(async () => {
      await result.current.sendMessage('Hello', onChunk);
    });

    expect(onChunk).toHaveBeenCalledWith('Response');
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toEqual({ role: 'user', content: 'Hello' });
    expect(result.current.messages[1]).toEqual({ role: 'model', content: 'Response' });
  });

  it('resets state correctly', async () => {
    const { result } = renderHook(() => useGemini());
    
    await act(async () => {
      await result.current.sendMessage('Hello', () => {});
    });
    
    act(() => {
      result.current.reset();
    });

    expect(result.current.messages).toHaveLength(0);
    expect(result.current.error).toBe(null);
  });
});
