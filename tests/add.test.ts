

const add = (a: number , b:number) => a + b;

describe("Test the function", () => {
    it('should add two numbers', () => {
        expect(add(1, 4)).toBe(5);
    })
})