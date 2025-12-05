// Pricing configuration - values can be changed as needed

export const PRICING_PLANS = {
  free: {
    name: "Free",
    subtitle: "For Students, Individuals, or Trial",
    price: 0,
    priceYearly: 0,
    features: [
      "Up to 100 feedback responses/month",
      "1 project",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
    limits: {
      feedbackPerMonth: 100,
      projects: 1,
      apiRequests: 1000,
      teamMembers: 1,
    },
  },
  pro: {
    name: "Pro",
    subtitle: "For Commercial or Research Use",
    price: 29, // Change this value as needed
    priceYearly: 290, // Change this value as needed
    features: [
      "Up to 10,000 feedback responses/month",
      "Unlimited projects",
      "Advanced analytics & benchmarks",
      "Priority support",
      "API access",
      "Custom branding",
      "Webhook integrations",
    ],
    limits: {
      feedbackPerMonth: 10000,
      projects: -1, // unlimited
      apiRequests: 100000,
      teamMembers: 10,
    },
  },
  enterprise: {
    name: "Enterprise",
    subtitle: "For Large Organizations",
    price: null, // Contact for pricing
    priceYearly: null,
    features: [
      "Unlimited feedback responses",
      "Unlimited projects",
      "Custom analytics & reporting",
      "Dedicated support",
      "SLA guarantee",
      "SSO/SAML authentication",
      "Custom integrations",
      "Data residency options",
      "Compliance certifications",
    ],
    limits: {
      feedbackPerMonth: -1, // unlimited
      projects: -1,
      apiRequests: -1,
      teamMembers: -1,
    },
  },
} as const

export type PlanKey = keyof typeof PRICING_PLANS
