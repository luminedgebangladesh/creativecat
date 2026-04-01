// Order: Personal (left), Enterprise (center/popular), Business (right) — matches real site
export const plans = [
  {
    tier: 'Personal Plan',
    price: 489,
    isPopular: false,
    duration: '1 Month',
    features: [
      { text: 'Brand Guidelines Negotiate', included: false },
      { text: '20 Personalized Designs', included: true },
      { text: '3 Full Format Videos + 7 Reels', included: true },
      { text: 'SEO Negotiate', included: false },
      { text: 'SMM- 10 Meta Ads Campaign Setup', included: true },
    ],
  },
  {
    tier: 'Business Plan',
    price: 1445,
    isPopular: true,
    duration: '3 Months',
    features: [
      { text: 'Brand Guidelines', included: true },
      { text: 'Unlimited Personalized Design', included: true },
      { text: 'Unlimited Video Editing', included: true },
      { text: 'Unlimited Ads Campaign Setup', included: true },
      { text: 'SEM Campaign Setup', included: true },
    ],
  },
  {
    tier: 'Enterprise Plan',
    price: 975,
    isPopular: false,
    duration: '2 Months',
    features: [
      { text: 'Brand Guidelines 50% Discount', included: true },
      { text: '42 Personalized Designs', included: true },
      { text: '5 Full Format Video + 16 Reels', included: true },
      { text: 'SEM Campaign Setup', included: true },
    ],
  },
]
