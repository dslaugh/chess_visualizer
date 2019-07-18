import React from 'react';
import {whiteBishop, whiteKnight, whiteQueen, whiteRook} from '../pieces_markup';
import WhiteQueen from '../pieces/WhiteQueen';
import WhiteRook from '../pieces/WhiteRook';
import WhiteBishop from '../pieces/WhiteBishop';
import WhiteKnight from '../pieces/WhiteKnight';

export default class WhitePromotionPieces extends React.Component {
	render() {
		return (
			<div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(WhiteQueen()) }>{ whiteQueen }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(WhiteRook()) }>{ whiteRook }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(WhiteBishop()) }>{ whiteBishop }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(WhiteKnight()) }>{ whiteKnight }</div>
			</div>
		);
	}
}