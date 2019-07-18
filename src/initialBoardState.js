import WhitePawn from './pieces/WhitePawn';
import WhiteQueen from './pieces/WhiteQueen';
import WhiteKing from './pieces/WhiteKing';
import WhiteBishop from './pieces/WhiteBishop';
import WhiteKnight from './pieces/WhiteKnight';
import WhiteRook from './pieces/WhiteRook';
import BlackPawn from './pieces/BlackPawn';
import BlackQueen from './pieces/BlackQueen';
import BlackKing	from './pieces/BlackKing';
import BlackBishop from './pieces/BlackBishop';
import BlackKnight from './pieces/BlackKnight';
import BlackRook from './pieces/BlackRook';

export default {
	playerTurn: 'white',
	selectedSquareIdx: null,
	legalMoves: null,
	whiteCaptures: [],
	blackCaptures: [],
	whiteKingIsInCheck: false,
	blackKingIsInCheck: false,
	attackedSquares: [],
	showPromotionPopup: false,
	promotedSquareIdx: null,
	promotedPlayer: null,
	promotionPopupLoc: null,
	squares: [
		{ squareName: 'a8', coords: { x: 0, y: 0 }, squareColor: 'light-square', occupant: BlackRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b8', coords: { x: 1, y: 0 }, squareColor: 'dark-square', occupant: BlackKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c8', coords: { x: 2, y: 0 }, squareColor: 'light-square', occupant: BlackBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd8', coords: { x: 3, y: 0 }, squareColor: 'dark-square', occupant: BlackQueen(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e8', coords: { x: 4, y: 0 }, squareColor: 'light-square', occupant: BlackKing(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f8', coords: { x: 5, y: 0 }, squareColor: 'dark-square', occupant: BlackBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g8', coords: { x: 6, y: 0 }, squareColor: 'light-square', occupant: BlackKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h8', coords: { x: 7, y: 0 }, squareColor: 'dark-square', occupant: BlackRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a7', coords: { x: 0, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b7', coords: { x: 1, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c7', coords: { x: 2, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd7', coords: { x: 3, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e7', coords: { x: 4, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f7', coords: { x: 5, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g7', coords: { x: 6, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h7', coords: { x: 7, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a6', coords: { x: 0, y: 2 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b6', coords: { x: 1, y: 2 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c6', coords: { x: 2, y: 2 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd6', coords: { x: 3, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e6', coords: { x: 4, y: 2 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f6', coords: { x: 5, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g6', coords: { x: 6, y: 2 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h6', coords: { x: 7, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a5', coords: { x: 0, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b5', coords: { x: 1, y: 3 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c5', coords: { x: 2, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd5', coords: { x: 3, y: 3 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e5', coords: { x: 4, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f5', coords: { x: 5, y: 3 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g5', coords: { x: 6, y: 3 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h5', coords: { x: 7, y: 3 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a4', coords: { x: 0, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b4', coords: { x: 1, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c4', coords: { x: 2, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd4', coords: { x: 3, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e4', coords: { x: 4, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f4', coords: { x: 5, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g4', coords: { x: 6, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h4', coords: { x: 7, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a3', coords: { x: 0, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b3', coords: { x: 1, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c3', coords: { x: 2, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd3', coords: { x: 3, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e3', coords: { x: 4, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f3', coords: { x: 5, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g3', coords: { x: 6, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h3', coords: { x: 7, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a2', coords: { x: 0, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b2', coords: { x: 1, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c2', coords: { x: 2, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd2', coords: { x: 3, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e2', coords: { x: 4, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f2', coords: { x: 5, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g2', coords: { x: 6, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h2', coords: { x: 7, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

		{ squareName: 'a1', coords: { x: 0, y: 7 }, squareColor: 'dark-square', occupant: WhiteRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'b1', coords: { x: 1, y: 7 }, squareColor: 'light-square', occupant: WhiteKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'c1', coords: { x: 2, y: 7 }, squareColor: 'dark-square', occupant: WhiteBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'd1', coords: { x: 3, y: 7 }, squareColor: 'light-square', occupant: WhiteQueen(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'e1', coords: { x: 4, y: 7 }, squareColor: 'dark-square', occupant: WhiteKing(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'f1', coords: { x: 5, y: 7 }, squareColor: 'light-square', occupant: WhiteBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'g1', coords: { x: 6, y: 7 }, squareColor: 'dark-square', occupant: WhiteKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
		{ squareName: 'h1', coords: { x: 7, y: 7 }, squareColor: 'light-square', occupant: WhiteRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
	]
};
