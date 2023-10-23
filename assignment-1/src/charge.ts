export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

type CashPayment = {
  type: 'CASH';
  amount: number;
};

type CouponPayment = {
  type: 'COUPON';
  percentage?: number;
  amount?: number;
};

export type Payment = CashPayment | CouponPayment;

/**
 * 支払う
 * @param invoice 請求書
 * @param payments 支払い
 * @returns レシート
 */
export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;

  const deposit = payments
    .sort((payment) => (isCouponPayment(payment) ? -1 : 1))
    .reduce((sum: number, current: Payment) => {
      if (sum >= total) throw new Error('OverCharge');
      return sum + calculateDeposit(current, total);
    }, 0);
  if (total > deposit) {
    throw new Error('Shortage');
  }

  const hasPaymentsByCash = payments.some((payment) => !isCouponPayment(payment));
  // 全ての支払いが商品券のとき、お釣りは発生しない
  if (!hasPaymentsByCash) return createReceipt(total, deposit, 0);
  return createReceipt(total, deposit, deposit - total);
}

/**
 * 支払い方法が商品券か判定する
 * 型ガードも行う
 * @param type 支払い方法
 * @returns 商品券かどうか
 */
const isCouponPayment = (payment: unknown): payment is CouponPayment => {
  return (payment as CouponPayment).type === 'COUPON';
};

/**
 * 支払額を計算する
 * @param currentPayment 今回の支払い
 * @param invoiceTotal 請求額合計
 * @returns 支払額
 */
const calculateDeposit = (currentPayment: Payment, invoiceTotal: number): number => {
  if (isCouponPayment(currentPayment))
    return calculateDepositByCoupon(currentPayment.percentage, currentPayment.amount, invoiceTotal);
  return currentPayment.amount;
};

/**
 * 商品券による支払額を計算する
 * @param couponPercentage
 * @param deposit 支払い額
 * @param invoiceTotal 請求額合計
 * @returns 支払額
 */
const calculateDepositByCoupon = (
  percentage: number | undefined,
  amount: number | undefined,
  invoiceTotal: number,
): number => {
  if (percentage != undefined) {
    return Math.floor(invoiceTotal * (percentage / 100));
  }
  return amount || 0;
};

/**
 * レシートを作成する
 * @param total 請求額合計
 * @param deposit 支払い額
 * @param change お釣り
 * @returns レシート
 */
const createReceipt = (total: number, deposit: number, change: number): Receipt => {
  return { total, deposit, change };
};
