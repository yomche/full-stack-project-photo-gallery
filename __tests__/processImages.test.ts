import { calculateNewPosition } from '../src/processImages';
import { Direction } from '../src/constants';

describe('Calculating the position of photos should', () => {
    test('be a function', () => {
    expect(typeof calculateNewPosition).toBe('function');
});

// test('function not empty', () => {
//     expect(addSliderPhotos([])).toHaveReturned();
// });

test('return a number', () => {
    expect(typeof calculateNewPosition(Direction.Left, 20)).toBe('number');
});
});

describe ('Position of photos should be', () => {
    test('-300px when one photo is shifted to the right and the number of photos is more than visible', () => {
    expect(calculateNewPosition(Direction.Right, 5)).toBe(-300);
});

test('0px when one photo is shifted to the left from start position', () => {
    expect(calculateNewPosition(Direction.Left, 5)).toBe(0);
});

test('0px when one photo is shifted to the right and the number of photos is equal to number of visible photos', () => {
    expect(Math.abs(calculateNewPosition(Direction.Right, 4))).toBe(0);
});

test('0px when one photo is shifted to the right and then back to the end', () => {
    calculateNewPosition(Direction.Right, 5);
    expect(calculateNewPosition(Direction.Left, 5)).toBe(0);
});
});
