<<<<<<< ORIGINAL VERSION
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

=======
/**
 * Represents a Math class with various mathematical operations.
 */
class Math {
    /**
     * Returns the square of a given number.
     * @param {number} number - The number to square.
     * @returns {number} The square of the given number.
     */
    public getSquare(number: number): number {
        return number * number;
    }

    /**
     * Adds two numbers together.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The sum of the two numbers.
     */
    public static addNumbers(a: number, b: number): number {
        return a + b;
    }

    /**
     * Subtracts one number from another.
     * @param {number} a - The number to subtract from.
     * @param {number} b - The number to subtract.
     * @returns {number} The result of the subtraction.
     */
    public subtractNumbers(a: number, b: number): number {
        return a - b;
    }

    /**
     * Multiplies two numbers together.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The product of the two numbers.
     */
    public multiplyNumbers(a: number, b: number): number {
        return a * b;
    }

    /**
     * Divides one number by another.
     * @param {number} a - The number to be divided.
     * @param {number} b - The number to divide by.
     * @returns {number} The result of the division.
     * @throws {Error} If the divisor is zero.
     */
    public divideNumbers(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Divider can't be zero");
        }

        return a / b;
    }
}
>>>>>>> CORRECTED VERSION
