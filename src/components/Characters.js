import { Button, Card, List, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'

const Characters = () => {
	const { data, isError, isLoading } = useGetCharactersQuery()
	const dispatch = useDispatch()

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset
		const character = data.results.find(character => character.title === title)
		return character
	}

	const cleanUpDetailName = (detailName) => {
		let cleanedDetailName = detailName.replace('_', ' ')
		return cleanedDetailName.charAt(0).toUpperCase() + cleanedDetailName.slice(1)	
	}

	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}

	if (data && Boolean(data?.results?.length)) {
		const characterDetails = Array.from(Object.keys(data?.results[0]))
		return (
			<Card.Group centered>
				{data.results.map(character => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							{character && character.characters && <Card.Meta> characters : {character.characters.length}</Card.Meta>}
							<Card.Description><List.Item>{characterDetails.map((detail) => {
								const detailName = cleanUpDetailName(detail)
								return <List>{detailName}: {character[detail]}</List>
							})}</List.Item></Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={character.title}
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
// loop over each detail from the character object and display it in the card next to it's name