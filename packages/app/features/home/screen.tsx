import {
  Button,
  H1,
  Paragraph,
  Separator,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/navigation'

export function HomeScreen() {
  const linkProps = useLink({
    href: `/list`,
  })

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

      <Button {...linkProps}>See and create a Note!</Button>

    </YStack>
  )
}