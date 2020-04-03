import React from 'react'
import ReactModal from 'react-modal'
import injectSheet from 'react-jss'
import { Portal } from 'react-portal'

import Spacer from '../components/spacer'
import Button from '../components/button'

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

const Modal = ({ classes, modalIsOpen, setIsOpen }) => {
	// This is needed so screen readers don't see main content when modal is opened.
	ReactModal.setAppElement('#root')

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const modalRoot = document.getElementById('modal')
	if (!modalRoot) return null

	let subtitle

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#000'
	}

	return (
		<Portal node={document && modalRoot}>
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
		</Portal>
	)
}

const styles = {
	root: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
}

export default injectSheet(styles)(Modal)
