import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'
import { Avatar, IconButton} from '@mui/material'
import db from '../../firebase.js'
import { useStateValue } from '../../stateProvider';
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material';
import firebase from 'firebase';

function Chat() {
    const [seed , setSeed] = useState('');
    const [input , setInput] = useState('');
    const { roomId } = useParams()
    const [roomName , setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [ { user }, dispatch ] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed' , input) 

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className='chat'>

            <div className="chat_header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${roomName}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen at {""}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>

            </div>

            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
                        <span className='chat_name'>
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>  

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type='submit'>Send Message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>

        </div>
    );
}

export default Chat;
