/**
 * 测评V3：5平台推荐逻辑
 *
 * 推荐流程：
 * 1. 7道题（第7题为条件题）收集用户基本情况
 * 2. 硬门槛淘汰不合格平台
 * 3. 剩余平台按匹配度打分（0-20分）
 * 4. 按分数排序，展示推荐结果
 *
 * 覆盖平台：Temu全托管 / TikTok东南亚 / Shopee / TikTok美区 / Amazon
 *
 * 数据来源：
 * - 费用数据：5平台分析报告 + 官网验证（2026-06-03）
 * - 硬门槛：各平台官方入驻要求
 */

// ============ 类型定义 ============

export interface AssessmentQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: AssessmentOption[];
  /** 条件题：仅当指定问题的答案在 showWhen.values 中时显示 */
  showWhen?: { questionId: string; values: string[] };
}

export interface AssessmentOption {
  value: string;
  label: string;
  description: string;
}

export type Answers = Record<string, string>;

export interface PlatformRecommendation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  difficulty: "最低" | "低" | "低-中" | "中-高" | "最高";
  startupBudget: string;
  timeline: string;
  guideSteps: number;
  matchScore: number;
  matchReasons: string[];
  notMatchReasons: string[];
  /** 被硬门槛淘汰 */
  disqualified: boolean;
  disqualifyReason?: string;
  costBreakdown: { item: string; amount: string; required: boolean; note?: string }[];
  risks: string[];
  guidePath: string;
  dataSource: string;
}

// ============ 测评题目（7道） ============

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "goal",
    title: "你做跨境电商最看重什么？",
    subtitle: "不同目标适合不同平台",
    options: [
      {
        value: "learn",
        label: "先学会，不急着赚钱",
        description: "想了解这个行业，用最低成本试试",
      },
      {
        value: "side-income",
        label: "赚点副业收入",
        description: "每月多赚几千到一两万就满足",
      },
      {
        value: "full-income",
        label: "做成全职事业",
        description: "想靠这个养活自己",
      },
      {
        value: "scale",
        label: "想做出规模",
        description: "建团队、做品牌、赚大钱",
      },
    ],
  },
  {
    id: "budget",
    title: "你准备投入多少启动资金？",
    subtitle: "只算你亏得起的钱，不要借钱或用生活费",
    options: [
      {
        value: "under-2k",
        label: "2千元以下",
        description: "基本没有资金，但愿意花时间",
      },
      {
        value: "2k-5k",
        label: "2千-5千元",
        description: "有一小笔钱可以试水",
      },
      {
        value: "5k-1w",
        label: "5千-1万元",
        description: "准备好了认真投入一笔",
      },
      {
        value: "1w-3w",
        label: "1万-3万元",
        description: "有一定资金，能承受亏损",
      },
      {
        value: "over-3w",
        label: "3万元以上",
        description: "资金充足，可以做更大的投入",
      },
    ],
  },
  {
    id: "time",
    title: "你每天能花多少时间在这件事上？",
    subtitle: "跨境电商需要持续投入时间",
    options: [
      {
        value: "under-1h",
        label: "不到1小时",
        description: "碎片时间，不影响正常工作生活",
      },
      {
        value: "1-2h",
        label: "1-2小时",
        description: "每天抽出固定时间认真做",
      },
      {
        value: "3-5h",
        label: "3-5小时",
        description: "当副业重点投入",
      },
      {
        value: "full-day",
        label: "全天投入",
        description: "全职做这件事",
      },
    ],
  },
  {
    id: "content-ability",
    title: "你会拍视频或做内容吗？",
    subtitle: "TikTok的核心是内容，但不是所有平台都需要",
    options: [
      {
        value: "none",
        label: "完全不会也不想学",
        description: "不想拍视频，只想卖货",
      },
      {
        value: "willing",
        label: "不会但愿意学",
        description: "没经验，但可以从头学",
      },
      {
        value: "basic",
        label: "会一些基础",
        description: "玩过抖音/小红书，会简单拍剪",
      },
      {
        value: "good",
        label: "比较擅长",
        description: "做过短视频运营，有内容感觉",
      },
    ],
  },
  {
    id: "license",
    title: "你有营业执照吗？",
    subtitle: "不同平台对执照的要求不同",
    options: [
      {
        value: "none",
        label: "没有，也不想办",
        description: "就想用身份证试试",
      },
      {
        value: "willing",
        label: "没有，但愿意去办",
        description: "可以花一两周办下来",
      },
      {
        value: "individual",
        label: "有个体工商户执照",
        description: "已经注册了个体户",
      },
      {
        value: "company",
        label: "有企业营业执照",
        description: "有有限公司或其他企业主体",
      },
    ],
  },
  {
    id: "supply-chain",
    title: "你有货源吗？",
    subtitle: "有没有自己的产品或稳定的供应商",
    options: [
      {
        value: "none",
        label: "完全没有",
        description: "不知道卖什么，也不知道从哪进货",
      },
      {
        value: "can-find",
        label: "没有但会找",
        description: "能在1688上找到想卖的东西",
      },
      {
        value: "have-supplier",
        label: "有稳定供应商",
        description: "有合作的工厂或档口",
      },
      {
        value: "own-product",
        label: "有自己的产品",
        description: "自己是工厂或有自有品牌",
      },
    ],
  },
  {
    id: "product-type",
    title: "你的产品属于哪一类？",
    subtitle: "不同品类适合不同平台",
    showWhen: { questionId: "supply-chain", values: ["have-supplier", "own-product"] },
    options: [
      {
        value: "consumer",
        label: "日用消费品",
        description: "服装、家居、美妆、电子配件等",
      },
      {
        value: "unsure",
        label: "不确定",
        description: "还没想好具体卖什么",
      },
      {
        value: "industrial",
        label: "工业品/B2B产品",
        description: "机械零件、原材料、专业工具等",
      },
    ],
  },
];

