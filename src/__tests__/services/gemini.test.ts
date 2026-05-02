import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DemocracyChat } from '@/services/gemini';

// Mock the Google AI SDK
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn(() => ({
        startChat: vi.fn(() => ({
          sendMessageStream: vi.fn(async () => ({
            stream: (async function* () { yield { text: () => 'Mock response chunk' }; })(),
          })),
        })),
      })),
    };
  }),
}));

describe('DemocracyChat', () => {
  let chat: DemocracyChat;
  
  beforeEach(() => {
    chat = new DemocracyChat();
  });

  it('initializes with empty history', () => {
    expect(chat.history).toHaveLength(0);
  });

  it('sends message and updates history', async () => {
    const onChunk = vi.fn();
    await chat.sendMessageStream('What is democracy?', onChunk);
    
    expect(onChunk).toHaveBeenCalledWith('Mock response chunk');
    expect(chat.history).toHaveLength(2);
    expect(chat.history[0].role).toBe('user');
    expect(chat.history[1].role).toBe('model');
  });

  it('clears history', async () => {
    const onChunk = vi.fn();
    await chat.sendMessageStream('Test question', onChunk);
    chat.clearHistory();
    expect(chat.history).toHaveLength(0);
  });
});
