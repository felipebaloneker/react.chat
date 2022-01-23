import './styles.css'
import { useState} from 'react'
import MessageItem from '../MessageItem'
import { useMessage } from '../../hooks/useMessage'
import Api from '../../services/Api'
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { useAuth } from '../../hooks/useAuth'
type User = {
    id:string|null;
    name:string|null;
}

type IProps ={
    openChat:boolean;
    user2:User|undefined;
    chat_id:string;
}

function ChatWindow({openChat,user2,chat_id}:IProps){
    const {user} = useAuth()
    const {messages} = useMessage(chat_id)
    const [text,setText] = useState('')
    const [emojiOpen,setEmojiOpen] = useState(false)

    const sendMessage= async()=>{
        await Api.sendMessage(text,chat_id)
        .catch(err =>console.log(err))
        setText('')
    }
    const openEmoji=()=>{
        if(emojiOpen){
            setEmojiOpen(false)
        }
        else{setEmojiOpen(true)}
    }
    const EmojiClick =(e:any,emojiObject:any)=>{
        setText(text + emojiObject.emoji);
    }

    const clickEnter = (e:string) =>{
        if(e === 'Enter'){
            sendMessage();
        }
    }
    
if(user){
    return(
        <div className='chat-window'>  
           {openChat ? 
           (
               <>
                   <div className="chat-header">
                       <h2 className='user-avatar'>{user2?.name?.slice(0,1).toUpperCase()}</h2>
                       <p>{user2?.name}</p>
                   </div>
                   <div className="chat-body">
                       <div className="chat-messages">
                       {
                           messages.map(item =>{
                               return(
                                   <MessageItem
                                   key={item.id}
                                   author={item.author_id}
                                   message={item.message}
                                   time={item.created_at}
                                   />
                               )
                           })
                       }  
                       </div>
                       <div className="chat-emoji"
                       style={{display: emojiOpen ? "block" : "none"}}
                       >
                       <EmojiPicker
                       onEmojiClick={EmojiClick}
                       disableSearchBar
                       disableSkinTonePicker
                       />
                       </div>
                   </div>
                   <div className="chat-footer">
                       <BsFillEmojiSmileFill 
                       className='emoji-btn'
                       onClick={openEmoji}
                       size={20}
                       />
                       <input type="text" placeholder='Digite uma mensagem'
                       value={text}
                       onChange={e => setText(e.target.value)}
                       onKeyUp={e =>clickEnter(e.key)}
                       />
                       <IoMdSend
                       className='send-btn'
                       onClick={sendMessage}
                       size={25}
                       />
                   </div>
               </>
           ):
           (
               <div className="chat-init">
                   <div className="chat-wrp">
                       <h2>Começe uma nova conversa!</h2>
                       <p>selecione um usuario na lista.</p>
                   </div>
               </div>
           )}
        </div>
    )
}
return(
    <></>
)
}
export default ChatWindow