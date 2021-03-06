import {coordsToIdx, isInBounds, kingIsInCheck, updateBoard} from '../helpers';
import { whiteRook } from '../pieces_markup';

function WhiteRook() {
	const moveDirections = [
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		{ x: -1, y: 0 },
		{ x: 0, y: -1 },
	];

	function calculateLegalMoves(squares, selectedSquare) {
		const legalMoves = moveDirections.reduce((acc, dir) => {
			let x = selectedSquare.coords.x + dir.x;
			let y = selectedSquare.coords.y + dir.y;
			let idx = coordsToIdx({ x, y });
			let currentCoords = {	x, y, idx };

			let isEndOfLine = false;

			while (isEndOfLine === false) {
				if (isInBounds(currentCoords)) {
					if (squares[idx].occupant && squares[idx].occupant.player === 'black') {
						acc.push(currentCoords);
						isEndOfLine = true;
					} else if (squares[idx].occupant && squares[idx].occupant.player === 'white') {
						isEndOfLine = true;
					} else {
						acc.push(currentCoords);
					}
				} else {
					isEndOfLine = true;
				}

				x = currentCoords.x + dir.x;
				y = currentCoords.y + dir.y;
				idx = coordsToIdx({ x, y });
				currentCoords = {	x, y, idx };
			}

			return acc;
		}, []);

		return legalMoves.filter((move) => {
			const updatedBoard = updateBoard(squares, selectedSquare, move, 'white');
			return !kingIsInCheck(updatedBoard.squares, 'white');
		})
	}

	function getAttackedAndDefendedSquares(squares, currentSquare) {
		return moveDirections.reduce((acc, dir) => {
			let currentCoords = {
				x: currentSquare.coords.x + dir.x,
				y: currentSquare.coords.y + dir.y,
			};
			let currentIdx = coordsToIdx(currentCoords);

			let isEndOfLine = false;

			while (isEndOfLine === false) {
				if (isInBounds(currentCoords)) {
					if (squares[currentIdx].occupant) {
						acc.push(currentCoords);
						isEndOfLine = true;
					} else {
						acc.push(currentCoords);
					}
				} else {
					isEndOfLine = true;
				}

				currentCoords = {
					x: currentCoords.x + dir.x,
					y: currentCoords.y + dir.y,
				};
				currentIdx = coordsToIdx(currentCoords);
			}

			return acc;
		}, []);
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
		piece: 'R',
		markup: whiteRook,
		hasMoved: false,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
		onPieceMove,
	};
}

export default WhiteRook;
