import { YStack, Input, Button, Text } from 'tamagui';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'

export default function createNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (typeof window !== 'undefined') {
        const id = new URLSearchParams(window.location.search).get('id');

        if (id) {
          setNoteId(id);
          try {
            const savedNotesString = await AsyncStorage.getItem('notes');
            const savedNotes = savedNotesString ? JSON.parse(savedNotesString) : [];
            const noteToEdit = savedNotes.find(note => note.id === parseInt(id));
            if (noteToEdit) {
              setTitle(noteToEdit.title);
              setContent(noteToEdit.content);
            }
          } catch (error) {
            console.error('Failed to fetch notes', error);
          }
        }
      }
    };
    fetchNote();
  }, []);

  const handleSaveNote = async () => {
    try {
      const savedNotesString = await AsyncStorage.getItem('notes');
      const savedNotes = savedNotesString ? JSON.parse(savedNotesString) : [];

      if (noteId) {
        // Edit existing note
        const updatedNotes = savedNotes.map(note =>
          note.id === parseInt(noteId) ? { ...note, title, content } : note
        );
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        // Create new note
        const newNote = {
          id: Date.now(),
          title,
          content,
        };
        const updatedNotes = [...savedNotes, newNote];
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      }

      router.push('/list-note');
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  return (
    <YStack space padding="$4">
      <Text fontSize="$6" marginBottom="$4">{noteId ? 'Edit Note' : 'Create a New Note'}</Text>
      <Input placeholder="Title" value={title} onChangeText={setTitle} marginBottom="$4" />
      <Input
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        marginBottom="$4"
      />
      <Button onPress={handleSaveNote}>{noteId ? 'Update Note' : 'Save Note'}</Button>
    </YStack>
  )
}