import React from 'react';
import ReactDOM from 'react-dom';
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
	updateBoard,
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

	selectSquare(idx) {
		// If pawn promotion popup is showing don't allow selecting
		if (this.state.showPromotionPopup) {
			return false;
		}

		const selectedSquare = this.state.squares[idx];
		// If clicked square is not a piece return false (Do nothing)
		if ((selectedSquare.occupant === null) || (selectedSquare.occupant.player !== this.state.playerTurn)) {
			return false;
		}

		const legalMoves = selectedSquare.occupant.calculateLegalMoves(this.state.squares, selectedSquare);

		this.setState({
			legalMoves,
			selectedSquareIdx: idx,
			squares: this.state.squares.map((square, i) => {
				if (idx === i) {
					return { ...square,	selected: true };
				}
				return square;
			})
		});
	}

	deselectAll() {
		this.setState({
			selectedSquareIdx: null,
			squares: this.state.squares.map((square) => {
				return { ...square,	selected: false };
			})
		});
	}

	movePiece(playedMove) {
		const selectedSquare = this.state.squares[this.state.selectedSquareIdx];
		const playedMoveIdx = coordsToIdx(playedMove.x, playedMove.y);
		const moveToSquare = this.state.squares[playedMoveIdx];
		const whiteCaptures = this.state.whiteCaptures.slice(0);
		const blackCaptures = this.state.blackCaptures.slice(0);

		if (selectedSquare.occupant.onPieceMove) {
			selectedSquare.occupant = selectedSquare.occupant.onPieceMove({
				squareMovedFrom: selectedSquare,
				squareMovedTo: moveToSquare
			});
		}

		const updatedBoard = updateBoard(this.state.squares, selectedSquare, playedMove, this.state.playerTurn);

		if (updatedBoard.capturedPiece) {
			if (updatedBoard.capturedPiece.player === 'white') {
				whiteCaptures.push(updatedBoard.capturedPiece.markup);
			} else {
				blackCaptures.push(updatedBoard.capturedPiece.markup);
			}
		}

		if (updatedBoard.pawnPromotionSquare) {
			this.togglePromotionPopup(this.state.playerTurn, updatedBoard.pawnPromotionSquare.idx)
		}

		const attackedSquares = getAttackedSquares(updatedBoard.squares);
		const squaresWithAttacks = setAttackedSquares(updatedBoard.squares, attackedSquares);

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
		// If a square has not already been selected
		if (this.state.selectedSquareIdx === null) {
			return this.selectSquare(idx);
		}

		if (this.state.selectedSquareIdx === idx) {
			return this.deselectAll();
		}

		const clickedSquare = this.state.squares[idx];
		const playedMove = this.state.legalMoves.find((move) => {
			return (clickedSquare.coords.x === move.x) && (clickedSquare.coords.y === move.y);
		});

		if (playedMove) {
			this.movePiece(playedMove);
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

	togglePromotionPopup(playerTurn=null, squareIdx=null) {
		const selector = `[data-idx='${squareIdx}']`;
		const promotionElement = ReactDOM.findDOMNode(this).querySelector(selector);
		const boundingRect = squareIdx !== null ? promotionElement.getBoundingClientRect() : undefined;
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