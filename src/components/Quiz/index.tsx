import React, { useState }       from 'react';
import { useQuiz, QUIZ_TOPICS } from '../../hooks/useQuiz';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { ErrorBoundary }  from '../ErrorBoundary';

function QuizQuestion({ question, selectedAnswer, onSelect, submitted }: any) {
  return (
    <article
      aria-labelledby={`question-${question.id}`}
      style={{ marginBottom: '2rem' }}
    >
      <h3 id={`question-${question.id}`} style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.2rem' }}>
        {question.id}. {question.question}
        {question.articleRef && (
          <span
            aria-label={`Constitutional reference: ${question.articleRef}`}
            style={{ display: 'block', fontSize: '0.8rem', color: '#c9a227', fontWeight: 'normal', marginTop: '0.5rem' }}
          >
            📜 {question.articleRef}
          </span>
        )}
      </h3>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        {question.options.map((option: string, index: number) => {
          const isCorrect  = submitted && index === question.correctIndex;
          const isWrong    = submitted && index === selectedAnswer && index !== question.correctIndex;
          const isSelected = selectedAnswer === index;

          return (
            <label
              key={index}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '0.75rem',
                padding:      '1rem',
                marginBottom: '0.75rem',
                borderRadius: '12px',
                border:       `1px solid ${
                  isCorrect  ? '#4ade80' :
                  isWrong    ? '#f87171' :
                  isSelected ? '#c9a227' : '#1e1e2d'
                }`,
                background:   isCorrect  ? 'rgba(74, 222, 128, 0.1)' :
                              isWrong    ? 'rgba(248, 113, 113, 0.1)' :
                              isSelected ? 'rgba(201, 162, 39, 0.1)' : '#13131f',
                cursor:       submitted ? 'default' : 'pointer',
                transition:   'all 0.2s ease',
                color: '#fff'
              }}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() => onSelect(question.id, index)}
                disabled={submitted}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#c9a227' }}
              />
              <span style={{ fontSize: '0.95rem' }}>{option}</span>
            </label>
          );
        })}
      </fieldset>

      {submitted && (
        <div
          role="note"
          style={{
            marginTop:    '1rem',
            padding:      '1rem',
            background:   '#0d0d14',
            borderLeft:   '4px solid #c9a227',
            borderRadius: '0 8px 8px 0',
            fontSize:     '0.9rem',
            color: '#a0a0b0'
          }}
        >
          💡 {question.explanation}
        </div>
      )}
    </article>
  );
}

function QuizInner() {
  const {
    quiz, answers, submitted, loading, error, score, progress,
    startQuiz, selectAnswer, submitQuiz, resetQuiz, isComplete,
  } = useQuiz();

  const { submitScore, submitting, submitted: scoreSubmitted } = useLeaderboard();

  const [playerName,  setPlayerName]  = useState('');
  const [nameError,   setNameError]   = useState('');
  const [topic,       setTopic]       = useState(QUIZ_TOPICS[0]);
  const [difficulty,  setDifficulty]  = useState('medium');

  const handleSubmitScore = async () => {
    if (!playerName.trim()) {
      setNameError('Enter your name.');
      return;
    }
    const result = await submitScore(playerName, score);
    if (!result.success) setNameError(result.error || 'Failed');
  };

  if (!quiz && !loading) {
    return (
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>🗳️ Democracy Quiz</h2>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: '#a0a0b0', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            Choose a Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '12px', 
              background: '#13131f', 
              border: '1px solid #1e1e2d', 
              color: '#fff',
              outline: 'none'
            }}
          >
            {QUIZ_TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#a0a0b0', marginBottom: '1rem', fontSize: '0.9rem' }}>Difficulty</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: difficulty === d ? '#c9a227' : '#13131f',
                  color: difficulty === d ? '#0a0a0f' : '#fff',
                  border: '1px solid #1e1e2d',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ color: '#f87171', marginBottom: '1.5rem', textAlign: 'center' }}>⚠️ {error}</div>
        )}

        <button
          onClick={() => startQuiz(topic, difficulty)}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#c9a227',
            color: '#0a0a0f',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
        >
          Start Quiz
        </button>
      </section>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: '#fff' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🤖 Generating AI Quiz...</p>
        <div style={{ width: '60px', height: '60px', border: '4px solid #1e1e2d', borderTopColor: '#c9a227', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (submitted && score) {
    return (
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '2.5rem' }}>Results</h2>
          <p style={{ fontSize: '4rem', fontWeight: 'bold', color: '#c9a227', margin: '1rem 0' }}>
            {score.percentage}%
          </p>
          <p style={{ color: '#a0a0b0' }}>{score.score} / {score.total} correct</p>
        </div>

        {!scoreSubmitted && (
          <div style={{ background: '#13131f', padding: '2rem', borderRadius: '16px', border: '1px solid #1e1e2d', marginBottom: '3rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Save Score</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => { setPlayerName(e.target.value); setNameError(''); }}
                placeholder="Your name"
                maxLength={30}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: '#0a0a0f', border: '1px solid #1e1e2d', color: '#fff' }}
              />
              <button
                onClick={handleSubmitScore}
                disabled={submitting}
                style={{ padding: '0.75rem 1.5rem', background: '#4ade80', color: '#0a0a0f', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {submitting ? '...' : 'Save'}
              </button>
            </div>
            {nameError && <p style={{ color: '#f87171', marginTop: '0.5rem', fontSize: '0.8rem' }}>{nameError}</p>}
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          {quiz.questions.map((q: any) => (
            <QuizQuestion
              key={q.id}
              question={q}
              selectedAnswer={answers[q.id]}
              submitted={true}
            />
          ))}
        </div>

        <button
          onClick={resetQuiz}
          style={{ width: '100%', padding: '1rem', background: '#13131f', color: '#fff', border: '1px solid #1e1e2d', borderRadius: '12px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#c9a227', fontSize: '1.5rem', marginBottom: '1rem' }}>{quiz.topic}</h2>
        <div style={{ background: '#1e1e2d', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#c9a227', transition: 'width 0.3s ease' }} />
        </div>
      </header>

      {quiz.questions.map((q: any) => (
        <QuizQuestion
          key={q.id}
          question={q}
          selectedAnswer={answers[q.id]}
          onSelect={selectAnswer}
          submitted={false}
        />
      ))}

      <button
        onClick={submitQuiz}
        disabled={!isComplete}
        style={{
          width: '100%',
          padding: '1rem',
          background: isComplete ? '#c9a227' : '#1e1e2d',
          color: isComplete ? '#0a0a0f' : '#555560',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: isComplete ? 'pointer' : 'not-allowed',
          marginTop: '2rem'
        }}
      >
        Submit Answers
      </button>
    </section>
  );
}

export default function Quiz() {
  return (
    <ErrorBoundary>
      <QuizInner />
    </ErrorBoundary>
  );
}
