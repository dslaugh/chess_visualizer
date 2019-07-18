import { getAttackedSquares } from './helpers';
import initialBoardState from './initialBoardState';

describe('#getAttackedSquares', () => {
	// it('should return an array', () => {
	// 	const attackedSquares = getAttackedSquares(initialBoardState.squares);
	// 	expect(attackedSquares instanceof Array).toBe(true);
	// });

	it('should do something else', () => {
		const attackedSquares = getAttackedSquares(initialBoardState.squares);

		const expected = [
			{ x: 2, y: 2 },
			{ x: 0, y: 2 },
			{ x: 7, y: 2 },
			{ x: 5, y: 2 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 },
			{ x: 0, y: 2 },
			{ x: 3, y: 2 },
			{ x: 1, y: 2 },
			// { x: , y:  },
			// { x: , y:  },
			// { x: , y:  },
			// { x: , y:  },
			// { x: , y:  },
			// { x: , y:  },
			// { x: , y:  },
		];

		expect(attackedSquares).toEqual(expected);
	});
});