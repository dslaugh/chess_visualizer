import {coordsToIdx, isInBounds, kingIsInCheck, updateBoard} from '../helpers';
import { blackKnight } from '../pieces_markup';

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
				if (move.x < 0 || move.x > 7) {
					return false;
				}
				if (move.y < 0 || move.y > 7) {
					return false;
				}

				if (squares[move.idx].occupant && squares[move.idx].occupant.player !== 'white') {
					return false;
				}

				return true;
			})
			.filter((move) => {
				const updatedBoard = updateBoard(squares, selectedSquare, move, 'black');
				return !kingIsInCheck(updatedBoard.squares, 'black');
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
		const squaresDefended = this.getAttackedAndDefendedSquares(squares, currentSquare)
		return squaresDefended.map((move) => {
			return {
				...move,
				idx: coordsToIdx(move),
				player: 'black',
			};
		});
	}

	return {
		player: 'black',
		piece: 'N',
		markup: blackKnight,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
	};
}