import React from 'react'
import ReactModal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

const SuccessModal = () => {
	// This is needed so screen readers don't see main content when modal is opened.
	ReactModal.setAppElement('#root')

	let subtitle

	const [modalIsOpen, setIsOpen] = React.useState(false)
	console.log('modalIsOpen', modalIsOpen)
	console.log('setIsOpen', setIsOpen)

	function openModal() {
		setIsOpen(true)
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00'
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
				style={customStyles}
				contentLabel="Minimal Modal Example"
			>
				<h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
				<button onClick={closeModal}>Close Modal</button>
				<div>I am a modal</div>
			</ReactModal>
		</div>
	)
}

export default SuccessModal
