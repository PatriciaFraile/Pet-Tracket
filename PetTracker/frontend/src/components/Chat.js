import React, { useState } from 'react';
import MessageForm from '../models/MessageForm';
import MessageList from '../models/MessageList';
import dogCareInfo from '../data/breedDog';
import catCareInfo from '../data/breedCat';
import '../css/Chat.css'


function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const userMessage = { sender: 'user', text };
    const botResponse = getBotResponse(text);
    
    setMessages(prevMessages => [...prevMessages, userMessage, botResponse]);
  };

  const getBotResponse = (text) => {
    const words = text.toLowerCase().split(' ');
  
    const isDog = words.includes('perro') || words.includes('dog');
    const isCat = words.includes('gato') || words.includes('cat');
  
    const dogBreeds = {
      'labrador': 'labrador',
      'poodle': 'poodle',
      'aleman': 'pastor aleman',
      'golden': 'golden',
      'frances': 'bulldog frances',
      'ingles': 'bulldog ingles',
      'caniche': 'caniche',
      'beagle': 'beagle',
      'rottweiler': 'rottweiler',
      'pointer': 'pointer',
      'corgi': 'corgi',
      'dachshund': 'dachshund',
      'yorkshire': 'yorkshire',
      'husky': 'husky',
      'chihuahua': 'chihuahua'
    };
  
    const catBreeds = {
      'persa': 'persa',
      'siames': 'siamés',
      'maine': 'maine coon',
      'bengali': 'bengalí',
      'ragdoll': 'ragdoll',
      'britanico': 'británico de pelo corto',
      'sphynx': 'sphynx',
      'abisinio': 'abisinio',
      'birmano': 'birmano',
      'oriental': 'oriental de pelo corto',
      'ruso': 'ruso azul',
      'scottish': 'scottish fold',
      'devon': 'devon rex',
      'cornish': 'cornish rex',
      'noruego': 'noruego del bosque',
      'angora': 'angora turco',
      'somali': 'somalí',
      'chartreux': 'chartreux',
      'manx': 'manx',
      'balines': 'balinés'
    };
    
  
    const breed = isDog ? Object.keys(dogBreeds).find(b => words.includes(b)) :
                  isCat ? Object.keys(catBreeds).find(b => words.includes(b)) : null;
  
    const query = words.includes('alimentacion') ? 'alimentacion' :
                  words.includes('cuidados') ? 'cuidados' :
                  words.includes('adiestramiento') ? 'adiestramiento' :
                  words.includes('ordenes') ? 'ordenes' :
                  words.includes('caracteristicas') ? 'caracteristicas' : null;
  
    const year = words.includes('cachorro') ? 'cachorro' :
                 words.includes('junior') ? 'junior' :
                 words.includes('adulto') ? 'adulto' :
                 words.includes('senior') ? 'senior' :
                 words.includes('gatito')? 'gatito':
                 words.includes('adulto')? 'adulto':
                 words.includes('mayor')? 'mayor':
                  null;
  
    const careInfo = isDog ? dogCareInfo : isCat ? catCareInfo : null;
  
    if (!careInfo) {
      return { sender: 'bot', text: "Lo siento, no tengo información sobre ese tipo de animal o consulta." };
    }
  
    if (breed && query && year) {
      const breedKey = isDog ? dogBreeds[breed] : catBreeds[breed];
      const responseText = careInfo[breedKey]?.[query]?.[year];
      return { sender: 'bot', text: responseText || "No tengo información sobre esa etapa de vida para esa raza." };
    } else if (breed && query) {
      const breedKey = isDog ? dogBreeds[breed] : catBreeds[breed];
      const responseText = careInfo[breedKey]?.[query];
      return { sender: 'bot', text: responseText || "No tengo información sobre esa consulta para esa raza." };
    } else {
      return { sender: 'bot', text: "Lo siento, no tengo información sobre esa raza o consulta." };
    }
  };
  

  return (
    <div className='chat' style={{background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, minHeight: '100vh', padding: '50px', boxSizing: 'border-box' }}>
    <div className="chat-container">
        <h1 className="chat-title">Pet Chat</h1>
        <MessageList messages={messages} />
        <MessageForm onSendMessage={handleSendMessage} />
    </div>
</div>
    
  );
}

export default Chat;