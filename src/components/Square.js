import React from 'react';

export default class Square extends React.Component {
	render() {
		const square = this.props.square;

		let classes = `board-square ${square.squareColor}`;
		if (square.selected) {
			classes += ' selected-square';
		}
		if (square.isLegalMove) {
			classes += ' legal-move';
		}

		let squareValueClasses = 'square-value';
		if (square.occupant && square.occupant.player === 'white') {
			squareValueClasses += ' white-piece';
		} else {
			squareValueClasses += ' black-piece';
		}

		if (square.isAttackedByWhite && square.isAttackedByBlack) {
			classes += ' both-attacking';
		} else if (square.isAttackedByWhite) {
			classes += ' white-attacking';
		} else if (square.isAttackedByBlack) {
			classes += ' black-attacking';
		}

		return (
			<div className={classes} onClick={ () => this.props.onClick() } data-idx={ square.idx }>
				{/*{ this.props.squareName } -*/}
				{/*{ this.props.idx }*/}
				{/*{ JSON.stringify(this.props.coords) }*/}
				<div className={squareValueClasses}>
					{ square.occupant ? square.occupant.markup : '' }
				</div>
			</div>
		);
	}
}
