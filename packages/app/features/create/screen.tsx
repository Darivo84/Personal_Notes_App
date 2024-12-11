import { YStack, Input, Button, Text } from 'tamagui';
import { useEffect, useState } from 'react';
import { getItem, setItem} from '../../utils/storage';
import { useRouter } from 'solito/navigation';

export function CreateNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState(null);
  const { push } = useRouter();

  useEffect(() => {
    const loadNoteData = async () => {
      const isWeb = typeof window !== 'undefined';
      const id = isWeb ? new URLSearchParams(window.location.search).get('id') : null;
      setNoteId(id);

      if (id) {
        const savedNotes = await getItem('notes');
        const noteToEdit = savedNotes.find(note => note.id === parseInt(id));
        if (noteToEdit) {
          setTitle(noteToEdit.title);
          setContent(noteToEdit.content);
        }
      }
    };

    loadNoteData();
  }, []);

  const handleSaveNote = async () => {
    const savedNotes = await getItem('notes');

    if (noteId) {
      const updatedNotes = savedNotes.map(note =>
        note.id === parseInt(noteId) ? { ...note, title, content } : note
      );
      await setItem('notes', updatedNotes);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      const updatedNotes = [...savedNotes, newNote];
      await setItem('notes', updatedNotes);
    }

    push('/list');
  };

  return (
    <YStack space padding="$4">
      <Text fontSize="$6" marginBottom="$4">{noteId ? 'Edit Note' : 'Create a New Note'}</Text>
      <Input data-testid="title-input" placeholder="Title" value={title} onChangeText={setTitle} marginBottom="$4" />
      <Input
        data-testid="content-input"
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        marginBottom="$4"
      />
      <Button data-testid="save-note-button" onPress={handleSaveNote}>{noteId ? 'Update Note' : 'Save Note'}</Button>
    </YStack>
  )
}