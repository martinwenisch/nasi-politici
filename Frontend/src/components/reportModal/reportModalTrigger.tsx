import * as React from 'react'

interface Props {
	modalTitle: string,
	children: React.ReactChildren,
	openReportModal: (title: string) => void,
	className: string,
}

const Trigger: React.FC<Props> = ({modalTitle, children, openReportModal, className}) => {

	const onClick = React.useCallback(() => {
		openReportModal(modalTitle)
	}, [modalTitle, openReportModal])

	return (
		<div className={className} onClick={onClick}>{children}</div>
	)
}

export default Trigger
