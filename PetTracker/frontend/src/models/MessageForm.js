import React, { useState } from 'react';

function MessageForm({ onSendMessage }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MessageForm;