import { coordsToIdx, isInBounds } from '../helpers';
import { blackPawn } from '../pieces_markup';

export default function () {
	const moves = [
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
	];

	const captureMoves = [
		{ x: -1, y: 1 },
		{ x: 1, y: 1 },
	];

	const enPassantMoves = [
		{ x: 1, y: 0 },
		{ x: -1, y: 0 },
	];

	// TODO: This could probably use some refactoring
	function calculateLegalMoves(squares, selectedSquare) {
		let possibleMoves = [];
		if (this.isFirstMove) {
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

				let idx = coordsToIdx(move.x, move.y);
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
				let idx = coordsToIdx(move.x, move.y);
				let possibleCaptureSquare = squares[idx];
				if (possibleCaptureSquare.occupant && possibleCaptureSquare.occupant.player === 'white') {
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
				let idx = coordsToIdx(move.x, move.y);
				let possibleEnPassantSquare = squares[idx];
				if (possibleEnPassantSquare.occupant && possibleEnPassantSquare.occupant.player === 'white' && possibleEnPassantSquare.occupant.enPassantable) {
					return true;
				}
				return false;
			})
			.map((move) => {
				return {
					x: move.x,
					y: move.y + 1,
					isEnPassant: true,
				};
			});

		return possibleMoves.concat(possibleCaptures, possibleEnPassantCaptures);
	}

	function calculateAttackedSquares(squares, thisSquare) {
		return captureMoves
			.map((move) => {
				const coords = {
					x: thisSquare.coords.x + move.x,
					y: thisSquare.coords.y + move.y,
				} ;
				return {
					...coords,
					idx: coordsToIdx(coords.x, coords.y),
					player: 'black',
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
		const distanceMoved = data.squareMovedTo.coords.y - data.squareMovedFrom.coords.y;
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
		player: 'black',
		piece: 'P',
		markup: blackPawn,
		isFirstMove: true,
		calculateLegalMoves,
		calculateAttackedSquares,
		onPieceMove,
	};
}