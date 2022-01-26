import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SidebarChat.css'
import db from '../../firebase.js'
import { Avatar } from '@mui/material'

function SidebarChat({ addNewChat, id, name }) {
    const [seed , setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp' , 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => (
                    doc.data()
                )))
            ))
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for new room")

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }    

    return !addNewChat ? (
        <Link to={`/room/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>
                        { 
                            messages[0]?.message.length < 40 || !messages[0]?.message  
                            ? `${messages[0]?.message}` 
                            : `${messages[0]?.message.slice(0, 40)}...`
                        }
                    </p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat;
