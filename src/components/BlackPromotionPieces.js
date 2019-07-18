import React from 'react';
import {blackBishop, blackKnight, blackQueen, blackRook} from '../pieces_markup';
import BlackQueen from '../pieces/BlackQueen';
import BlackRook from '../pieces/BlackRook';
import BlackBishop from '../pieces/BlackBishop';
import BlackKnight from '../pieces/BlackKnight';

export default class WhitePromotionPieces extends React.Component {
	render() {
		return (
			<div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(BlackQueen()) }>{ blackQueen }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(BlackRook()) }>{ blackRook }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(BlackBishop()) }>{ blackBishop }</div>
				<div className="promotion-piece" onClick={ () => this.props.onClick(BlackKnight()) }>{ blackKnight }</div>
			</div>
		);
	}
}