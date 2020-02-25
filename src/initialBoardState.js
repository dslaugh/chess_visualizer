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
	moveNum: 0,
	selectedSquareIdx: null,
	showPromotionPopup: false,
	promotedSquareIdx: null,
	promotedPlayerTurn: null,
	promotionPopupLoc: null,
	legalMoves: null,
	showWhiteVisualizations: true,
	showBlackVisualizations: true,
	history: [
		{
			playerTurn: 'white',
			whiteCaptures: [],
			blackCaptures: [],
			whiteKingIsInCheck: false,
			blackKingIsInCheck: false,
			attackedSquares: [],
			squares: [
				{ idx: 0, squareName: 'a8', coords: { x: 0, y: 0 }, squareColor: 'light-square', occupant: BlackRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 1, squareName: 'b8', coords: { x: 1, y: 0 }, squareColor: 'dark-square', occupant: BlackKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 2, squareName: 'c8', coords: { x: 2, y: 0 }, squareColor: 'light-square', occupant: BlackBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 3, squareName: 'd8', coords: { x: 3, y: 0 }, squareColor: 'dark-square', occupant: BlackQueen(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 4, squareName: 'e8', coords: { x: 4, y: 0 }, squareColor: 'light-square', occupant: BlackKing(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 5, squareName: 'f8', coords: { x: 5, y: 0 }, squareColor: 'dark-square', occupant: BlackBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 6, squareName: 'g8', coords: { x: 6, y: 0 }, squareColor: 'light-square', occupant: BlackKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 7, squareName: 'h8', coords: { x: 7, y: 0 }, squareColor: 'dark-square', occupant: BlackRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 8, squareName: 'a7', coords: { x: 0, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 9, squareName: 'b7', coords: { x: 1, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 10, squareName: 'c7', coords: { x: 2, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 11, squareName: 'd7', coords: { x: 3, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 12, squareName: 'e7', coords: { x: 4, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 13, squareName: 'f7', coords: { x: 5, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 14, squareName: 'g7', coords: { x: 6, y: 1 }, squareColor: 'dark-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 15, squareName: 'h7', coords: { x: 7, y: 1 }, squareColor: 'light-square', occupant: BlackPawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 16, squareName: 'a6', coords: { x: 0, y: 2 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 17, squareName: 'b6', coords: { x: 1, y: 2 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 18, squareName: 'c6', coords: { x: 2, y: 2 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 19, squareName: 'd6', coords: { x: 3, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 20, squareName: 'e6', coords: { x: 4, y: 2 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 21, squareName: 'f6', coords: { x: 5, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 22, squareName: 'g6', coords: { x: 6, y: 2 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 23, squareName: 'h6', coords: { x: 7, y: 2 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 24, squareName: 'a5', coords: { x: 0, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 25, squareName: 'b5', coords: { x: 1, y: 3 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 26, squareName: 'c5', coords: { x: 2, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 27, squareName: 'd5', coords: { x: 3, y: 3 },  squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 28, squareName: 'e5', coords: { x: 4, y: 3 },  squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 29, squareName: 'f5', coords: { x: 5, y: 3 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 30, squareName: 'g5', coords: { x: 6, y: 3 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 31, squareName: 'h5', coords: { x: 7, y: 3 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 32, squareName: 'a4', coords: { x: 0, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 33, squareName: 'b4', coords: { x: 1, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 34, squareName: 'c4', coords: { x: 2, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 35, squareName: 'd4', coords: { x: 3, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 36, squareName: 'e4', coords: { x: 4, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 37, squareName: 'f4', coords: { x: 5, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 38, squareName: 'g4', coords: { x: 6, y: 4 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 39, squareName: 'h4', coords: { x: 7, y: 4 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 40, squareName: 'a3', coords: { x: 0, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 41, squareName: 'b3', coords: { x: 1, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 42, squareName: 'c3', coords: { x: 2, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 43, squareName: 'd3', coords: { x: 3, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 44, squareName: 'e3', coords: { x: 4, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 45, squareName: 'f3', coords: { x: 5, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 46, squareName: 'g3', coords: { x: 6, y: 5 }, squareColor: 'dark-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 47, squareName: 'h3', coords: { x: 7, y: 5 }, squareColor: 'light-square', occupant: null, selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 48, squareName: 'a2', coords: { x: 0, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 49, squareName: 'b2', coords: { x: 1, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 50, squareName: 'c2', coords: { x: 2, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 51, squareName: 'd2', coords: { x: 3, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 52, squareName: 'e2', coords: { x: 4, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 53, squareName: 'f2', coords: { x: 5, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 54, squareName: 'g2', coords: { x: 6, y: 6 }, squareColor: 'light-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 55, squareName: 'h2', coords: { x: 7, y: 6 }, squareColor: 'dark-square', occupant: WhitePawn(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },

				{ idx: 56, squareName: 'a1', coords: { x: 0, y: 7 }, squareColor: 'dark-square', occupant: WhiteRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 57, squareName: 'b1', coords: { x: 1, y: 7 }, squareColor: 'light-square', occupant: WhiteKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 58, squareName: 'c1', coords: { x: 2, y: 7 }, squareColor: 'dark-square', occupant: WhiteBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 59, squareName: 'd1', coords: { x: 3, y: 7 }, squareColor: 'light-square', occupant: WhiteQueen(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 60, squareName: 'e1', coords: { x: 4, y: 7 }, squareColor: 'dark-square', occupant: WhiteKing(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 61, squareName: 'f1', coords: { x: 5, y: 7 }, squareColor: 'light-square', occupant: WhiteBishop(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 62, squareName: 'g1', coords: { x: 6, y: 7 }, squareColor: 'dark-square', occupant: WhiteKnight(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
				{ idx: 63, squareName: 'h1', coords: { x: 7, y: 7 }, squareColor: 'light-square', occupant: WhiteRook(), selected: false, isAttackedByWhite: false, isAttackedByBlack: false },
			],
		},
	],
};
