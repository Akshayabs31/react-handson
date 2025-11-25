import { useState,useEffect,useRef } from 'react'
import {Chatbot} from 'supersimpledev'
import url1 from './assets/bot.png'
import url2 from './assets/user.png'
import './App.css'

 function App(){
            const [chatMessage, saveChatMessage] = useState([
        // { message: 'hello', src: 'user', id: 'id1' },
        // { message: 'i am fine, how are you?', src: 'bot', id: 'id2' },
        // { message: 'i am fine', src: 'user', id: 'id3' },
        // { message: "that's good", src: 'bot', id: 'id4' }
    ]);
     return(
        <div className='chat-app'>

      
        {/*we need to use key for each component in arr so using id in the arr and saving it in key var */}
        <ChatMessages chatMessage={chatMessage}/>
          <ChatInput chatMessage={chatMessage} saveChatMessage={saveChatMessage}/>
</div>
      );
    }
    function ChatInput({ chatMessage, saveChatMessage }) {
      const [value, setValue] = useState('');

      function sendMessage() {
         // use the current input value when sending
         const newChatMsg=[...chatMessage, {
                    message: value,
                    src: 'user',
                    id: (crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString()
                }];
                         
                saveChatMessage(newChatMsg);
            const botreply=Chatbot.getResponse(value);
            //console.log(botreply);
            saveChatMessage([...newChatMsg, {
                    message: botreply,
                    src: 'bot',
                    id: (crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString()
                }]);
       // console.log('send clicked, value =', value);
        setValue(''); // clear input after sending
      }

      return (
        <div className='chat-input-container'>
          <input
            value={value}
            className='chat-input'
            onChange={(e) => {
              setValue(e.target.value);
              console.log('input changed:', e.target.value);
            }}
            placeholder="enter your message here..."
            id="chatmes"
          />
          <button type="button" className='send-button' onClick={sendMessage}>send</button>
        </div>
      );
    }
    function ChatMessage(props){
            const mes=props.message;
            const url=props.src;
            // if(url==='bot'){
            //     return(
            //    <div>
            
            //     <img src={`${url}.png`} width='50'/>
            //     {mes}
            // </div>)
            // }
        
        return (
          <div className={url==='user' ? 'chat-user' : 'chat-bot'}>
            {/* Note: conditionally render the bot avatar using && */}
            {/*the above operation can be done using guard operator '&&' like below 
            first one is condition and second after and is the body like if statement*/}
            {url==='bot' && <img className='bounce' src={url1} width='90'/>}
            <div className='message'>{mes}</div>
            {/* example: always show avatar (for demonstration) */}
            { url==='user' && <img  src={url2} width='50'/>}

          </div>
        );
        }
    function ChatMessages({ chatMessage }) {
      const chatMsgRef=useRef(null);
      //USE EFFFECT SHOULD AT THE TOP OF THE COMPONENT NOT WITHIN THE FUNCTION
      useEffect(()=>{
       const containerElem= chatMsgRef.current;
       if(containerElem){
        containerElem.scrollTop=containerElem.scrollHeight;
       }}
        ,[chatMessage]//dependcy arr

      );
      // defensive guard: ensure we have an array
      if (!Array.isArray(chatMessage)) return null;

      return (
        <div className='message-container' ref={chatMsgRef}>
                    {chatMessage.map((msg) => (
            <ChatMessage key={msg.id} message={msg.message} src={msg.src} />
          ))}
        </div>
      );
    }

export default App;
