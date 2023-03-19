import { Button, Card, Loader, Message, Pagination } from 'semantic-ui-react'
import { useGetCharactersNextPageQuery, useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import CharacterDetails from './CharacterDetails'
import { useEffect, useState } from 'react'
import { usePagination } from '../hooks/usePagination'

const Characters = () => {
	// set page number for pagination
	const [pageNum, setPageNum] = useState(1)
	const [detailsToDisplay, setDetailsToDisplay] = useState({})

	const { data, isError, isLoading } = useGetCharactersQuery()

	const { paginatedData } = usePagination(pageNum, useGetCharactersNextPageQuery)

	useEffect(() => {
		if (pageNum > 1) {
			setDetailsToDisplay(paginatedData)
		} else {
			setDetailsToDisplay(data)
		}
	}, [pageNum, data, paginatedData])
	
	const dispatch = useDispatch()

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset
		const character = detailsToDisplay.results.find(character => character.name === title)
		return character
	}

	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}

	if (detailsToDisplay && Boolean(detailsToDisplay?.results?.length)) {
		return (
			<>
				<Card.Group centered>
					{detailsToDisplay.results.map(character => (
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
				<Pagination defaultActivePage={1} totalPages={Math.ceil(detailsToDisplay.count / 10)} onPageChange={(e, data) => {setPageNum(data.activePage)}} />
			</>
		)
	} else if (detailsToDisplay?.results?.length === 0) {
		return <Message warning>no characters found</Message>
	}
	return null
}
export default Characters