// ============ 辅助函数 ============

/** Build the visible question sequence based on current answers */
export function getQuestionSequence(answers: Answers): AssessmentQuestion[] {
  return assessmentQuestions.filter((q) => {
    if (!q.showWhen) return true;
    const depAnswer = answers[q.showWhen.questionId];
    return depAnswer !== undefined && q.showWhen.values.includes(depAnswer);
  });
}

/** Whether a conditional question should show */
export function shouldShowConditional(
  question: AssessmentQuestion,
  answers: Answers
): boolean {
  if (!question.showWhen) return true;
  const depAnswer = answers[question.showWhen.questionId];
  return depAnswer !== undefined && question.showWhen.values.includes(depAnswer);
}

// ============ 硬门槛检查 ============

interface GateResult {
  pass: boolean;
  reason?: string;
}

function checkTemuGates(_answers: Record<string, string>): GateResult {
  return { pass: true };
}

function checkTikTokSEAGates(answers: Record<string, string>): GateResult {
  const budget = answers.budget;
  const license = answers.license;

  if (budget === "under-2k" || budget === "2k-5k") {
    return { pass: false, reason: "TikTok东南亚开店需要至少5000元启动资金（含备货）" };
  }
  if (license === "none") {
    return { pass: false, reason: "TikTok东南亚需要营业执照（个体户即可）" };
  }
  return { pass: true };
}

function checkShopeeGates(answers: Record<string, string>): GateResult {
  const license = answers.license;

  if (license === "none") {
    return { pass: false, reason: "Shopee需要营业执照（个体户即可）" };
  }
  return { pass: true };
}

function checkTikTokUSGates(answers: Record<string, string>): GateResult {
  const budget = answers.budget;
  const license = answers.license;

  if (budget === "under-2k" || budget === "2k-5k" || budget === "5k-1w") {
    return { pass: false, reason: "TikTok美区开店需要至少1万元启动资金（含$1500保证金+FBT备货）" };
  }
  if (license === "none" || license === "individual") {
    return { pass: false, reason: "TikTok美区要求企业营业执照（个体户不行）" };
  }
  return { pass: true };
}

function checkAmazonGates(answers: Record<string, string>): GateResult {
  const budget = answers.budget;
  const license = answers.license;

  if (budget === "under-2k" || budget === "2k-5k" || budget === "5k-1w" || budget === "1w-3w") {
    return { pass: false, reason: "Amazon开店需要至少3万元启动资金（含FBA备货+月费+工具费）" };
  }
  if (license === "none" || license === "individual") {
    return { pass: false, reason: "Amazon要求企业营业执照（不推荐个人或个体户）" };
  }
  return { pass: true };
}

