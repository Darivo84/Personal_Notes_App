import { YStack, Input, Button, Text } from 'tamagui';
import { useEffect, useState } from 'react';
import { useRouter } from 'solito/router';

const CreateNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { push } = useRouter();
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = new URLSearchParams(window.location.search).get('id');
      setNoteId(id);

      if (id) {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        const noteToEdit = savedNotes.find(note => note.id === parseInt(id));
        if (noteToEdit) {
          setTitle(noteToEdit.title);
          setContent(noteToEdit.content);
        }
      }
    }
  }, []);

  const handleSaveNote = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');

    if (noteId) {
      const updatedNotes = savedNotes.map(note =>
        note.id === parseInt(noteId) ? { ...note, title, content } : note
      );
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      const updatedNotes = [...savedNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    push('/list-note');
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
  );
};

export default CreateNoteScreen;