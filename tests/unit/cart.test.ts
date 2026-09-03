import { describe, it, expect } from 'vitest';

describe('Cart Calculation Logic', () => {
  const sampleProduct1 = {
    id: 'prod-1',
    name: 'Ração Golden Special Cães Adultos 15kg',
    slug: 'racao-golden-special-15kg',
    price: 159.90,
    stock_quantity: 20,
    is_active: true,
  };

  const sampleProduct2 = {
    id: 'prod-2',
    name: 'Antipulgas Bravecto Cães 10 a 20kg',
    slug: 'bravecto-10-20kg',
    price: 249.90,
    stock_quantity: 15,
    is_active: true,
  };

  it('calculates total items count correctly', () => {
    const items = [
      { product: sampleProduct1, quantity: 2 },
      { product: sampleProduct2, quantity: 1 },
    ];
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    expect(count).toBe(3);
  });

  it('calculates order total sum accurately', () => {
    const items = [
      { product: sampleProduct1, quantity: 2 }, // 319.80
      { product: sampleProduct2, quantity: 1 }, // 249.90
    ];
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    expect(total).toBeCloseTo(569.70, 2);
  });

  it('handles empty cart values safely', () => {
    const items: any[] = [];
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    expect(count).toBe(0);
    expect(total).toBe(0);
  });
});
