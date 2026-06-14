export interface Card {
  id: string;
  name: string;
  cashbackRate: number;
}

export interface PortalOffer {
  portalName: string;
  instantDiscount: number;
  portalCashback?: number; // Used for Gyftr/SmartBuy reward points
  notes?: string;
}

// Data based on actual Indian voucher ecosystems
export const voucherData: Record<string, Record<string, PortalOffer>> = {
  Swiggy: {
    "Park+": {
      portalName: "Park+ App",
      instantDiscount: 0.04, // Park+ usually offers a flat 4% off on Swiggy
      notes: "Buy using SBI Cashback for extra 5%",
    },
    SmartBuy: {
      portalName: "HDFC SmartBuy (Gyftr)",
      instantDiscount: 0.0,
      portalCashback: 0.05, // HDFC gives 5% CB or 5x Points here
      notes: "Best for HDFC Millennia/Infinia holders",
    },
    Direct: {
      portalName: "Direct App (No Voucher)",
      instantDiscount: 0.0,
    },
  },
  AmazonPay: {
    SBIGyftr: {
      portalName: "SBI Gyftr",
      instantDiscount: 0.0,
      portalCashback: 0.01, // 1% GV Coins earned
      notes: "Limits apply. Max ₹50k per month.",
    },
    Direct: {
      portalName: "Direct on Amazon",
      instantDiscount: 0.0,
    },
  },
  Zomato: {
    "Park+": {
      portalName: "Park+ App",
      instantDiscount: 0.05, // Park+ aggressively discounts Zomato
    },
    SmartBuy: {
      portalName: "HDFC SmartBuy (Gyftr)",
      instantDiscount: 0.0,
      portalCashback: 0.05,
    },
    Direct: {
      portalName: "Direct App (No Voucher)",
      instantDiscount: 0.0,
    },
  },
  Myntra: {
    "Park+": {
      portalName: "Park+ App",
      instantDiscount: 0.06, // Fashion vouchers have higher margins
    },
    SmartBuy: {
      portalName: "HDFC SmartBuy",
      instantDiscount: 0.04,
      portalCashback: 0.05, // Up to 9% total savings for HDFC users
    },
    Direct: {
      portalName: "Direct App (No Voucher)",
      instantDiscount: 0.0,
    },
  },
};

// Real baseline online reward rates
export const popularCards: Card[] = [
  {
    id: "sbi_cb",
    name: "SBI Cashback Card",
    cashbackRate: 0.05, // Flat 5% on almost all online voucher portals
  },
  {
    id: "hdfc_mill",
    name: "HDFC Millennia",
    cashbackRate: 0.05, // 5% via SmartBuy
  },
  {
    id: "amazon_icici",
    name: "Amazon Pay ICICI",
    cashbackRate: 0.02, // Gives 2% on non-Amazon spends (like Park+)
  },
  {
    id: "axis_ace",
    name: "Axis Ace Card",
    cashbackRate: 0.015, // Flat 1.5% online
  },
  {
    id: "generic_default",
    name: "Any Regular 1% Card",
    cashbackRate: 0.01,
  },
];