// ============ 评分函数 ============

function scoreTemu(answers: Record<string, string>): { score: number; reasons: string[]; notReasons: string[] } {
  const { goal, budget, time, license } = answers;
  const content = answers["content-ability"];
  const supply = answers["supply-chain"];
  let score = 0;
  const reasons: string[] = [];
  const notReasons: string[] = [];

  if (budget === "under-2k") { score += 5; reasons.push("你的预算最适合Temu——3000元就能启动，保证金1000元还能从货款扣"); }
  else if (budget === "2k-5k") { score += 4; reasons.push("你的预算足以覆盖Temu全托管的启动成本"); }
  else if (budget === "5k-1w") { score += 3; }
  else if (budget === "1w-3w") { score += 2; }
  else { score += 1; notReasons.push("你的资金可以做利润更高的平台，Temu天花板较低"); }

  if (goal === "learn") { score += 4; reasons.push("Temu门槛最低、平台代运营，非常适合学习跨境电商流程"); }
  else if (goal === "side-income") { score += 3; reasons.push("Temu可以作为轻量副业，平台处理大部分运营工作"); }
  else if (goal === "full-income") { score += 1; notReasons.push("Temu利润空间有限（平台控价），很难靠单一Temu店做全职"); }
  else { score += 0; notReasons.push("Temu由平台控价，不适合想做规模化品牌的卖家"); }

  if (time === "under-1h") { score += 3; reasons.push("Temu全托管由平台处理运营，你只需要选品和备货，时间投入最少"); }
  else if (time === "1-2h") { score += 2; }
  else { score += 1; }

  if (content === "none") { score += 2; reasons.push("Temu不需要拍视频做内容，纯卖货模式"); }
  else { score += 1; }

  if (license === "none") { score += 3; reasons.push("Temu个人身份证就能开店，不需要营业执照"); }
  else { score += 1; }

  if (supply === "have-supplier" || supply === "own-product") { score += 2; reasons.push("有货源可以直接备货到Temu仓库"); }
  else if (supply === "can-find") { score += 2; }
  else { score += 1; reasons.push("没货源也行，可以从1688找品代发"); }

  return { score, reasons, notReasons };
}

function scoreTikTokSEA(answers: Record<string, string>): { score: number; reasons: string[]; notReasons: string[] } {
  const { goal, budget, time } = answers;
  const content = answers["content-ability"];
  const supply = answers["supply-chain"];
  let score = 0;
  const reasons: string[] = [];
  const notReasons: string[] = [];

  if (budget === "5k-1w") { score += 4; reasons.push("你的预算很适合在东南亚用最低成本学全流程"); }
  else if (budget === "1w-3w") { score += 3; }
  else if (budget === "over-3w") { score += 1; notReasons.push("你的资金可以做利润更高的市场，东南亚利润偏薄"); }
  else { score += 2; }

  if (goal === "learn") { score += 4; reasons.push("东南亚门槛低，是学习跨境全流程的最佳练兵场"); }
  else if (goal === "side-income") { score += 3; reasons.push("东南亚适合做副业，每月几千元利润可期"); }
  else if (goal === "full-income") { score += 1; notReasons.push("东南亚客单价低、利润薄，很难做成全职收入"); }
  else { score += 0; notReasons.push("东南亚市场体量有限，不太适合规模化"); }

  if (time === "under-1h") { score += 1; notReasons.push("东南亚开店需要每天至少1-2小时处理订单和选品"); }
  else if (time === "1-2h") { score += 3; reasons.push("每天1-2小时足够运营东南亚店铺"); }
  else { score += 2; }

  if (content === "good" || content === "basic") { score += 2; reasons.push("有内容能力在TikTok上是优势，可以通过短视频获取免费流量"); }
  else if (content === "willing") { score += 1; }
  else { score += 2; reasons.push("东南亚可以靠商品卡自然流出单，不强制做内容"); }

  if (supply === "have-supplier" || supply === "own-product") { score += 2; }
  else if (supply === "can-find") { score += 2; }
  else { score += 1; }

  return { score, reasons, notReasons };
}

