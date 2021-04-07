import {coordsToIdx, isInBounds, kingIsInCheck, updateBoard} from '../helpers';
import { whiteQueen } from '../pieces_markup';

function WhiteQueen() {
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

	function calculateLegalMoves(squares, selectedSquare) {
		const legalMoves = moveDirections.reduce((acc, dir) => {
			let x = selectedSquare.coords.x + dir.x;
			let y = selectedSquare.coords.y + dir.y;
			let currentIdx = coordsToIdx({ x, y });
			let currentCoords = {
				x,
				y,
				idx: currentIdx,
			};

			let isEndOfLine = false;

			while (isEndOfLine === false) {
				if (isInBounds(currentCoords)) {
					if (squares[currentIdx].occupant && squares[currentIdx].occupant.player === 'black') {
						acc.push(currentCoords);
						isEndOfLine = true;
					} else if (squares[currentIdx].occupant && squares[currentIdx].occupant.player === 'white') {
						isEndOfLine = true;
					} else {
						acc.push(currentCoords);
					}
				} else {
					isEndOfLine = true;
				}

				x = currentCoords.x + dir.x;
				y = currentCoords.y + dir.y;
				currentIdx = coordsToIdx({ x, y });
				currentCoords = {
					x,
					y,
					idx: currentIdx,
				};
			}

			return acc;
		}, []);

		return legalMoves.filter((move) => {
			const updatedBoard = updateBoard(squares, selectedSquare, move, 'white');
			return !kingIsInCheck(updatedBoard.squares, 'white');
		});
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

	return {
		player: 'white',
		piece: 'Q',
		markup: whiteQueen,
		calculateLegalMoves,
		getAttackedAndDefendedSquares,
		calculateAttackedSquares,
	};
}

export default WhiteQueen;
