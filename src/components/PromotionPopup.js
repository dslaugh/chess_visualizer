import React from 'react';
import WhitePromotionPieces from './WhitePromotionPieces';
import BlackPromotionPieces from './BlackPromotionPieces';

export default class PromotionPopup extends React.Component {

	render() {
		let promotionPieces;
		if (this.props.promotedPlayerTurn === 'white') {
			promotionPieces = <WhitePromotionPieces onClick={(piece) => this.props.onClick(piece)} />
		} else {
			promotionPieces = <BlackPromotionPieces onClick={(piece) => this.props.onClick(piece) } />
		}

		console.log('PromotionPopup loc', this.props.loc);

		return (
			<div className="promotion-popup" style={{left: this.props.loc.x, top: this.props.loc.y}}>
				{ promotionPieces }
			</div>
		);
	}
}