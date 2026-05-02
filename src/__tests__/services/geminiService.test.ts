import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DemocracyChat, generateQuiz } from '../../services/geminiService';

const mockSendMessageStream = vi.fn();
const mockStartChat         = vi.fn(() => ({ sendMessageStream: mockSendMessageStream }));
const mockGenerateContent   = vi.fn();

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: vi.fn(() => ({
      startChat:       mockStartChat,
      generateContent: mockGenerateContent,
    })),
  })),
  HarmCategory:       { HARM_CATEGORY_HARASSMENT: 'h', HARM_CATEGORY_HATE_SPEECH: 'hs', HARM_CATEGORY_DANGEROUS_CONTENT: 'dc' },
  HarmBlockThreshold: { BLOCK_MEDIUM_AND_ABOVE: 'block' },
}));

function makeStream(text: string) {
  return {
    stream: (async function* () {
      yield { text: () => text };
    })(),
  };
}

describe('DemocracyChat', () => {
  let chat: DemocracyChat;

  beforeEach(() => {
    vi.clearAllMocks();
    chat = new DemocracyChat();
    mockSendMessageStream.mockResolvedValue(makeStream('Test response'));
  });

  it('initializes with empty history', () => {
    expect(chat.history.length).toBe(0);
  });

  it('sends a message and returns text', async () => {
    const result = await chat.sendMessage('What is democracy?');
    expect(result).toBe('Test response');
  });

  it('updates history after message', async () => {
    await chat.sendMessage('Test question');
    expect(chat.history.length).toBe(2); 
  });

  it('calls onChunk callback during streaming', async () => {
    const onChunk = vi.fn();
    await chat.sendMessage('Test', onChunk);
    expect(onChunk).toHaveBeenCalledWith('Test response');
  });
});

describe('generateQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => JSON.stringify({
          topic:       'Voting Rights',
          difficulty:  'medium',
          questions:   [{
            id:           1,
            question:     'What is the voting age in India?',
            options:      ['16', '18', '21', '25'],
            correctIndex: 1,
            explanation:  'The 61st Amendment set it to 18.',
            articleRef:   'Article 326',
          }],
        }),
      },
    });
  });

  it('returns a quiz with questions', async () => {
    const quiz = await generateQuiz('Voting Rights');
    expect(quiz.questions).toHaveLength(1);
  });
});
