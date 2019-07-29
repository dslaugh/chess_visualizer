import React from 'react';

export default class History extends React.Component {

	render() {
		return (
			<div className='history-container'>
				<button type="button" onClick={() => this.props.onClick('start')}>Beginning</button>
				<button type="button" onClick={() => this.props.onClick('back')}>Back</button>
				<button type="button" onClick={() => this.props.onClick('forward')}>Forward</button>
				<button type="button" onClick={() => this.props.onClick('end')}>End</button>
			</div>
		)
	}
}