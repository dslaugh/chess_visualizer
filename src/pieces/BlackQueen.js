import { coordsToIdx, isInBounds } from '../helpers';
import { blackQueen } from '../pieces_markup';

export default function () {
	const moveDirections = [
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: -1 },
		{ x: 0, y: 1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
	];

	function calculateLegalMoves(squares, clickedSquare) {
		return moveDirections.reduce((acc, dir) => {
			let currentCoords = {
				x: clickedSquare.coords.x + dir.x,
				y: clickedSquare.coords.y + dir.y,
			};
			let currentIdx = coordsToIdx(currentCoords.x, currentCoords.y);

			let isEndOfLine = false;

			while (isEndOfLine === false) {
				if (isInBounds(currentCoords)) {
					if (squares[currentIdx].occupant && squares[currentIdx].occupant.player === 'white') {
						acc.push(currentCoords);
						isEndOfLine = true;
					} else if (squares[currentIdx].occupant && squares[currentIdx].occupant.player === 'black') {
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
				currentIdx = coordsToIdx(currentCoords.x, currentCoords.y);
			}

			return acc;
		}, []);
	}

	function getAttackedAndDefendedSquares(squares, currentSquare) {
		return moveDirections.reduce((acc, dir) => {
			let currentCoords = {
				x: currentSquare.coords.x + dir.x,
				y: currentSquare.coords.y + dir.y,
			};
			let currentIdx = coordsToIdx(currentCoords.x, currentCoords.y);

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
				currentIdx = coordsToIdx(currentCoords.x, currentCoords.y);
			}

			return acc;
		}, []);
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
		piece: 'Q',
		markup: blackQueen,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
	};
}