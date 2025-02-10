// // app/chat/[id].js
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TextInput, 
//   TouchableOpacity, 
//   FlatList,
//   Image,
//   Platform
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// const ChatDetailScreen = () => {
//   const { id } = useLocalSearchParams();
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       text: 'Hello, I need help with my electrical issue.',
//       sender: 'user',
//       timestamp: '10:30 AM',
//     },
//     {
//       id: '2',
//       text: 'Sure, can you describe the problem?',
//       sender: 'provider',
//       timestamp: '10:35 AM',
//     },
//   ]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage = {
//         id: Date.now().toString(),
//         text: message,
//         sender: 'user',
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages([...messages, newMessage]);
//       setMessage('');
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View style={[
//       styles.messageContainer,
//       item.sender === 'user' ? styles.userMessage : styles.providerMessage
//     ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.timestampText}>{item.timestamp}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Chat Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity>
//           <MaterialIcons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Image 
//           source={{ uri: 'https://example.com/avatar1.jpg' }} 
//           style={styles.headerAvatar} 
//         />
//         <View>
//           <Text style={styles.headerName}>John Doe</Text>
//           <Text style={styles.headerStatus}>Online</Text>
//         </View>
//       </View>

//       {/* Messages List */}
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMessage}
//         style={styles.messagesList}
//       />

//       {/* Message Input */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity>
//           <Ionicons name="add" size={24} color="#888" />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Type a message..."
//           value={message}
//           onChangeText={setMessage}
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Ionicons 
//             name="send" 
//             size={24} 
//             color={message.trim() ? '#3498db' : '#888'} 
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//     paddingTop: Platform.OS === 'ios' ? 40 : 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//     elevation: 2,
//   },
//   headerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginHorizontal: 12,
//   },
//   headerName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   headerStatus: {
//     color: '#2ecc71',
//     fontSize: 12,
//   },
//   messagesList: {
//     flex: 1,
//     padding: 16,
//   },
//   messageContainer: {
//     maxWidth: '80%',
//     marginBottom: 12,
//     padding: 12,
//     borderRadius: 12,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#3498db',
//   },
//   providerMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#ecf0f1',
//   },
//   messageText: {
//     color: 'black',
//   },
//   timestampText: {
//     fontSize: 10,
//     color: '#666',
//     marginTop: 4,
//     alignSelf: 'flex-end',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   textInput: {
//     flex: 1,
//     marginHorizontal: 12,
//     backgroundColor: '#f4f4f4',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
// });

// export default ChatDetailScreen;
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './../config/firebaseConfig' // Adjust import path accordingly

const ChatDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, 'chats', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [id]);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'chats', id, 'messages'), {
        text: message,
        sender: 'user',
        timestamp: new Date(),
      });
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.providerMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color={message.trim() ? '#3498db' : '#888'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', paddingTop: Platform.OS === 'ios' ? 40 : 20 },
  messagesList: { flex: 1, padding: 16 },
  messageContainer: { maxWidth: '80%', marginBottom: 12, padding: 12, borderRadius: 12 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#3498db' },
  providerMessage: { alignSelf: 'flex-start', backgroundColor: '#ecf0f1' },
  messageText: { color: 'black' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white' },
  textInput: { flex: 1, marginHorizontal: 12, backgroundColor: '#f4f4f4', borderRadius: 20, paddingHorizontal: 16 },
});

export default ChatDetailScreen;
