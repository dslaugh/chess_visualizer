import React from 'react';
import Board from './Board';
import PlayerTurn from './PlayerTurn';
import Captures from './Captures';
import PromotionPopup from './PromotionPopup';
import initialBoardState from '../initialBoardState';
import {
	coordsToIdx,
	getAttackedSquares,
	setAttackedSquares,
	kingIsInCheck,
} from '../helpers';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		const attackedSquares = getAttackedSquares(initialBoardState.squares);
		const squaresWithAttacks = setAttackedSquares(initialBoardState.squares, attackedSquares);
		const newBoardState = {
			...initialBoardState,
			squares: squaresWithAttacks,
		};

		this.state = {
			...newBoardState,
			attackedSquares,
		};
	}

	selectSquare(idx, clickedSquare) {
		// If pawn promotion popup is showing don't allow selecting
		if (this.state.showPromotionPopup) {
			return false;
		}
		// If clicked square is not a piece return false (Do nothing)
		if ((clickedSquare.occupant === null) || (clickedSquare.occupant.player !== this.state.playerTurn)) {
			return false;
		}

		const legalMoves = clickedSquare.occupant.calculateLegalMoves(this.state.squares, clickedSquare, this.state);

		this.setState({
			legalMoves,
			selectedSquareIdx: idx,
			squares: this.state.squares.map((square, i) => {
				if (idx === i) {
					return Object.assign({}, square, { selected: true });
				}
				return square;
			})
		});
	}

	deselectAll() {
		this.setState({
			selectedSquareIdx: null,
			squares: this.state.squares.map((square) => {
				return {
					...square,
					selected: false,
				};
			})
		});
	}

	movePiece(selectedSquare, clickedSquare, playedMove=false) {
		let whiteCaptures = this.state.whiteCaptures.slice(0);
		let blackCaptures = this.state.blackCaptures.slice(0);
		if (clickedSquare.occupant) {
			if (clickedSquare.occupant.player === 'white') {
				whiteCaptures.push(clickedSquare.occupant.markup);
			} else {
				blackCaptures.push(clickedSquare.occupant.markup);
			}
		}

		let enPassantCaptureCoords;
		if (playedMove && playedMove.isEnPassant) {
			enPassantCaptureCoords = {
				x: clickedSquare.coords.x,
				y: selectedSquare.occupant.player === 'white' ? clickedSquare.coords.y + 1 : clickedSquare.coords.y - 1,
			};
			const enPassantIdx = coordsToIdx(enPassantCaptureCoords.x, enPassantCaptureCoords.y);
			const enPassantCapturedSquare = this.state.squares[enPassantIdx];
			whiteCaptures.push(enPassantCapturedSquare.occupant.piece);
		}

		if (selectedSquare.occupant.onPieceMove) {
			selectedSquare.occupant = selectedSquare.occupant.onPieceMove({
				squareMovedFrom: selectedSquare,
				squareMovedTo: clickedSquare
			});
		}

		let castledRook;
		if (playedMove && playedMove.castle) {
			castledRook = {
				...this.state.squares[playedMove.rookIdx].occupant,
				hasMoved: true,
			};
		}

		let squaresClone = [...this.state.squares];
		squaresClone = squaresClone
			.map((square) => { // Reset 'enPassantable'
				if (square.occupant && (square.occupant.piece === 'P') && (square.occupant.player !== this.state.player)) {
					return {
						...square,
						occupant: {
							...square.occupant,
							enPassantable: false,
						}
					}
				}
				return square;
			})
			.map((square, idx) => { // move pieces
				if (playedMove.castle && idx === playedMove.rookIdx) {
					return Object.assign({}, square, {occupant: null, selected: null});
				} else if (playedMove.castle && idx === playedMove.rookToIdx) {
					return Object.assign({}, square, {occupant: castledRook, selected: null});
				} else if (square.squareName === clickedSquare.squareName) {
					if (selectedSquare.occupant.piece === 'P' && (clickedSquare.coords.y === 0 || clickedSquare.coords.y === 7)) {
						const promotionSquareBoundingRect = document.querySelector(`[data-idx='${idx}']`).getBoundingClientRect();
						this.togglePromotionPopup(selectedSquare.occupant.player, coordsToIdx(clickedSquare.coords.x, clickedSquare.coords.y), promotionSquareBoundingRect);
					}
					return Object.assign({}, square, { occupant: selectedSquare.occupant });
				} else if (square.squareName === selectedSquare.squareName) {
					return Object.assign({}, square, { occupant: null, selected: null });
				} else if (enPassantCaptureCoords && (square.coords.x === enPassantCaptureCoords.x && square.coords.y === enPassantCaptureCoords.y)) {
					return Object.assign({}, square, { occupant: null });
				} else {
					return square;
				}
			});

		const attackedSquares = getAttackedSquares(squaresClone);
		const squaresWithAttacks = setAttackedSquares(squaresClone, attackedSquares);

		const whiteKingIsInCheck = kingIsInCheck(squaresWithAttacks, 'white');
		const blackKingIsInCheck = kingIsInCheck(squaresWithAttacks, 'black');

		this.setState({
			whiteCaptures,
			blackCaptures,
			playerTurn: this.state.playerTurn === 'white' ? 'black' : 'white',
			selectedSquareIdx: null,
			legalMoves: null,
			squares: squaresWithAttacks,
			whiteKingIsInCheck,
			blackKingIsInCheck,
		});
	}

	handleClick(idx) {
		const clickedSquare = this.state.squares[idx];
		// If a square has not already been selected
		if (this.state.selectedSquareIdx === null) {
			return this.selectSquare(idx, clickedSquare);
		}

		if (this.state.selectedSquareIdx === idx) {
			return this.deselectAll();
		}

		const selectedSquare = this.state.squares[this.state.selectedSquareIdx];
		const playedMove = this.state.legalMoves.filter((move) => {
			return (clickedSquare.coords.x === move.x) && (clickedSquare.coords.y === move.y);
		});

		if (playedMove.length > 0) {
			this.movePiece(selectedSquare, clickedSquare, playedMove[0]);
		}
	}

	handlePromotionClick(piece) {
		const squaresClone = [...this.state.squares];
		squaresClone[this.state.promotedSquareIdx].occupant = piece;
		this.setState({
			squares: squaresClone,
		});
		this.togglePromotionPopup();
	}

	togglePromotionPopup(playerTurn=null, squareIdx=null, boundingRect=null) {
		this.setState({
			showPromotionPopup: !this.state.showPromotionPopup,
			promotedPlayerTurn: playerTurn,
			promotedSquareIdx: squareIdx,
			promotionPopupLoc: boundingRect,
		});
	}

	render() {
		return (
			<div className="game">
				{ this.state.showPromotionPopup &&
					<PromotionPopup
						onClick={ (piece) => this.handlePromotionClick(piece) }
						promotedPlayerTurn={ this.state.promotedPlayerTurn }
						loc={this.state.promotionPopupLoc}
					/>
				}
				<PlayerTurn playerTurn={ this.state.playerTurn } ></PlayerTurn>
				<div className="game-board">
					<Board
						squares={ this.state.squares }
						onClick={ (idx) => this.handleClick(idx) }
					/>
				</div>
				<Captures white={ this.state.whiteCaptures } black={ this.state.blackCaptures } />
			</div>
		);
	}
}