import {coordsToIdx, isInBounds, updateBoard, kingIsInCheck, squareIsEmpty} from '../helpers';
import { whitePawn } from '../pieces_markup';

function WhitePawn() {
	const moves = [
		{ x: 0, y: -1 },
		{ x: 0, y: -2 },
	];

	const captureMoves = [
		{ x: -1, y: -1 },
		{ x: 1, y: -1 },
	];

	const enPassantMoves = [
		{ x: 1, y: 0 },
		{ x: -1, y: 0 },
	];

	// TODO: This could probably use some refactoring
	function calculateLegalMoves(squares, selectedSquare) {
		const oneSquareAheadCoords = {
			x: selectedSquare.coords.x + moves[0].x,
			y: selectedSquare.coords.y + moves[0].y,
		};
		const oneSquareAheadIdx = coordsToIdx(oneSquareAheadCoords);
		const oneSquareAhead = squares[oneSquareAheadIdx];
		let possibleMoves = [];
		if (this.isFirstMove && squareIsEmpty(oneSquareAhead)) {
			possibleMoves = moves;
		} else {
			possibleMoves = [moves[0]];
		}

		possibleMoves = possibleMoves
			.map((move) => {
				return {
					x: selectedSquare.coords.x + move.x,
					y: selectedSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}

				let idx = coordsToIdx(move);
				let possibleSquare = squares[idx];
				if (possibleSquare.occupant) {
					return false;
				}

				return true
			});

		let possibleCaptures = captureMoves
			.map((move) => {
				return {
					x: selectedSquare.coords.x + move.x,
					y: selectedSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}
				let idx = coordsToIdx(move);
				let possibleCaptureSquare = squares[idx];
				if (possibleCaptureSquare.occupant && possibleCaptureSquare.occupant.player === 'black') {
					return true;
				} else {
					return false;
				}
			});

		let possibleEnPassantCaptures = enPassantMoves
			.map((move) => {
				return {
					x: selectedSquare.coords.x + move.x,
					y: selectedSquare.coords.y + move.y,
				};
			})
			.filter((move) => {
				if (!isInBounds(move)) {
					return false;
				}
				let idx = coordsToIdx(move);
				let possibleEnPassantSquare = squares[idx];
				if (possibleEnPassantSquare.occupant && possibleEnPassantSquare.occupant.player === 'black' && possibleEnPassantSquare.occupant.enPassantable) {
					return true;
				}
				return false;
			})
			.map((move) => {
				const coords = { x: move.x, y: move.y - 1};
				return {
					...coords,
					idx: coordsToIdx(coords),
					captureIdx: coordsToIdx(move),
					enPassant: true,
				};
			});

		const allPossibleMoves = possibleMoves.concat(possibleCaptures, possibleEnPassantCaptures);

		return allPossibleMoves.filter((move) => {
			const updatedBoard = updateBoard(squares, selectedSquare, move, 'white');
			return !kingIsInCheck(updatedBoard.squares, 'white');
		});
	}

	function calculateAttackedSquares(squares, thisSquare) {
		return captureMoves
			.map((move) => {
				const coords = {
					x: thisSquare.coords.x + move.x,
					y: thisSquare.coords.y + move.y,
				};
				return {
					...coords,
					idx: coordsToIdx(coords),
					player: 'white',
				};
			})
			.filter((move) => {
				if (isInBounds(move)) {
					return true;
				} else {
					return false;
				}
			});
	}

	function onPieceMove(data) {
		const distanceMoved = data.squareMovedFrom.coords.y - data.squareMovedTo.coords.y;
		let updatedOccupant = {
			...data.squareMovedFrom.occupant,
			isFirstMove: false,
		};

		if (data.squareMovedFrom.occupant.isFirstMove && distanceMoved === 2) {
			updatedOccupant = {
				...updatedOccupant,
				enPassantable: true,
			};
		}
		return updatedOccupant;
	}

	return {
		player: 'white',
		piece: 'P',
		markup: whitePawn,
		isFirstMove: true,
		enPassantable: false,
		calculateLegalMoves,
		calculateAttackedSquares,
		onPieceMove,
	};
}

export default WhitePawn;
