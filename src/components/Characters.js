import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import CharacterDetails from './CharacterDetails'

const Characters = () => {
	const { data, isError, isLoading } = useGetCharactersQuery()


	const dispatch = useDispatch()

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset
		const character = data.results.find(character => character.name === title)
		return character
	}

	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}

	if (data && Boolean(data?.results?.length)) {
		return (
			<Card.Group centered>
				{data.results.map(character => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							{character && character.characters && <Card.Meta> characters : {character.characters.length}</Card.Meta>}
						</Card.Content>
						<Card.Content extra>
							<CharacterDetails details={character} />
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={character.name}
								positive
								content="Add to faves"
								onClick={addToFavourites}
							/>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		)
	} else if (data?.results?.length === 0) {
		return <Message warning>no characters found</Message>
	}
	return null
}
export default Characters
