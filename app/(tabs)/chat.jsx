import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const ChatListScreen = () => {
  const router = useRouter();
  const [chats] = useState([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'When will you arrive?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'The service was great!',
      timestamp: '9:45 AM',
      unreadCount: 0,
      avatar: 'JS'
    },
  ]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/chat/${item.id}`)}
      style={styles.chatItem}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ChatListScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
// import { db } from './../config/firebaseConfig' 

// const ChatListScreen = () => {
//   const router = useRouter();
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, 'chats'), orderBy('lastUpdated', 'desc'));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const chatList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setChats(chatList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const renderChatItem = ({ item }) => (
//     <TouchableOpacity 
//       onPress={() => router.push(`/chat/${item.id}`)}
//       style={styles.chatItem}
//     >
//       <View style={styles.chatInfo}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.lastMessage} numberOfLines={1}>
//           {item.lastMessage || 'No messages yet'}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={chats}
//         renderItem={renderChatItem}
//         keyExtractor={(item) => item.id}
//         style={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   chatItem: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e5e5' },
//   chatInfo: { flex: 1, marginLeft: 12 },
//   name: { fontSize: 16, fontWeight: '600' },
//   lastMessage: { fontSize: 14, color: '#666', flex: 1, marginRight: 8 },
// });

// export default ChatListScreen;

