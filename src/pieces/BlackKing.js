import {coordsToIdx, getAttackedSquares, isInBounds} from '../helpers';
import { blackKing } from '../pieces_markup';

export default function () {
	const moves = [
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: -1 },
		{ x: 0, y: 1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
	];

	function calculateLegalMoves(squares, selectedSquare) {
		const squaresAttackedByWhite = getAttackedSquares(squares)
			.filter((square) => {
				return square.player === 'white';
			});

		const legalMoves = moves
			.map((move) => {
				return {
					x: selectedSquare.coords.x + move.x,
					y: selectedSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				const moveIdx = coordsToIdx(move.x, move.y);
				const currentMove = squares[moveIdx];

				if (!isInBounds(move)) {
					return false;
				} else if (currentMove.occupant && currentMove.occupant.player === 'black') {
					return false;
				}

				return true;
			});

		// Castling moves
		if (selectedSquare.occupant.hasMoved === false) {
			const ooSquares = [squares[5], squares[6]];
			const ooSquaresNotAttacked = ooSquares.every(square => !squareIsAttacked(square.coords, squaresAttackedByWhite));
			const ooSquaresEmpty = ooSquares.every(square => !square.occupant);
			if (ooSquaresNotAttacked && ooSquaresEmpty && squares[7].occupant && squares[7].occupant.hasMoved === false) {
				legalMoves.push({
					x: selectedSquare.coords.x + 2,
					y: selectedSquare.coords.y,
					castle: true,
					rookIdx: 7,
					rookToIdx: 5,
				});
			}

			const oooSquares = [squares[1], squares[2], squares[3]];
			const oooSquaresNotAttacked = oooSquares.every(square => !squareIsAttacked(square.coords, squaresAttackedByWhite));
			const oooSquaresEmpty = oooSquares.every(square => !square.occupant);
			if (oooSquaresNotAttacked && oooSquaresEmpty && squares[0].occupant && squares[0].occupant.hasMoved === false ) {
				legalMoves.push({
					x: selectedSquare.coords.x - 2,
					y: selectedSquare.coords.y,
					castle: true,
					rookIdx: 0,
					rookToIdx: 3,
				});
			}
		}

		// Filter out any moves that put the king in check
		return legalMoves.filter(move => !squareIsAttacked(move, squaresAttackedByWhite));
	}

	function squareIsAttacked(move, attackedSquares) {
		return attackedSquares.some(square => move.x === square.x && move.y === square.y);
	}

	function getAttackedAndDefendedSquares(squares, currentSquare) {
		return moves
			.map((move) => {
				return {
					x: currentSquare.coords.x + move.x,
					y: currentSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}
				return true;
			});
	}

	function onPieceMove(data) {
		return {
			...data.squareMovedFrom.occupant,
			hasMoved: true,
		};
	}

	function calculateAttackedSquares(squares, currentSquare) {
		const attackedAndDefendedSquares = this.getAttackedAndDefendedSquares(squares, currentSquare);
		return attackedAndDefendedSquares.map((move) => {
			return {
				...move,
				idx: coordsToIdx(move.x, move.y),
				player: 'black',
			};
		});
	}

	return {
		player: 'black',
		piece: 'K',
		markup: blackKing,
		hasMoved: false,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
		onPieceMove,
	};
}