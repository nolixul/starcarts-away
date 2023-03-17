import { useState } from 'react'
import { Button, Modal, List } from 'semantic-ui-react'

const CharacterDetails = ({ details }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const characterDetails = Array.from(Object.keys(details))
	const cleanUpDetailName = detailName => {
		let cleanedDetailName = detailName.replace('_', ' ')
		return cleanedDetailName.charAt(0).toUpperCase() + cleanedDetailName.slice(1)
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
						<List.Item>
							{characterDetails.map(detail => {
								const detailName = cleanUpDetailName(detail)
								return (
									<List>
										{detailName}: {details[detail]}
									</List>
								)
							})}
						</List.Item>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
	return null
}
export default CharacterDetails
