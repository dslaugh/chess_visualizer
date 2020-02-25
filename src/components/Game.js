import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import PlayerTurn from './PlayerTurn';
import Captures from './Captures';
import PromotionPopup from './PromotionPopup';
import History from './History';
import initialBoardState from '../initialBoardState';
import {
	coordsToIdx,
	getAttackedSquares,
	setAttackedSquares,
	kingIsInCheck,
	updateBoard,
	isSameCoords,
	resetLegalMoveIndicators,
} from '../helpers';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		const attackedSquares = getAttackedSquares(initialBoardState.history[0].squares);
		const squaresWithAttacks = setAttackedSquares(initialBoardState.history[0].squares, attackedSquares);
		const newBoardState = {
			...initialBoardState,
			moveNum: 0,
			history: [
				{
					...initialBoardState.history[0],
					squares: squaresWithAttacks,
					attackedSquares,
				}
			],
		};

		this.state = newBoardState;
	}

	selectSquare(idx) {
		const history = this.state.history;
		const current = history[this.state.moveNum];
		// If pawn promotion popup is showing don't allow selecting
		if (this.state.showPromotionPopup) {
			return false;
		}

		const selectedSquare = current.squares[idx];
		// If clicked square is not a piece return false (Do nothing)
		if ((selectedSquare.occupant === null) || (selectedSquare.occupant.player !== current.playerTurn)) {
			return false;
		}

		const legalMoves = selectedSquare.occupant.calculateLegalMoves(current.squares, selectedSquare);

		// set selected square
		const updatedSquares = current.squares
			.map((square) => {
				if (idx === square.idx) {
					return { ...square, selected: true };
				}
				return square;
			})
			.map((square) => { // set legal moves
				const isLegalMove = legalMoves.some(move => isSameCoords(square.coords, move));
				if (isLegalMove) {
					return { ...square, isLegalMove };
				}
				return square;
			});

		const updatedHistory = history.map((hist, i) => {
			if (i === this.state.moveNum) {
				return { ...hist, squares: updatedSquares };
			}
			return hist;
		});

		this.setState({
			legalMoves,
			selectedSquareIdx: idx,
			history: updatedHistory,
		});
	}

	deselectAll() {
		const history = this.state.history;
		const current = history[this.state.moveNum];

		const updatedSquares = current.squares.map(square => ({ ...square, selected: false, isLegalMove: false }));

		const updatedHistory = history.map((hist, i) => {
			if (i === this.state.moveNum) {
				return { ...hist, squares: updatedSquares };
			}
			return hist;
		});

		this.setState({
			legalMoves: null,
			selectedSquareIdx: null,
			history: updatedHistory,
		});
	}

	movePiece(playedMove) {
		const history = this.state.history.slice(0, this.state.moveNum + 1);
		const current = history[this.state.moveNum];

		const selectedSquare = current.squares[this.state.selectedSquareIdx];
		const playedMoveIdx = coordsToIdx(playedMove);
		const moveToSquare = current.squares[playedMoveIdx];
		const whiteCaptures = current.whiteCaptures.slice(0);
		const blackCaptures = current.blackCaptures.slice(0);

		if (selectedSquare.occupant.onPieceMove) {
			selectedSquare.occupant = selectedSquare.occupant.onPieceMove({
				squareMovedFrom: selectedSquare,
				squareMovedTo: moveToSquare
			});
		}

		const updatedBoard = updateBoard(current.squares, selectedSquare, playedMove, current.playerTurn);

		if (updatedBoard.capturedPiece) {
			if (updatedBoard.capturedPiece.player === 'white') {
				whiteCaptures.push(updatedBoard.capturedPiece.markup);
			} else {
				blackCaptures.push(updatedBoard.capturedPiece.markup);
			}
		}
		if (updatedBoard.pawnPromotionSquare) {
			this.togglePromotionPopup(current.playerTurn, updatedBoard.pawnPromotionSquare.idx)
		}

		const attackedSquares = getAttackedSquares(updatedBoard.squares);
		const squaresWithAttacks = setAttackedSquares(updatedBoard.squares, attackedSquares);
		const updatedSquares = resetLegalMoveIndicators(squaresWithAttacks);

		const whiteKingIsInCheck = kingIsInCheck(squaresWithAttacks, 'white');
		const blackKingIsInCheck = kingIsInCheck(squaresWithAttacks, 'black');

		const updatedHistory = history
			.map((hist) => { // first reset 'selected' and 'isLegalMove'
				const updatedSquares = hist.squares.map(square => ({ ...square, selected: false, isLegalMove: false }) );
				return { ...hist, squares: updatedSquares };
			})
			.concat({ // add new history
				whiteCaptures,
				blackCaptures,
				playerTurn: current.playerTurn === 'white' ? 'black' : 'white',
				squares: updatedSquares,
				whiteKingIsInCheck,
				blackKingIsInCheck,
			});

		this.setState({
			moveNum: this.state.moveNum + 1,
			selectedSquareIdx: null,
			legalMoves: null,
			history: updatedHistory,
		});
	}

	handleClick(idx) {
		const current = this.state.history[this.state.moveNum];
		// If a square has not already been selected
		if (this.state.selectedSquareIdx === null) {
			return this.selectSquare(idx);
		}

		if (this.state.selectedSquareIdx === idx) {
			return this.deselectAll();
		}

		const clickedSquare = current.squares[idx];
		const playedMove = this.state.legalMoves.find((move) => {
			return (clickedSquare.coords.x === move.x) && (clickedSquare.coords.y === move.y);
		});

		if (playedMove) {
			this.movePiece(playedMove);
		}
	}

	handlePromotionClick(piece) {
		const history = this.state.history;
		const current = history[this.state.moveNum];

		const updatedSquares = current.squares.map((square) => {
			if (square.idx === this.state.promotedSquareIdx) {
				return { ...square, occupant: piece };
			}
			return square;
		});

		const updatedHistory = history.map((hist, idx) => {
			if (idx === this.state.moveNum) {
				return { ...hist, squares: updatedSquares };
			}
			return hist;
		});

		this.setState({	history: updatedHistory	});
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

	handleHistoryClick(direction) {
		if (direction === 'back' && this.state.moveNum === 0) {
			return false;
		}
		if (direction === 'forward' && (this.state.moveNum === this.state.history.length - 1)) {
			return false;
		}

		let moveNum;
		switch (direction) {
			case 'start':
				moveNum = 0;
				break;
			case 'end':
				moveNum = this.state.history.length - 1;
				break;
			case 'forward':
				moveNum = this.state.moveNum + 1;
				break;
			case 'back':
				moveNum = this.state.moveNum - 1;
				break;
			default:
				moveNum = this.state.moveNum - 1;
		}

		this.setState({	moveNum });
	}

	toggleVisualization(player) {
		if (player === 'white') {
			this.setState({ showWhiteVisualizations: !this.state.showWhiteVisualizations })
		} else if (player === 'black') {
			this.setState({ showBlackVisualizations: !this.state.showBlackVisualizations })
		}
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.moveNum];

		return (
			<div className="game">
				{ this.state.showPromotionPopup &&
					<PromotionPopup
						onClick={ (piece) => this.handlePromotionClick(piece) }
						promotedPlayerTurn={ this.state.promotedPlayerTurn }
						loc={ this.state.promotionPopupLoc }
					/>
				}
				<div className="game-board">
					<Board
						squares={ current.squares }
						onClick={ (idx) => this.handleClick(idx) }
						showWhiteVisualizations={ this.state.showWhiteVisualizations }
						showBlackVisualizations={ this.state.showBlackVisualizations }
					/>
				</div>
				<aside className="side-panel">
					<Captures className="captures black-captures" captures={ current.blackCaptures } />
					<div>
						<PlayerTurn playerTurn={ current.playerTurn } />
						<History
							onClick={ (direction) => this.handleHistoryClick(direction) }
						/>
						<div className="show-visualizations-container">
							<div>
								<input
									type="checkbox"
									name="show_white_visual"
									id="show_white_visual"
									checked={ this.state.showWhiteVisualizations }
									onChange={ () => this.toggleVisualization('white') }
								/>
								<label htmlFor="show_white_visual" >Show White Visualizations</label>
							</div>
							<div>
								<input
									type="checkbox"
									name="show_black_visual"
									id="show_black_visual"
									checked={ this.state.showBlackVisualizations }
									onChange={ () => this.toggleVisualization('black') }
								/>
								<label htmlFor="show_black_visual">Show Black Visualizations</label>
							</div>
						</div>
					</div>
					<Captures className="captures white-captures" captures={ current.whiteCaptures } />
				</aside>
			</div>
		);
	}
}