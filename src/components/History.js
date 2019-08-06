import React from 'react';

export default class History extends React.Component {

	render() {
		return (
			<div className='history-container'>
				<div className='history-button' onClick={() => this.props.onClick('start')} title='Start'>{'\u23EE'}</div>
				<div className='history-button' onClick={() => this.props.onClick('back')} title='Back'>{'\u23EA'}</div>
				<div className='history-button' onClick={() => this.props.onClick('forward')} title='Forward'>{'\u23E9'}</div>
				<div className='history-button' onClick={() => this.props.onClick('end')} title='Last Move'>{'\u23ED'}</div>
			</div>
		)
	}
}