export function calculateInvoice(items, taxPercent = 0) {
  const subTotal = items.reduce(
    (sum, i) => sum + i.quantity * i.rate,
    0
  );

  const taxAmount = (subTotal * taxPercent) / 100;
  const totalAmount = subTotal + taxAmount;

  return { subTotal, taxAmount, totalAmount };
}
