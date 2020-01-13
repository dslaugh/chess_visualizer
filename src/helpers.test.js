import {
    coordsToIdx,
    isInBounds,
    isSameCoords,
    squareIsEmpty,
} from './helpers.js';

describe('#coordsToIdx', () => {
    it('should return the correct index', () => {
        const idx1 = coordsToIdx({ x: 0, y: 1 });
        const idx2 = coordsToIdx({ x: 1, y: 2 });
        
        expect(idx1).toBe(8);
        expect(idx2).toBe(17);
    });
});

describe('#isInBounds', () => {
    it('should return true if coords are in bounds', () => {
        const coords1 = { x: 0, y: 0 };
        const coords2 = { x: 7, y: 7 };

        const actual1 = isInBounds(coords1);
        const actual2 = isInBounds(coords2);
        
        expect(actual1).toBe(true);
        expect(actual2).toBe(true);
    });

    it('should return false if coords are not in bounds', () => {
        const coords1 = { x: -1, y: 1 };
        const coords2 = { x: 1, y: -1 };
        const coords3 = { x: 8, y: 1 };
        const coords4 = { x: 1, y: 8 };

        const actual1 = isInBounds(coords1);
        const actual2 = isInBounds(coords2);
        const actual3 = isInBounds(coords3);
        const actual4 = isInBounds(coords4);
        
        expect(actual1).toBe(false); 
        expect(actual2).toBe(false); 
        expect(actual3).toBe(false); 
        expect(actual4).toBe(false); 
    });
});

describe('#isSameCoords', () => {
    it('should return true if the coords are the same', () => {
        const coords1 = { x: 1, y: 4 };
        const coords2 = { x: 1, y: 4 };

        const actual = isSameCoords(coords1, coords2);
        expect(actual).toBe(true);
    });

    it('should return false if the coords are not the same', () => {
        const coords1 = { x: 1, y: 4 };
        const coords2 = { x: 2, y: 4 };

        const actual = isSameCoords(coords1, coords2);
        expect(actual).toBe(false);
    });
});

describe('#squareIsEmpty', () => {
    it('should return true if the square has no occupant', () => {
        const square1 = { idx: 1 };
        const square2 = { idx: 1, occupant: null };

        const actual1 = squareIsEmpty(square1);
        const actual2 = squareIsEmpty(square2);
        
        expect(actual1).toBe(true);
        expect(actual2).toBe(true);
    });

    it('should return false if the square has an occupant', () => {
        const square1 = { idx: 1, occupant: { id: 1 } };

        const actual1 = squareIsEmpty(square1);

        expect(actual1).toBe(false);
    });
});
