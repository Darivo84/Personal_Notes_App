import { YStack, Card, Text, Button, Input, XStack } from 'tamagui';
import { useState, useEffect } from 'react';
import { getItem, setItem } from '../../utils/storage'
import { useRouter } from 'solito/navigation'

export function ListNotes() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getItem('notes');
      setNotes(savedNotes);
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    await setItem('notes', updatedNotes);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <YStack space padding="$4">
      <Button data-testid="add-note-button" marginBottom="$4" onPress={() => push('/create')}>Add Note</Button>
      <Input
        data-testid="search-input"
        placeholder="Search notes by title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        marginBottom="$4"
      />
      {filteredNotes.length > 0 ? (
        filteredNotes.map(note => (
          <Card key={note.id} marginBottom="$4" padding="$4" data-testid="note-card">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text data-testid="note-title" fontWeight="bold">{note.title}</Text>
              <XStack space="$2">
                <Button
                  data-testid="edit-note-button"
                  size="$2"
                  onPress={() => push(`/create?id=${note.id}`)}
                >
                  Edit
                </Button>
                <Button
                  data-testid="delete-note-button"
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
    </YStack>
  )
}