function scoreShopee(answers: Record<string, string>): { score: number; reasons: string[]; notReasons: string[] } {
  const { goal, budget, time } = answers;
  const content = answers["content-ability"];
  const supply = answers["supply-chain"];
  let score = 0;
  const reasons: string[] = [];
  const notReasons: string[] = [];

  if (budget === "5k-1w") { score += 4; reasons.push("你的预算适合Shopee开店（启动约5000-10000元）"); }
  else if (budget === "1w-3w") { score += 3; }
  else if (budget === "2k-5k") { score += 2; }
  else if (budget === "over-3w") { score += 2; }
  else { score += 1; }

  if (goal === "side-income") { score += 4; reasons.push("Shopee适合做副业，东南亚多站点可扩展"); }
  else if (goal === "learn") { score += 3; reasons.push("Shopee有3个月蜜月期（免佣金免保证金），适合低成本学习"); }
  else if (goal === "full-income") { score += 2; }
  else { score += 1; }

  if (time === "under-1h") { score += 1; notReasons.push("Shopee需要处理新手任务和日常运营，每天至少1-2小时"); }
  else if (time === "1-2h") { score += 3; }
  else { score += 2; }

  if (content === "none") { score += 2; reasons.push("Shopee以搜索和推荐流量为主，不需要拍视频"); }
  else { score += 1; }

  if (supply === "have-supplier" || supply === "own-product") { score += 2; }
  else if (supply === "can-find") { score += 2; reasons.push("可以从1688选品一件代发到Shopee"); }
  else { score += 1; }

  notReasons.push("注意：Shopee 2026年总扣费约24.5%（佣金14%+技术费5%+交易费2.5%+预扣3%），利润需仔细计算");

  return { score, reasons, notReasons };
}

function scoreTikTokUS(answers: Record<string, string>): { score: number; reasons: string[]; notReasons: string[] } {
  const { goal, budget, time } = answers;
  const content = answers["content-ability"];
  const supply = answers["supply-chain"];
  let score = 0;
  const reasons: string[] = [];
  const notReasons: string[] = [];

  if (budget === "1w-3w") { score += 3; reasons.push("你的预算可以覆盖美区的基本启动成本"); }
  else if (budget === "over-3w") { score += 4; reasons.push("你的资金充足，可以覆盖FBT备货+保证金+投流测试"); }
  else { score += 1; }

  if (goal === "full-income" || goal === "scale") { score += 4; reasons.push("美区是TikTok利润天花板最高的市场，适合做成事业"); }
  else if (goal === "side-income") { score += 2; }
  else { score += 1; notReasons.push("美区投入大、门槛高，如果只是学习建议先从低成本平台开始"); }

  if (time === "3-5h" || time === "full-day") { score += 3; reasons.push("你的时间投入足够支撑美区运营"); }
  else if (time === "1-2h") { score += 2; notReasons.push("美区运营工作量较大，1-2小时会比较紧张"); }
  else { score += 1; notReasons.push("美区需要较多时间投入（选品+内容+达人+物流管理）"); }

  if (content === "good") { score += 3; reasons.push("内容能力强在TikTok美区是核心优势，可以获取免费流量"); }
  else if (content === "basic" || content === "willing") { score += 2; }
  else { score += 1; notReasons.push("TikTok美区虽然可以靠商品卡出单，但有内容能力增长会快很多"); }

  if (supply === "have-supplier" || supply === "own-product") { score += 3; reasons.push("有货源可以直接FBT备货，利润更可控"); }
  else if (supply === "can-find") { score += 2; }
  else { score += 1; }

  return { score, reasons, notReasons };
}

