/**
 * HAMILTON EMPIRE — Storefront & Nigerian Market Configuration
 */

export interface DeliveryZone {
  id: string;
  label: string;
  eta: string;
  feeNaira: number;
}

export interface PaymentMethod {
  id: string;
  label: string;
  note: string;
}

export const STORE_CONFIG = {
  brandName: 'HAMILTON EMPIRE',
  tagline: 'Lagos Luxury Streetwear & Footwear',
  country: 'Nigeria',
  countryCode: 'NG',
  currencySymbol: '₦',
  currencyCode: 'NGN',

  // Business WhatsApp Contact
  whatsappNumberRaw: '2347079121697',
  whatsappNumberDisplay: '+234 7079121697',
  whatsappUrlBase: 'https://wa.me/2347079121697',

  // Lagos Showroom & Client Care (Nigeria)
  contactEmail: 'concierge@hamiltonempire.ng',
  showroomAddress: 'Number 7, Oyin Jolayemi Close, Victoria Island, Lagos, Nigeria',
  businessHours: 'Monday – Saturday · 10:00 AM – 7:00 PM WAT',

  // 3-Piece Look Bundle Pricing Rules
  bundleOriginalPrice: 95000,
  bundleDiscountPercent: 10,
  bundleDiscountedPrice: 85500,

  // Nigerian Delivery Zones & Fees (₦)
  deliveryZones: [
    {
      id: 'lagos-island',
      label: 'Lagos Island (Victoria Island, Ikoyi, Lekki)',
      eta: 'Same-day / 24 hours',
      feeNaira: 3500,
    },
    {
      id: 'lagos-mainland',
      label: 'Lagos Mainland (Ikeja, Yaba, Surulere)',
      eta: '1 – 2 business days',
      feeNaira: 4500,
    },
    {
      id: 'abuja',
      label: 'Abuja (FCT)',
      eta: '2 – 3 business days',
      feeNaira: 6000,
    },
    {
      id: 'nationwide',
      label: 'Port Harcourt, Ibadan, Enugu & Nationwide NG',
      eta: '2 – 4 business days',
      feeNaira: 6500,
    },
    {
      id: 'atelier-pickup',
      label: 'Victoria Island Showroom Pickup (Oyin Jolayemi Close)',
      eta: 'Ready within 4 hours',
      feeNaira: 0,
    },
  ] as DeliveryZone[],

  // Flexible Customer-Driven Nigerian Payment Options
  paymentMethods: [
    {
      id: 'bank-transfer',
      label: 'Bank Transfer (NGN)',
      note: 'Account details shared directly upon WhatsApp confirmation',
    },
    {
      id: 'pay-on-delivery',
      label: 'Pay on Delivery (POS / Cash)',
      note: 'Settle via POS or transfer on dispatch arrival in Lagos',
    },
    {
      id: 'mobile-wallet',
      label: 'OPay / PalmPay / Mobile Wallet',
      note: 'Fast Nigerian mobile wallet transfer at confirmation',
    },
    {
      id: 'card-checkout',
      label: 'Nigerian Debit / Verve / Naira Card',
      note: 'Secure Naira card payment link sent upon order review',
    },
    {
      id: 'customer-preference',
      label: 'Other / Customer Preferred Method',
      note: 'Specify how you would like to complete payment',
    },
  ] as PaymentMethod[],
};

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}
