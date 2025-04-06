const {celsiusToFahrenheit} = require('../src/index');

test("The freezing point of water is 32 degrees farhenheit", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
} );

test("The boiling point of water is 100c and 212 f", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
} );

test("The negative values cross over of -40c should be -40", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
});

test("The dicimal precision when 37.5c should be 99.5f", () => {
    expect(celsiusToFahrenheit(37.5)).toBeCloseTo(99.5);
})