export function coordsToIdx(x, y) {
	return (y * 8) + x;
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
	let updatedSquares = [ ...squares ]
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

// export function updateSquares(squares, selectedSquare, clickedSquare, playedMove) {
// 	let enPassantCaptureCoords;
// 	if (playedMove && playedMove.isEnPassant) {
// 		enPassantCaptureCoords = {
// 			x: clickedSquare.coords.x,
// 			y: selectedSquare.occupant.player === 'white' ? clickedSquare.coords.y + 1 : clickedSquare.coords.y - 1,
// 		};
// 		const enPassantIdx = coordsToIdx(enPassantCaptureCoords.x, enPassantCaptureCoords.y);
// 		const enPassantCapturedSquare = this.state.squares[enPassantIdx];
// 		whiteCaptures.push(enPassantCapturedSquare.occupant.piece);
// 	}
//
// 	if (selectedSquare.occupant.onPieceMove) {
// 		selectedSquare.occupant = selectedSquare.occupant.onPieceMove({
// 			squareMovedFrom: selectedSquare,
// 			squareMovedTo: clickedSquare
// 		});
// 	}
//
// 	let castledRook;
// 	if (playedMove && playedMove.castle) {
// 		castledRook = {
// 			...this.state.squares[playedMove.rookIdx].occupant,
// 			hasMoved: true,
// 		};
// 	}
//
// 	let squaresClone = [...this.state.squares];
// 	squaresClone = squaresClone
// 		.map((square) => { // Reset 'enPassantable'
// 			if (square.occupant && (square.occupant.piece === 'P') && (square.occupant.player !== this.state.player)) {
// 				return {
// 					...square,
// 					occupant: {
// 						...square.occupant,
// 						enPassantable: false,
// 					}
// 				}
// 			}
// 			return square;
// 		})
// 		.map((square, idx) => { // move pieces
// 			if (playedMove.castle && idx === playedMove.rookIdx) {
// 				return Object.assign({}, square, {occupant: null, selected: null});
// 			} else if (playedMove.castle && idx === playedMove.rookToIdx) {
// 				return Object.assign({}, square, {occupant: castledRook, selected: null});
// 			} else if (square.squareName === clickedSquare.squareName) {
// 				if (selectedSquare.occupant.piece === 'P' && (clickedSquare.coords.y === 0 || clickedSquare.coords.y === 7)) {
// 					const promotionSquareBoundingRect = document.querySelector(`[data-idx='${idx}']`).getBoundingClientRect()
// 					this.togglePromotionPopup(selectedSquare.occupant.player, coordsToIdx(clickedSquare.coords.x, clickedSquare.coords.y), promotionSquareBoundingRect);
// 				}
// 				return Object.assign({}, square, { occupant: selectedSquare.occupant });
// 			} else if (square.squareName === selectedSquare.squareName) {
// 				return Object.assign({}, square, { occupant: null, selected: null });
// 			} else if (enPassantCaptureCoords && (square.coords.x === enPassantCaptureCoords.x && square.coords.y === enPassantCaptureCoords.y)) {
// 				return Object.assign({}, square, { occupant: null });
// 			} else {
// 				return square;
// 			}
// 		});
//
// }