import { whiteKing } from '../pieces_markup';
import {
	coordsToIdx,
	isInBounds,
	getAttackedSquares,
	updateBoard,
	kingIsInCheck,
	squareIsAttacked,
	squareIsEmpty,
} from '../helpers';

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
		const squaresAttackedByBlack = getAttackedSquares(squares)
			.filter((square) => {
				return square.player === 'black';
			});

		const legalMoves = moves
			.map((move) => {
				return {
					x: selectedSquare.coords.x + move.x,
					y: selectedSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				const moveIdx = coordsToIdx(move);
				const currentMove = squares[moveIdx];

				if (!isInBounds(move)) {
					return false;
				} else if (currentMove.occupant && currentMove.occupant.player === 'white') {
					return false;
				}

				return true;
			});

		// Castling moves
		if (selectedSquare.occupant.hasMoved === false) {
			const ooSquaresNotAttacked = [squares[60], squares[61], squares[62]].every(square => !squareIsAttacked(square.coords, squaresAttackedByBlack));
			const ooSquaresEmpty = [squares[61], squares[62]].every(squareIsEmpty);
			if (ooSquaresNotAttacked && ooSquaresEmpty && squares[63].occupant && squares[63].occupant.hasMoved === false) {
				legalMoves.push({
					x: selectedSquare.coords.x + 2,
					y: selectedSquare.coords.y,
					castle: true,
					rookIdx: 63,
					rookToIdx: 61,
				});
			}

			const oooSquaresNotAttacked = [squares[57], squares[58], squares[59], squares[60]].every(square => !squareIsAttacked(square.coords, squaresAttackedByBlack));
			const oooSquaresEmpty = [squares[57], squares[58], squares[59]].every(squareIsEmpty);
			if (oooSquaresNotAttacked && oooSquaresEmpty && squares[56].occupant && squares[56].occupant.hasMoved === false ) {
				legalMoves.push({
					x: selectedSquare.coords.x - 2,
					y: selectedSquare.coords.y,
					castle: true,
					rookIdx: 56,
					rookToIdx: 59,
				});
			}
		}

		// Filter out any moves that put the king in check
		return legalMoves.filter((move) => {
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
				};
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

	function onPieceMove(data) {
		return {
			...data.squareMovedFrom.occupant,
			hasMoved: true,
		};
	}

	return {
		player: 'white',
		piece: 'K',
		markup: whiteKing,
		hasMoved: false,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
		onPieceMove,
	};
}