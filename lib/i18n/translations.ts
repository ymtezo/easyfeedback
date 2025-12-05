// i18n translations for EasyFeedback

export const translations = {
  en: {
    common: {
      getStarted: "Get Started",
      learnMore: "Learn More",
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      dashboard: "Dashboard",
      settings: "Settings",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    },
    landing: {
      heroTitle: "Collect Feedback That Actually Matters",
      heroSubtitle:
        "The easiest way to gather, analyze, and act on user feedback. Built for developers, loved by users.",
      trustedBy: "Trusted by developers worldwide",
      features: "Features",
      pricing: "Pricing",
      docs: "Documentation",
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that fits your needs. Upgrade or downgrade anytime.",
      monthly: "Monthly",
      yearly: "Yearly",
      perMonth: "/month",
      perYear: "/year",
      contactUs: "Contact Us",
      currentPlan: "Current Plan",
      mostPopular: "Most Popular",
    },
    feedback: {
      submitFeedback: "Submit Feedback",
      thankYou: "Thank you for your feedback!",
      howLikely: "How likely are you to recommend us?",
      notLikely: "Not likely",
      veryLikely: "Very likely",
      additionalComments: "Any additional comments?",
      commentsPlaceholder: "Tell us more about your experience...",
    },
    dashboard: {
      overview: "Overview",
      projects: "Projects",
      analytics: "Analytics",
      apiKeys: "API Keys",
      webhooks: "Webhooks",
      team: "Team",
      totalFeedback: "Total Feedback",
      npsScore: "NPS Score",
      responseRate: "Response Rate",
      activeProjects: "Active Projects",
    },
  },
  ja: {
    common: {
      getStarted: "始める",
      learnMore: "詳しく見る",
      signIn: "ログイン",
      signUp: "新規登録",
      signOut: "ログアウト",
      dashboard: "ダッシュボード",
      settings: "設定",
      save: "保存",
      cancel: "キャンセル",
      delete: "削除",
      edit: "編集",
      create: "作成",
      loading: "読み込み中...",
      error: "エラー",
      success: "成功",
    },
    landing: {
      heroTitle: "本当に重要なフィードバックを収集",
      heroSubtitle:
        "ユーザーフィードバックを収集、分析、活用する最も簡単な方法。開発者のために作られ、ユーザーに愛される。",
      trustedBy: "世界中の開発者に信頼されています",
      features: "機能",
      pricing: "料金",
      docs: "ドキュメント",
    },
    pricing: {
      title: "シンプルで透明な料金体系",
      subtitle: "ニーズに合ったプランをお選びください。いつでもアップグレード・ダウングレード可能です。",
      monthly: "月額",
      yearly: "年額",
      perMonth: "/月",
      perYear: "/年",
      contactUs: "お問い合わせ",
      currentPlan: "現在のプラン",
      mostPopular: "人気",
    },
    feedback: {
      submitFeedback: "フィードバックを送信",
      thankYou: "フィードバックありがとうございます！",
      howLikely: "推奨度を教えてください",
      notLikely: "推奨しない",
      veryLikely: "強く推奨",
      additionalComments: "その他のコメント",
      commentsPlaceholder: "体験についてもっと教えてください...",
    },
    dashboard: {
      overview: "概要",
      projects: "プロジェクト",
      analytics: "分析",
      apiKeys: "APIキー",
      webhooks: "Webhook",
      team: "チーム",
      totalFeedback: "フィードバック総数",
      npsScore: "NPSスコア",
      responseRate: "回答率",
      activeProjects: "アクティブプロジェクト",
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

export function getTranslation(lang: Language, section: TranslationKey, key: string): string {
  const sectionData = translations[lang]?.[section] as Record<string, string> | undefined
  return sectionData?.[key] || translations.en[section]?.[key as keyof (typeof translations.en)[typeof section]] || key
}