function scoreAmazon(answers: Record<string, string>): { score: number; reasons: string[]; notReasons: string[] } {
  const { goal, budget, time } = answers;
  const supply = answers["supply-chain"];
  const content = answers["content-ability"];
  const productType = answers["product-type"];
  let score = 0;
  const reasons: string[] = [];
  const notReasons: string[] = [];

  if (budget === "over-3w") { score += 4; reasons.push("你的资金足够支撑Amazon的启动投入（FBA备货+工具+月费）"); }
  else { score += 1; }

  if (goal === "scale") { score += 4; reasons.push("Amazon是全球最大电商平台，天花板最高，最适合做品牌和规模化"); }
  else if (goal === "full-income") { score += 3; reasons.push("Amazon利润空间大，成熟后可以做全职事业"); }
  else if (goal === "side-income") { score += 1; notReasons.push("Amazon运营复杂度高，不太适合轻量副业"); }
  else { score += 0; notReasons.push("Amazon学习成本高、启动慢，如果只是学习建议先从其他平台开始"); }

  if (time === "3-5h" || time === "full-day") { score += 3; reasons.push("你有足够时间投入Amazon运营（选品+Listing+广告+物流）"); }
  else if (time === "1-2h") { score += 1; notReasons.push("Amazon运营环节多，每天1-2小时会很紧张"); }
  else { score += 0; notReasons.push("Amazon不适合碎片时间运营"); }

  if (content === "none") { score += 1; reasons.push("Amazon不需要拍视频，靠搜索和广告获取流量"); }
  else { score += 1; }

  if (supply === "own-product") { score += 4; reasons.push("有自己的产品是Amazon最大的优势——可以做品牌、建护城河"); }
  else if (supply === "have-supplier") { score += 3; reasons.push("有稳定供应商可以保证FBA备货的稳定性和成本"); }
  else if (supply === "can-find") { score += 1; }
  else { score += 0; notReasons.push("Amazon依赖FBA备货，没有货源渠道会比较被动"); }

  if (productType === "industrial") {
    score += 3;
    reasons.push("工业品/B2B产品在Amazon上有成熟的销售渠道，其他平台以消费品为主");
  }

  return { score, reasons, notReasons };
}

// ============ 主推荐函数 ============

