import { Stack } from 'expo-router'
import { YStack, Card, Text, Button, Input, XStack, } from 'tamagui';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function listNote() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };
    loadNotes();
  }, []);

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Stack.Screen options={{ title: 'List Notes' }}  />
    <YStack space padding="$4">
      <Button marginBottom="$4" onPress={() => router.push('/create-note')}>Add Note</Button>
      
      <Input
        placeholder="Search notes by title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        marginBottom="$4"
      />
      {filteredNotes.length > 0 ? (
        filteredNotes.map(note => (
          <Card key={note.id} marginBottom="$4" padding="$4">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text fontWeight="bold">{note.title}</Text>
              <XStack space="$2">
                <Button
                  size="$2"
                  onPress={() => router.push(`/create-note?id=${note.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="$2"
                  onPress={() => handleDeleteNote(note.id)}
                  color="red"
                >
                  Delete
                </Button>
              </XStack>
            </XStack>
            <Text marginBottom="$2">{note.content}</Text>
            <Text fontSize="$2" color="$gray10">
              Created on: {new Date(note.id).toLocaleString()}
            </Text>
          </Card>
        ))
      ) : (
        <Text>No notes available. Click 'Add Note' to create one!</Text>
      )}
      <Button marginBottom="$4" onPress={() => router.push('/')}>Home</Button>
    </YStack>
    </>
  )
}