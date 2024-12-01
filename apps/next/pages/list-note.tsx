import { YStack, Card, Text, Button, Input, XStack } from 'tamagui';
import { useState, useEffect } from 'react';
import { useRouter } from 'solito/router';

const ListNoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <YStack space padding="$4">
      <Button marginBottom="$4" onPress={() => push('/create-note')}>Add Note</Button>
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
                  onPress={() => push(`/create-note?id=${note.id}`)}
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
    </YStack>
  );
};

export default ListNoteScreen;