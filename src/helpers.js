export function coordsToIdx(coords) {
	return (coords.y * 8) + coords.x;
}

export function isInBounds(coords) {
	return coords.x >= 0 && coords.x <= 7 && coords.y >=0 && coords.y <= 7;
}

export function getAttackedSquares(squares) {
	return squares.reduce((acc, square) => {
		if (square.occupant && square.occupant.calculateAttackedSquares) {
			const attackedSquares = square.occupant.calculateAttackedSquares(squares, square);
			if (attackedSquares.length > 0) {
				acc = acc.concat(attackedSquares);
			}
		}
		return acc;
	}, []);
}

export function setAttackedSquares(squares, attackedSquares) {
	// reset all squares back to false
	let updatedSquares = squares
		.map((square) => {
			return {
				...square,
				isAttackedByBlack: false,
				isAttackedByWhite: false,
			};
		});

	attackedSquares.forEach((attSq) => {
		if (attSq.player === 'white') {
			updatedSquares[attSq.idx].isAttackedByWhite = true;
		} else {
			updatedSquares[attSq.idx].isAttackedByBlack = true;
		}
	});

	return updatedSquares;
}

export function kingIsInCheck(squares, player) {
	const attackedSquares = getAttackedSquares(squares).filter(attackedSquare => attackedSquare.player !== player);
	return attackedSquares.some((attackedSquare) => {
		const square = squares[attackedSquare.idx];
		return square.occupant && square.occupant.piece === 'K' && square.occupant.player === player;
	});
}

export function updateBoard(squares, selectedSquare, playedMove, playerTurn) {
	const playedMoveIdx = coordsToIdx(playedMove);
	const moveToSquare = squares[playedMoveIdx];
	let capturedPiece;
	let pawnPromotionSquare;

	const updatedSquares = squares
		.map((square) => { // reset enPassantable
			if (square.occupant && (square.occupant.piece === 'P') && (square.occupant.player !== playerTurn)) {
				return {
					...square,
					occupant: {
						...square.occupant,
						enPassantable: false,
					}
				};
			}
			return square;
		})
		.map((square, idx) => { // move pieces
			if (playedMove.castle && (idx === playedMove.rookIdx)) { // castled rook previous square
				return { ...square,	occupant: null,	selected: null };
			} else if (playedMove.castle && idx === playedMove.rookToIdx) { // castled rook new square
				const castledRook = {...squares[playedMove.rookIdx].occupant, hasMoved: true};
				return {...square, occupant: castledRook, selected: null};
			} else if (playedMove.enPassant && playedMove.captureIdx === idx) { // en passant captured piece
				capturedPiece = square.occupant;
				return { ...square, occupant: null };
			} else if (square.idx === moveToSquare.idx) { // the 'moved to' square
				if (moveToSquare.occupant) {
					capturedPiece = moveToSquare.occupant;
				}
				if (selectedSquare.occupant.piece === 'P' && (moveToSquare.coords.y === 0 || moveToSquare.coords.y === 7)) {
					pawnPromotionSquare = moveToSquare;
				}
				return { ...square, occupant: selectedSquare.occupant };
			} else if (square.idx === selectedSquare.idx) { // the 'moved from' square
				return {...square, occupant: null, selected: null};
			} else { // unchanged square
				return square;
			}
		});

	return {
		squares: updatedSquares,
		capturedPiece,
		pawnPromotionSquare,
	};
}

export function isSameCoords(coords1, coords2) {
	return coords1.x === coords2.x && coords1.y === coords2.y;
}

export function resetLegalMoveIndicators(squares) {
	return squares.map((square) => {
		return {
			...square,
			isLegalMove: false,
		};
	});
}

export function squareIsAttacked(move, attackedSquares) {
	return attackedSquares.some(square => move.x === square.x && move.y === square.y);
}

export function squareIsEmpty(square) {
	return !square.occupant
}