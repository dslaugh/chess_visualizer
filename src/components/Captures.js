import React from 'react';

export default class Captures extends React.Component {
	render() {
		const captures = this.props.captures.sort().map((piece, key) => <div key={key}>{piece}</div>);
		return (
			<div className="captures">
				{ captures }
			</div>
		);
	}
}