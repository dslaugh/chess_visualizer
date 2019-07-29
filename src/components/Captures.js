import React from 'react';

export default class Captures extends React.Component {
	render() {
		const whiteCaptures = this.props.white.sort().join('');
		const blackCaptures = this.props.black.sort().join('');
		return (
			<div className="captures">
				<div>
					<div>{ whiteCaptures }</div>
				</div>

				<div>
					<div>{ blackCaptures }</div>
				</div>
			</div>
		);
	}
}