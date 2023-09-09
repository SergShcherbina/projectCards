import { Link } from 'react-router-dom'

import { Button, Card, Typography } from '../../../components'

export const ZeroQuestion = () => {
  return (
    <Card>
      <Typography variant={'h2'}>There are no questions in this card</Typography>
      <Button variant={'primary'} as={Link} to={'/'} fullWidth={true}>
        Back to all packs
      </Button>
    </Card>
  )
}
