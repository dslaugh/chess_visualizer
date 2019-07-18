import { coordsToIdx, isInBounds } from '../helpers';
import { whiteKnight } from '../pieces_markup';

export default function () {
	const moves = [
		{ x: 2, y: 1 },
		{ x: 2, y: -1 },
		{ x: 1, y: 2 },
		{ x: 1, y: -2 },
		{ x: -2, y: 1 },
		{ x: -2, y: -1 },
		{ x: -1, y: 2 },
		{ x: -1, y: -2 },
	];

	function calculateLegalMoves(squares, clickedSquare) {
		return moves
			.map((move) => {
				return {
					x: clickedSquare.coords.x + move.x,
					y: clickedSquare.coords.y + move.y,
				}
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}

				let idx = coordsToIdx(move.x, move.y);
				if (squares[idx].occupant && squares[idx].occupant.player !== 'black') {
					return false;
				}

				return true;
			});
	}

	function getAttackedAndDefendedSquares(squares, currentSquare) {
		return moves
			.map((move) => {
				return {
					x: currentSquare.coords.x + move.x,
					y: currentSquare.coords.y + move.y,
				}
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}

				return true;
			});
	}

	function calculateAttackedSquares(squares, currentSquare) {
		const attackedAndDefendedSquares = this.getAttackedAndDefendedSquares(squares, currentSquare);
		return attackedAndDefendedSquares.map((move) => {
			return {
				...move,
				idx: coordsToIdx(move.x, move.y),
				player: 'white',
			};
		});
	}

	return {
		player: 'white',
		piece: 'N',
		markup: whiteKnight,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
	};
}