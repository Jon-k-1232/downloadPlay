import inputData from './ArrayData';

it('Objects intialize to false', () => {
	const falseArray = [false, false, false, false, false];
	expect(inputData.map(item => item.changeColor)).toEqual(falseArray);
});
