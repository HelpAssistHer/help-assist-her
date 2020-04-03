import React, { useState } from 'react'
import ReactModal from 'react-modal'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import Button from '../../components/button'

const customModalStyle = {
	content: {
		top: '25%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

const SuccessModal = ({ classes }) => {
	// This is needed so screen readers don't see main content when modal is opened.
	ReactModal.setAppElement('#root')

	let subtitle

	const [modalIsOpen, setIsOpen] = useState(false)

	function openModal() {
		setIsOpen(true)
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#000'
	}

	function closeModal() {
		setIsOpen(false)
	}

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			<ReactModal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customModalStyle}
				contentLabel="Success Modal"
				shouldCloseOnOverlayClick={false}
			>
				<div className={classes.root}>
					<h2 ref={_subtitle => (subtitle = _subtitle)}>Success</h2>
					<div>New Community Health Center was added successfully!</div>
					<Spacer height="50px" />
					<Button onClick={closeModal} buttonText="OK" size="small" />
				</div>
			</ReactModal>
		</div>
	)
}

const styles = {
	root: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
}

export default injectSheet(styles)(SuccessModal)
