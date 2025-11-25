import { Product } from "./product";

export class Promotion {}

export abstract class Discount {
    readonly minValue: number | null;

    protected constructor(minValue: number | null) {
        this.minValue = minValue;
    }
    
    abstract apply(product: Product, amount: number): number;
}

export class QuantityDiscount extends Discount {
    readonly buy: number;
    readonly take: number;

    protected constructor(minValue: number | null, buy: number, take: number) {
        super(minValue);

        if (buy > take) {
            throw new Error("Buy quantity cannot be greater than take quantity");
            }

        this.buy = buy;
        this.take = take;
    }

    apply(product: Product, amount: number): number {
        amount = Math.floor(amount);
        const totalPrice = product.preco * amount;
        if (this.minValue != null && this.minValue > totalPrice) {
            return totalPrice;
        }
        if (amount < this.buy) {
            return totalPrice;
        }

        const sets = amount / this.buy;
        const freeItems = Math.floor(sets) * (this.take - this.buy);
        const payableItems = amount - freeItems;
        return payableItems * product.preco;
    }
}

export class PercentageDiscount extends Discount {
    readonly percentage: number;

    protected constructor(minValue: number | null, percentage: number) {
        super(minValue);
        this.percentage = percentage;
    }

    apply(product: Product, amount: number): number {
        amount = Math.floor(amount);
        const totalPrice = product.preco * amount;
        if (this.minValue != null && this.minValue > totalPrice) {
            return totalPrice;
        }
        const discount = (this.percentage / 100) * totalPrice;
        return totalPrice - discount;
    }
}

export class FixDiscount extends Discount {
    readonly value: number;

    protected constructor(minValue: number | null, value: number) {
        super(minValue);
        this.value = value;
    }
    
    apply(product: Product, amount: number): number {
        amount = Math.floor(amount);
        const totalPrice = product.preco * amount;
        if (this.minValue != null && this.minValue > totalPrice) {
            return totalPrice;
        }
        const discount = this.value * amount;
        return totalPrice - discount;
    }
}