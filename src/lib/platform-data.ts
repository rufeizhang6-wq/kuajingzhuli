/**
 * 全平台对比数据
 *
 * 数据来源：5平台分析报告 + 官网验证
 * 最后更新：2026-06-06
 */

export interface PlatformInfo {
  id: string;
  name: string;
  tagline: string;
  suitableFor: string;
  startupBudget: string;
  fees: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  difficultyLabel: string;
  coreRisks: string[];
  coreAdvantages: string[];
  status: "live";
  guidePath: string;
  lastUpdated: string;
}

export const platforms: PlatformInfo[] = [
  {
    id: "temu",
    name: "Temu全托管",
    tagline: "最简单的跨境入门，平台帮你卖",
    suitableFor: "纯小白、预算极低、想先试水的人。个人身份证即可开店，不需要营业执照。",
    startupBudget: "3000-5000元",
    fees: "佣金10-20%（按品类，已非零佣金），国内运费平台承担50%",
    difficulty: 1,
    difficultyLabel: "最低",
    coreAdvantages: [
      "个人身份证即可，3-5分钟下店",
      "平台代运营（定价、推广、物流都由平台处理）",
      "保证金1000元可从货款冻结，不必预缴",
    ],
    coreRisks: [
      "平台控价，卖家无定价权，利润被压缩",
      "佣金10-20%（2026年已非零佣金）",
      "2026.5 被欧盟罚€2亿，欧洲站合规可能收紧",
    ],
    status: "live",
    guidePath: "/guide/temu",
    lastUpdated: "2026-06-06",
  },
  {
    id: "tiktok-sea",
    name: "TikTok东南亚",
    tagline: "最低成本学跨境全流程",
    suitableFor: "想学习跨境电商全流程的新手，个体户即可入驻。预算5千以上。",
    startupBudget: "8000-15000元",
    fees: "佣金2-8%（按品类）+ 交易费2% + $0.3/单",
    difficulty: 2,
    difficultyLabel: "低",
    coreAdvantages: [
      "门槛低，个体户即可，保证金$90且前90天免缴",
      "学习全流程的最佳练兵场",
      "商品卡可靠搜索自然流出单",
    ],
    coreRisks: [
      "2026年强制FBT官方物流，不能自发货",
      "客单价低利润薄（<10%），需要走量",
      "出村条件500单+60天（2026更新）",
    ],
    status: "live",
    guidePath: "/guide/tiktok-sea",
    lastUpdated: "2026-06-06",
  },
  {
    id: "shopee",
    name: "Shopee",
    tagline: "东南亚老牌电商，搜索流量为主",
    suitableFor: "想做东南亚/台湾市场的卖家，台湾站中文零障碍。个体户即可。",
    startupBudget: "5000-10000元",
    fees: "总扣费约24.5%（佣金14% + 技术费5% + 交易费2.5% + 预扣3%）",
    difficulty: 2,
    difficultyLabel: "低-中",
    coreAdvantages: [
      "3个月蜜月期（免佣金免保证金）",
      "台湾站中文沟通零语言障碍",
      "搜索+推荐流量为主，不需要拍视频",
    ],
    coreRisks: [
      "2026年总扣费从约13%涨至约24.5%，利润大幅压缩",
      "首站选定不可更改，一张执照只能注册一次",
      "第4个月保证金断崖（约3000元），忘缴直接冻结",
    ],
    status: "live",
    guidePath: "/guide/shopee",
    lastUpdated: "2026-06-06",
  },
  {
    id: "tiktok-us",
    name: "TikTok美区",
    tagline: "流量大、利润高，但门槛也高",
    suitableFor: "有一定资金和时间的卖家，想做高利润市场。需要企业营业执照。",
    startupBudget: "25000-45000元",
    fees: "佣金2-8%（按品类）+ 交易费2% + 保证金$1500",
    difficulty: 4,
    difficultyLabel: "中-高",
    coreAdvantages: [
      "客单价高（$15-50），单均利润8-15美金",
      "短视频+达人带货可带来爆发流量",
      "美国市场体量最大",
    ],
    coreRisks: [
      "保证金$1500统一（2026更新），FBT强制官方物流",
      "100%会遇到二审，通过率60-80%",
      "新店首笔回款T+31天，资金占用时间长",
    ],
    status: "live",
    guidePath: "/guide/tiktok-us",
    lastUpdated: "2026-06-06",
  },
  {
    id: "amazon",
    name: "Amazon",
    tagline: "全球最大电商，天花板最高",
    suitableFor: "有资金、有耐心、想做品牌的卖家。需要企业营业执照+VISA信用卡。",
    startupBudget: "30000-50000元起",
    fees: "佣金15%（大多数类目）+ FBA配送费$3.22起/件（2026年+$0.08）+ 月费$39.99",
    difficulty: 5,
    difficultyLabel: "最高",
    coreAdvantages: [
      "全球25亿月访问量，1.8亿Prime会员",
      "利润空间最大，适合品牌化运营",
      "品牌备案后5%佣金返还（最高$50000/年）",
    ],
    coreRisks: [
      "IP关联几乎无法申诉，必须用VPS隔离",
      "FBA备货卖不掉=库存积压+仓储费（超365天暴涨10倍）",
      "注册需视频验证+明信片，周期2-4周",
    ],
    status: "live",
    guidePath: "/guide/amazon",
    lastUpdated: "2026-06-06",
  },
];
