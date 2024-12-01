import { Stack } from 'expo-router'
import {
  Button,
  H1,
  Paragraph,
  Separator,
  YStack,
} from '@my/ui'
import { router } from 'expo-router'

const HomeScreen = () => {

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      gap="$8"
      p="$4"
      bg="$background"
    >

      <YStack gap="$4">
        <H1
          ta="center"
          col="$color12"
        >
          Welcome to your personal note app.
        </H1>
        <Paragraph
          col="$color10"
          ta="center"
        >
          Please click the button below to create a note.
        </Paragraph>
        <Separator />
      </YStack>

      <Button onPress={ () => router.push('/list-note') }>See and create a Note!</Button>

    </YStack>
  )
}

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <HomeScreen />
    </>
  )
}