export function calculateRecommendation(
  answers: Record<string, string>
): PlatformRecommendation[] {
  const results: PlatformRecommendation[] = [];

  const platforms = [
    {
      id: "temu",
      name: "Temu全托管",
      tagline: "最简单的跨境入门，平台帮你卖",
      description: "在Temu上传产品，平台负责定价、运营、推广。你只需要选品和备货到国内仓库。个人身份证即可开店，3-5分钟下店。门槛最低，但平台控价，利润空间有限。",
      difficulty: "最低" as const,
      startupBudget: "3000-5000元",
      timeline: "1天开店（如已有执照），10天（需办执照）",
      guideSteps: 3,
      guidePath: "/guide/temu",
      costBreakdown: [
        { item: "营业执照（个体户）", amount: "150元左右", required: false, note: "个人身份证也能开店" },
        { item: "保证金", amount: "1000元", required: true, note: "可从前1000元货款冻结，不必预缴" },
        { item: "热敏打印机", amount: "200-300元", required: true },
        { item: "首批备货（20-30个品）", amount: "2000-3000元", required: true },
        { item: "欧代办理", amount: "99-150元", required: false, note: "卖欧洲站需要" },
      ],
      risks: [
        "平台控价，卖家无定价权，利润被平台压缩",
        "佣金10-20%（2026年已非零佣金），按品类浮动",
        "全托管备货卖不掉=库存积压，需自行承担",
        "回款周期约15个工作日，有资金占用",
        "2026.5 Temu被欧盟罚€2亿，欧洲站合规要求可能收紧",
      ],
      dataSource: "Temu完整分析报告，9套教程+官方培训验证，2026-06-03更新",
      gateCheck: checkTemuGates,
      scoreCalc: scoreTemu,
    },
    {
      id: "tiktok-sea",
      name: "TikTok东南亚",
      tagline: "最低成本学跨境全流程",
      description: "在TikTok东南亚（马来/菲律宾等）开店卖货。个体户即可入驻，保证金$90且前90天免缴。适合用最低成本学会跨境电商全流程。2026年强制使用官方物流FBT。",
      difficulty: "低" as const,
      startupBudget: "8000-15000元",
      timeline: "10-15天（含办执照+审核）",
      guideSteps: 4,
      guidePath: "/guide/tiktok-sea",
      costBreakdown: [
        { item: "个体户执照代办", amount: "200-300元", required: true },
        { item: "手机+网络环境", amount: "1000-1500元", required: true },
        { item: "保证金", amount: "$90（约650元）", required: false, note: "前90天免缴" },
        { item: "首批备货", amount: "3000-5000元", required: true },
        { item: "收款账户（连连）", amount: "提现费率0.7%", required: true },
      ],
      risks: [
        "2026年强制使用官方物流FBT，不能自发货",
        "东南亚客单价低，利润薄（<10%），需要走量",
        "中国卖家价格战激烈，已较内卷",
        "出村条件从200单变500单+60天（2026更新）",
        "COD（货到付款）拒签率高=货损",
      ],
      dataSource: "TikTok深度分析报告V2，5轮官网验证，2026-06-03更新",
      gateCheck: checkTikTokSEAGates,
      scoreCalc: scoreTikTokSEA,
    },
    {
      id: "shopee",
      name: "Shopee",
      tagline: "东南亚老牌电商，搜索流量为主",
      description: "在Shopee开跨境店，覆盖台湾、马来、泰国等市场。有3个月蜜月期（免佣金免保证金）。以搜索和推荐流量为主，不需要拍视频。但2026年费率大幅上涨。",
      difficulty: "低-中" as const,
      startupBudget: "5000-10000元",
      timeline: "10-15天（含办执照+审核）",
      guideSteps: 4,
      guidePath: "/guide/shopee",
      costBreakdown: [
        { item: "营业执照（个体户/企业）", amount: "200-500元", required: true },
        { item: "收款账户（连连）", amount: "提现费率0.7%", required: true },
        { item: "首批铺品（50SKU）", amount: "2000-5000元", required: true, note: "新手任务要求上传一定SKU" },
        { item: "保证金", amount: "约3000元", required: false, note: "前3个月免缴，第4个月起强制" },
      ],
      risks: [
        "2026年佣金涨至14-15%，新增技术费5%，总扣费约24.5%",
        "首站选定后不可更改",
        "一张执照只能注册一次，失败无法重来",
        "第4个月保证金断崖（约3000元），忘缴直接冻结",
        "AI自动检测扣分系统（2026更新），违规惩罚更严格",
      ],
      dataSource: "Shopee深度分析报告V2，官网验证，2026-06-03更新",
      gateCheck: checkShopeeGates,
      scoreCalc: scoreShopee,
    },
    {
      id: "tiktok-us",
      name: "TikTok美区",
      tagline: "流量大、利润高，但门槛也高",
      description: "在TikTok美区开店，通过短视频、商品卡和达人带货销售。客单价高、利润空间大，但需要企业执照、$1500保证金、FBT备货。2026年强制官方物流。",
      difficulty: "中-高" as const,
      startupBudget: "25000-45000元",
      timeline: "15-25天",
      guideSteps: 5,
      guidePath: "/guide/tiktok-us",
      costBreakdown: [
        { item: "企业营业执照", amount: "300-500元", required: true, note: "个体户不行" },
        { item: "保证金", amount: "$1500（约10800元）", required: true },
        { item: "手机+网络环境", amount: "1000-1500元", required: true },
        { item: "首批FBT备货", amount: "5000-20000元", required: true },
        { item: "投流测试", amount: "1000-3000元", required: false, note: "日预算20-50美金" },
        { item: "收款账户（连连）", amount: "提现费率0.7%", required: true },
      ],
      risks: [
        "2026年强制使用FBT官方物流，不能自发货",
        "保证金$1500统一标准（2026更新）",
        "出村条件500单+60天（2026更新）",
        "新店首笔回款T+31天，资金占用时间长",
        "GMV Max成为唯一广告类型（2026更新），学习成本增加",
        "减肥/健康声明类产品直接禁售",
      ],
      dataSource: "TikTok深度分析报告V2，5轮官网验证，2026-06-03更新",
      gateCheck: checkTikTokUSGates,
      scoreCalc: scoreTikTokUS,
    },
    {
      id: "amazon",
      name: "Amazon",
      tagline: "全球最大电商，天花板最高",
      description: "在Amazon开店，通过FBA（亚马逊物流）销售。全球25亿月访问量，1.8亿Prime会员。利润空间最大，但启动成本最高、运营最复杂、学习曲线最长。适合有资金、有耐心、想做品牌的卖家。",
      difficulty: "最高" as const,
      startupBudget: "30000-50000元起",
      timeline: "20-30天（含明信片等待）",
      guideSteps: 5,
      guidePath: "/guide/amazon",
      costBreakdown: [
        { item: "企业营业执照", amount: "300-500元", required: true },
        { item: "月费（专业卖家）", amount: "$39.99/月", required: true },
        { item: "VPS环境（阿里云）", amount: "约300元/月", required: true, note: "IP关联=必死" },
        { item: "VISA/MasterCard信用卡", amount: "已有则免费", required: true },
        { item: "选品工具（卖家精灵等）", amount: "约3700元/年", required: false, note: "可先用免费版" },
        { item: "首批FBA备货", amount: "10000-30000元", required: true },
        { item: "商标注册", amount: "2000-4000元", required: false, note: "TM回执即可品牌备案，不必等R标" },
        { item: "收款账户", amount: "费率0.3%-0.8%", required: true },
      ],
      risks: [
        "IP关联几乎无法申诉，必须用VPS隔离",
        "FBA备货卖不掉=库存积压+仓储费（旺季$2.40/立方英尺，超365天暴涨10倍）",
        "佣金15%（大多数类目）+ FBA配送费$3.22起",
        "注册需视频验证+明信片，周期长达2-4周",
        "2026年FBA每件涨$0.08",
        "学习曲线最长：选品→Listing→广告→物流→品牌，每个环节都有深度",
      ],
      dataSource: "Amazon深度分析报告V2（14套教程+10+位讲师），官网验证，2026-06-03更新",
      gateCheck: checkAmazonGates,
      scoreCalc: scoreAmazon,
    },
  ];

  // 特殊规则：工业品只推荐Amazon
  const productType = answers["product-type"];
  const isIndustrial = productType === "industrial";

  for (const platform of platforms) {
    if (isIndustrial && platform.id !== "amazon") {
      results.push({
        id: platform.id,
        name: platform.name,
        tagline: platform.tagline,
        description: platform.description,
        difficulty: platform.difficulty,
        startupBudget: platform.startupBudget,
        timeline: platform.timeline,
        guideSteps: platform.guideSteps,
        matchScore: 0,
        matchReasons: [],
        notMatchReasons: ["工业品/B2B产品主要在Amazon销售，其他平台以消费品为主"],
        disqualified: true,
        disqualifyReason: "工业品/B2B产品不适合此平台",
        costBreakdown: platform.costBreakdown,
        risks: platform.risks,
        guidePath: platform.guidePath,
        dataSource: platform.dataSource,
      });
      continue;
    }

    const gate = platform.gateCheck(answers);

    if (!gate.pass) {
      results.push({
        id: platform.id,
        name: platform.name,
        tagline: platform.tagline,
        description: platform.description,
        difficulty: platform.difficulty,
        startupBudget: platform.startupBudget,
        timeline: platform.timeline,
        guideSteps: platform.guideSteps,
        matchScore: 0,
        matchReasons: [],
        notMatchReasons: [gate.reason!],
        disqualified: true,
        disqualifyReason: gate.reason,
        costBreakdown: platform.costBreakdown,
        risks: platform.risks,
        guidePath: platform.guidePath,
        dataSource: platform.dataSource,
      });
      continue;
    }

    const { score, reasons, notReasons } = platform.scoreCalc(answers);

    results.push({
      id: platform.id,
      name: platform.name,
      tagline: platform.tagline,
      description: platform.description,
      difficulty: platform.difficulty,
      startupBudget: platform.startupBudget,
      timeline: platform.timeline,
      guideSteps: platform.guideSteps,
      matchScore: score,
      matchReasons: reasons,
      notMatchReasons: notReasons,
      disqualified: false,
      costBreakdown: platform.costBreakdown,
      risks: platform.risks,
      guidePath: platform.guidePath,
      dataSource: platform.dataSource,
    });
  }

  // 排序：未淘汰的按分数降序，同分按新手友好度排序
  const friendlinessOrder: Record<string, number> = {
    temu: 5,
    "tiktok-sea": 4,
    shopee: 3,
    "tiktok-us": 2,
    amazon: 1,
  };

  results.sort((a, b) => {
    if (a.disqualified && !b.disqualified) return 1;
    if (!a.disqualified && b.disqualified) return -1;
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return (friendlinessOrder[b.id] || 0) - (friendlinessOrder[a.id] || 0);
  });

  return results;
}
