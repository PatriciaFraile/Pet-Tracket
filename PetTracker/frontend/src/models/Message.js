import React from 'react';
import '../css/Chat.css'

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
}

export default Message;