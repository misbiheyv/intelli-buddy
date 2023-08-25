{{#ai prompt="generate jsdoc descriptions for this class:"}}
class Math {
	public getSquare(number: number): number {
		return number * number;
	}

	public static addNumbers(a: number, b: number): number {
		return a + b;
	}

	public subtractNumbers(a: number, b: number): number {
		return a - b;
	}

	public multiplyNumbers(a: number, b: number): number {
		return a * b;
	}

	public divideNumbers(a: number, b: number): number {
		if (b === 0) {
			throw new Error("Divider can't be zero");
		}

		return a / b;
	}
}
{{/ai}}