import { useState } from 'react'
import { Button, Modal, List } from 'semantic-ui-react'

const CharacterDetails = ({ details }) => {
	const [modalOpen, setModalOpen] = useState(false)

	// gets array of keys for character API response
	const characterDetails = Array.from(Object.keys(details))

	// hard coded array of character meta data we don't want to show users
	const fieldsToExclude = ['created', 'edited', 'url']

    // remove underscore and capitalise character detail keys to display in list
	const cleanUpDetailName = detailName => {
		let cleanedDetailName = detailName.replace('_', ' ')
		return cleanedDetailName.charAt(0).toUpperCase() + cleanedDetailName.slice(1)
	}
    
    // display number of elements if they are urls eg. number of films or starships
    const cleanValuesToRender = detail => {
        if (Array.isArray(detail)) return detail.length
        return detail
    }

	if (details) {
		return (
			<Modal
				onOpen={() => setModalOpen(true)}
				onClose={() => setModalOpen(false)}
				open={modalOpen}
				trigger={<Button onClick={() => setModalOpen(true)}>view</Button>}
			>
				<Modal.Header>{details.name}</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<strong>Character Details</strong>
					</Modal.Description>
					<Modal.Description>
						<List>
							{characterDetails
								.filter(detailKey => details[detailKey].length > 0)
								.filter(detailKey => !fieldsToExclude.find(keyToExclude => keyToExclude === detailKey))
								.map(detailKey => {
									const detailName = cleanUpDetailName(detailKey)
                                    const valueToRender = cleanValuesToRender(details[detailKey])
									return (
										<List.Item>
											{detailName}: {valueToRender}
										</List.Item>
									)
								})}
						</List>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
	return null
}
export default CharacterDetails
