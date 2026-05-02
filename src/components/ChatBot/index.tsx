import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useGemini }      from '../../hooks/useGemini';
import { Analytics }      from '../../services/analyticsService';
import { ErrorBoundary }  from '../ErrorBoundary';

const MAX_INPUT_LENGTH = 500;

function ChatMessage({ message }: { message: any }) {
  const isBot  = message.role === 'bot';
  const isUser = message.role === 'user';

  return (
    <article
      aria-label={`${isUser ? 'You' : 'DemocracyBot'}: ${message.text}`}
      style={{
        display:        'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom:   '0.75rem',
      }}
    >
      {isBot && (
        <span aria-hidden="true" style={{ marginRight: '0.5rem' }}>🤖</span>
      )}
      <div
        style={{
          maxWidth:     '80%',
          padding:      '0.75rem 1rem',
          borderRadius: '12px',
          background:   isUser ? '#c9a227' : '#1e1e2d',
          color:        isUser ? '#0a0a0f' : '#fff',
          position:     'relative',
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.9rem' }}>
          {message.text}
          {message.isStreaming && (
            <span aria-hidden="true" className="typing-cursor">▋</span>
          )}
        </p>
      </div>
      {isUser && (
        <span aria-hidden="true" style={{ marginLeft: '0.5rem' }}>👤</span>
      )}
    </article>
  );
}

function ChatBotInner() {
  const {
    messages, loading, error, sendMessage, reset, remainingCalls,
  } = useGemini();

  const [input,   setInput]   = useState('');
  const [isOpen,  setIsOpen]  = useState(false);
  const endRef                 = useRef<HTMLDivElement>(null);
  const inputRef               = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      Analytics.chatOpened();
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput('');
    await sendMessage(trimmed);
  }, [input, loading, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const charsLeft     = MAX_INPUT_LENGTH - input.length;
  const isNearLimit   = charsLeft < 50;

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close DemocracyBot chat' : 'Open DemocracyBot chat'}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        style={{
          position:     'fixed',
          bottom:       '1.5rem',
          right:        '1.5rem',
          width:        '60px',
          height:       '60px',
          borderRadius: '50%',
          border:       'none',
          background:   '#c9a227',
          color:        '#0a0a0f',
          fontSize:     '1.5rem',
          cursor:       'pointer',
          zIndex:       1000,
          boxShadow:    '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {isOpen ? '✕' : '🗳️'}
      </button>

      {isOpen && (
        <section
          id="chatbot-panel"
          aria-label="DemocracyBot"
          role="complementary"
          style={{
            position:     'fixed',
            bottom:       '5.5rem',
            right:        '1.5rem',
            width:        'min(400px, 95vw)',
            height:       '550px',
            background:   '#0a0a0f',
            borderRadius: '16px',
            boxShadow:    '0 8px 32px rgba(0,0,0,0.8)',
            display:      'flex',
            flexDirection:'column',
            zIndex:       999,
            border:       '1px solid #1e1e2d',
          }}
        >
          <header
            style={{
              padding:      '1rem',
              background:   '#13131f',
              color:        '#fff',
              borderRadius: '16px 16px 0 0',
              display:      'flex',
              justifyContent:'space-between',
              alignItems:   'center',
              borderBottom: '1px solid #1e1e2d'
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '1rem', color: '#c9a227' }}>
                🤖 DemocracyBot
              </h2>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                AI Guide to Indian Democracy
              </p>
            </div>
            <button
              onClick={reset}
              aria-label="Clear chat"
              style={{
                background: 'transparent',
                border:     '1px solid #1e1e2d',
                color:      '#a0a0b0',
                borderRadius:'8px',
                padding:    '0.25rem 0.5rem',
                cursor:     'pointer',
                fontSize:   '0.75rem',
              }}
            >
              Clear
            </button>
          </header>

          <div
            role="log"
            aria-live="polite"
            style={{
              flex:      1,
              overflowY: 'auto',
              padding:   '1rem',
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#a0a0b0', marginTop: '1rem' }}>
                <p style={{ marginBottom: '0.75rem' }}>👋 Try asking:</p>
                {[
                  'How does voting work in India?',
                  'What is NOTA?',
                  'Who is the Election Commission?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    style={{
                      display:      'block',
                      width:        '100%',
                      margin:       '0.5rem 0',
                      padding:      '0.75rem',
                      background:   '#13131f',
                      border:       '1px solid #1e1e2d',
                      color:        '#fff',
                      borderRadius: '8px',
                      cursor:       'pointer',
                      fontSize:     '0.85rem',
                      textAlign:    'left',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {loading && !messages.some(m => m.isStreaming) && (
              <div role="status" style={{ color: '#a0a0b0', fontSize: '0.85rem', padding: '0.5rem' }}>
                Thinking...
              </div>
            )}

            {error && (
              <div
                role="alert"
                style={{
                  color:       '#f87171',
                  padding:     '0.75rem',
                  background:  'rgba(248, 113, 113, 0.1)',
                  borderRadius:'8px',
                  fontSize:    '0.85rem',
                  margin:      '0.5rem 0',
                  border: '1px solid rgba(248, 113, 113, 0.2)'
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              padding:       '0.75rem',
              borderTop:     '1px solid #1e1e2d',
              display:       'flex',
              gap:           '0.5rem',
              alignItems:    'flex-end',
            }}
          >
            <div style={{ flex: 1 }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about elections..."
                maxLength={MAX_INPUT_LENGTH}
                disabled={loading}
                rows={2}
                style={{
                  width:        '100%',
                  padding:      '0.75rem',
                  background:   '#13131f',
                  border:       '1px solid #1e1e2d',
                  color:        '#fff',
                  borderRadius: '8px',
                  resize:       'none',
                  fontSize:     '0.9rem',
                  fontFamily:   'inherit',
                  outline: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: isNearLimit ? '#f87171' : '#555560' }}>
                  {charsLeft} left
                </span>
                {remainingCalls <= 5 && (
                  <span style={{ fontSize: '0.7rem', color: '#c9a227' }}>
                    {remainingCalls} calls left
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding:      '0.75rem',
                background:   '#c9a227',
                color:        '#0a0a0f',
                border:       'none',
                borderRadius: '8px',
                cursor:       loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity:      loading || !input.trim() ? 0.6 : 1,
                fontWeight:   'bold',
                minWidth: '44px'
              }}
            >
              ➤
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default function ChatBot() {
  return (
    <ErrorBoundary>
      <ChatBotInner />
    </ErrorBoundary>
  );
}
