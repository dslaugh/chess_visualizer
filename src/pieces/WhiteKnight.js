import {coordsToIdx, isInBounds, kingIsInCheck, updateBoard} from '../helpers';
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

	function calculateLegalMoves(squares, selectedSquare) {
		return moves
			.map((move) => {
				const x = selectedSquare.coords.x + move.x;
				const y = selectedSquare.coords.y + move.y;
				const idx = coordsToIdx({ x, y });
				return { x,	y, idx };
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}

				if (squares[move.idx].occupant && squares[move.idx].occupant.player !== 'black') {
					return false;
				}

				return true;
			})
			.filter((move) => {
				const updatedBoard = updateBoard(squares, selectedSquare, move, 'white');
				return !kingIsInCheck(updatedBoard.squares, 'white');
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
				idx: coordsToIdx(move),
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