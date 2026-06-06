/**
 * Shopee开店引导路径（4步）
 * 数据来源：docs/guide-content/shopee-step1-4-detail.md
 */

import type { GuidePath } from "./guide-types";

export const shopeeGuide: GuidePath = {
  id: "shopee",
  name: "Shopee开店",
  description: "从零到开好店铺，按顺序完成4个步骤。完成后前往「运营学堂」学习选品上架。",
  totalSteps: 4,
  estimatedDuration: "2-3周",
  steps: [
    // ── 步骤1：办理营业执照 ──
    {
      id: "1",
      title: "办理营业执照",
      estimatedTime: "7-10天",
      completionCriteria: "拿到营业执照 + 在国家企业信用信息公示系统能查到完整信息",
      preparations: [
        { text: "身份证原件（法人本人）" },
        { text: "手机号（接收验证码）" },
        { text: "想好的名称（准备3个备选，防重名）" },
        { text: "费用：0-400元（自己办免费，代办200-400元）" },
      ],
      operations: [
        {
          id: "sp1-1", title: "选择公司类型", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "individual", label: "个体工商户（只做台湾站）", description: "最简单、费用最低。台湾站中文沟通零语言障碍，新手最容易上手。以后想做东南亚站需要另外办有限公司。", followUpOperations: [] },
            { id: "company", label: "有限公司（可做台湾+东南亚+巴西）", description: "一步到位。有外贸流水可开马来/菲律宾/巴西站。一个人注册，告诉代办做「自然人独资」即可。", followUpOperations: [] },
          ],
        },
        {
          id: "sp1-2", title: "选择注册方式", estimatedTime: "5分钟", type: "decision",
          options: [
            {
              id: "online", label: "自己线上办（免费）", description: "全国线上办理率已达91.7%，大多数省份支持。",
              followUpOperations: [
                { id: "sp1-3a", title: "线上办理全流程", estimatedTime: "1小时", type: "action", content: "打开当地政务平台（百度搜「你的省份 + 企业开办 一网通办」）→ 注册登录 → 填写名称（3个备选）→ 经营范围建议包含「互联网零售」→ 填地址 → 上传身份证+场所证明 → 电子签名 → 提交。\n\n审核1-3个工作日。通过后领取电子版或纸质版执照。", confirmText: "已提交并拿到执照" },
              ],
            },
            {
              id: "agent", label: "找代办（200-400元）", description: "你只管提供材料，代办全程处理。超过400元要警惕。",
              followUpOperations: [
                { id: "sp1-3b", title: "找代办下单+提交材料", estimatedTime: "30分钟", type: "action", content: "淘宝/美团搜「营业执照代办 + 你的城市」→ 选评分4.8+ → 确认类型、地址、总价。\n\n发给代办：身份证照片、名称3个备选、经营范围建议含「互联网零售」。\n\n等待3-5个工作日出照。", confirmText: "执照已拿到" },
              ],
            },
          ],
        },
        { id: "sp1-x", title: "等待公示期", estimatedTime: "3-4天", type: "action", content: "在「国家企业信用信息公示系统」查到完整信息（名称、法人、地址、经营范围、状态「存续」）才算完成。\n\n搜不到就再等1-2天。", confirmText: "公示已完成" },
        { id: "sp1-y", title: "拍好执照照片备用", estimatedTime: "5分钟", type: "action", content: "正本副本都拍，四角完整，清晰无褶皱/阴影/反光/PS。\n\nShopee审核同样对照片质量要求高。", confirmText: "执照照片已拍好" },
      ],
      warnings: [
        "不要用几十块钱办的执照——过于便宜的可能是异常/旧执照，封店风险大",
        "个体户只能开台湾站，想做东南亚站需要有限公司+外贸流水",
        "代办费200-400元是正常范围，超过400元警惕被坑",
      ],
    },

    // ── 步骤2：注册Shopee店铺 ──
    {
      id: "2",
      title: "注册Shopee店铺",
      estimatedTime: "30分钟 + 1-3天审核",
      completionCriteria: "收到审核通过邮件，能登录Shopee中国卖家中心",
      preparations: [
        { text: "步骤1的营业执照（公示已完成）+ 清晰照片" },
        { text: "法人身份证原件（拍照+录视频认证）" },
        { text: "手机号 + 邮箱" },
        { text: "如有要求：主营店铺近3个月流水截图" },
      ],
      operations: [
        {
          id: "sp2-1", title: "确定开通站点", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "taiwan", label: "台湾站（推荐新手）", description: "中文沟通，零语言障碍。个体户即可开通。跨境卖家最多，竞争激烈但最容易上手。", followUpOperations: [] },
            { id: "sea", label: "东南亚站（需有限公司+外贸流水）", description: "马来西亚/菲律宾/巴西。需要有限公司营业执照+外贸流水证明。市场更大但门槛更高。", followUpOperations: [] },
          ],
        },
        { id: "sp2-2", title: "打开官方入驻页面", estimatedTime: "2分钟", type: "action", content: "百度搜「Shopee 入驻」或「虾皮 开店」→ 找到 shopee.cn 或 seller.shopee.cn 的官方链接 → 点击「立即入驻」→「填写申请表」。\n\n注意不要点竞价排名广告。", confirmText: "已打开官方入驻页面" },
        { id: "sp2-3", title: "创建主账号", estimatedTime: "5分钟", type: "action", content: "点击「点我注册」→ 输入手机号+验证码 → 设置密码。\n\n重要：你的账号会自动加上 :MAIN 后缀（如 xiaoming:MAIN）。冒号必须是英文冒号！中文冒号会导致后续登录失败。\n\n记好完整的主账号名+密码。", confirmText: "主账号创建成功" },
        { id: "sp2-4", title: "实名认证", estimatedTime: "5分钟", type: "action", content: "上传身份证正面（有头像面）和反面（有效期面）。\n录制人脸识别小视频（按提示操作）。\n\n照片要求：清晰、四角完整、无遮挡。", confirmText: "身份证+人脸认证完成" },
        { id: "sp2-5", title: "填写基本信息", estimatedTime: "10分钟", type: "action", content: "① 个人信息：真实姓名、职位填「运营」、邮箱、手机号\n② 过往经验：选「跨境电商」或「内贸电商」（影响可开通站点）\n③ 营业执照：上传照片+填公司名称+统一社会信用代码\n④ 办公地址：填实际地址（不要求和执照一致）", confirmText: "基本信息已填写" },
        { id: "sp2-6", title: "流水和视频认证（如需要）", estimatedTime: "15分钟", type: "action", content: "2025年后个体户申请台湾站可能不需要流水。如果入驻页面没要求，跳过此项直接提交。\n\n如需要：提供其他平台（淘宝/拼多多/1688）近3个月流水截图 + 登录店铺的屏幕录像 + 法人手持身份证视频。", confirmText: "已完成（或不需要此步骤）" },
        { id: "sp2-7", title: "提交审核", estimatedTime: "1-3天", type: "action", content: "检查所有信息 → 点击「提交」→ 等待1-3个工作日 → 审核结果通过邮件通知。", confirmText: "审核通过" },
        { id: "sp2-8", title: "审核通过后：加入企业微信", estimatedTime: "15分钟", type: "action", content: "① 下载「企业微信」App\n② 等待Shopee邀请加入商家群（审核通过后1-2天）\n③ 超过3天没收到 → 拨打Shopee客服电话\n④ 在企业微信「我」→ 个人名片 → 查看你的客户经理\n\n企业微信是和Shopee所有官方沟通的渠道，必须下载。", confirmText: "已加入商家群并确认客户经理" },
      ],
      warnings: [
        "Shopee没有二审——比TikTok美区好很多，审核通过就能用",
        "主账号格式 xxx:MAIN——冒号是英文冒号，很多人因为中文冒号登不上",
        "审核通过后有14天新手任务（下一步），不完成会少很多资源",
      ],
    },

    // ── 步骤3：绑定收款 + 基础设置 ──
    {
      id: "3",
      title: "绑定收款账户 + 基础设置",
      estimatedTime: "1-2小时",
      completionCriteria: "收款账户状态显示「活跃」（蓝色）+ 物流已设置 + 退货地址已设置",
      preparations: [
        { text: "身份证（收款平台认证）" },
        { text: "一张银行卡（提现用）" },
      ],
      operations: [
        {
          id: "sp3-1", title: "选择收款平台", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "lianlian", label: "连连国际（推荐）", description: "手续费约0.7%（2026年已降价）。如果做TikTok时已注册，可以直接用同一个账号，申请一个Shopee专用子账户即可。", followUpOperations: [
              { id: "sp3-2a", title: "注册/登录连连国际", estimatedTime: "15分钟", type: "action", content: "如果已有连连账号：登录后申请Shopee专用收款子账户。\n如果没有：lianlianglobal.com → 注册 → 跨境服务 → 出口 → 实名认证。", confirmText: "连连账号已就绪" },
            ]},
            { id: "pingpong", label: "PingPong", description: "手续费约1%。国内平台，操作类似连连。", followUpOperations: [
              { id: "sp3-2b", title: "注册PingPong", estimatedTime: "15分钟", type: "action", content: "PingPong官网注册 → 实名认证 → 申请Shopee收款账户。", confirmText: "PingPong账号已就绪" },
            ]},
            { id: "payoneer", label: "Payoneer（派安盈）", description: "手续费约1-2%，国际平台。", followUpOperations: [
              { id: "sp3-2c", title: "注册Payoneer", estimatedTime: "15分钟", type: "action", content: "payoneer.com → 注册企业账户 → 实名认证。", confirmText: "Payoneer账号已就绪" },
            ]},
          ],
        },
        { id: "sp3-3", title: "绑定收款到Shopee", estimatedTime: "15分钟", type: "action", content: "中国卖家中心（seller.shopee.cn）→ 左侧菜单「收款账户」→ 选择收款平台 → 按提示完成授权绑定。\n\n绑定成功后状态显示「活跃」（蓝色字体）。\n\n这是最重要的设置！不绑定收款 → 商品在前台不展示 → 买家看不到 → 等于没开店。", confirmText: "收款账户状态显示「活跃」" },
        { id: "sp3-4", title: "设置物流", estimatedTime: "10分钟", type: "action", content: "中国卖家中心 → 物流 → 物流设置：\n\n① 选择默认转运仓（SLS物流）：义乌仓（浙江货源）/ 华南仓东莞（广东货源）/ 上海仓 / 泉州仓。选离你货源最近的。\n② 寄送方式：选「快递寄送」\n③ 一键出货天数：默认3天，能更快就改成2天。", confirmText: "物流已设置" },
        { id: "sp3-5", title: "设置退货地址", estimatedTime: "5分钟", type: "action", content: "中国卖家中心 → 设置 → 我的地址 → 为每个已开通站点设置退货地址。\n\n填你的真实地址或货代地址。\n每个站点都要设——不设的话退货包裹会被Shopee直接销毁。", confirmText: "所有站点退货地址已设置" },
      ],
      warnings: [
        "收款不绑定 = 商品不展示 = 等于没开店——审核通过后第一件事就做这个",
        "每个站点的退货地址都要设，不设的话退货直接销毁",
        "Shopee用官方物流SLS，不需要自己找货代（和TikTok不同）",
        "Shopee台湾站总扣费约24.5%（佣金14%+手续费2.5%+技术费5%+预售费3%），定价时务必算清楚",
      ],
    },

    // ── 步骤4：完成新手任务 ──
    {
      id: "4",
      title: "完成新手任务（14天内）",
      estimatedTime: "5-14天",
      completionCriteria: "3项新手任务全部完成 + 被分配客户经理",
      preparations: [
        { text: "ERP工具（妙手/甩手/芒果，免费版即可）" },
        { text: "1688或拼多多账号（找货源用）" },
      ],
      operations: [
        { id: "sp4-1", title: "任务1：登录企业微信", estimatedTime: "10分钟", type: "action", content: "如果步骤2已完成这项，直接勾选。\n\n如果还没有：下载企业微信 → 等待Shopee邀请 → 加入商家群。", confirmText: "已加入Shopee商家群" },
        {
          id: "sp4-2", title: "任务2：5天内上架50款产品", estimatedTime: "2-3天", type: "decision",
          options: [
            {
              id: "erp", label: "用ERP工具批量上架（推荐）", description: "妙手/甩手/芒果店长，免费版就够用。效率高，1-2天搞定。",
              followUpOperations: [
                { id: "sp4-3a", title: "ERP批量上架", estimatedTime: "2-3小时", type: "action", content: "① 注册妙手（或其他ERP）→ 授权绑定Shopee店铺\n② 打开1688/拼多多 → 找想卖的商品\n③ 用ERP浏览器插件一键采集\n④ 在ERP后台编辑标题、价格、图片\n⑤ 一键发布到Shopee\n⑥ 重复直到上够50个\n\n采集注意：检查起批量（1-5件正常）、运费、图片水印。\n\n这50个目的是完成任务，不是打造爆品。选熟悉的日用品快速上满，后面再替换优化。", confirmText: "50个商品已上架" },
              ],
            },
            {
              id: "manual", label: "在Shopee后台手动上架", description: "一个一个创建商品。比较慢，50个要1-2天。",
              followUpOperations: [
                { id: "sp4-3b", title: "手动上架", estimatedTime: "1-2天", type: "action", content: "中国卖家中心 → 商品 → 新增商品。\n\n每个商品填：标题、类目、图片（至少1张，建议5-9张）、描述、价格库存、重量。\n\n重复50次。时间紧张建议用ERP。", confirmText: "50个商品已上架" },
              ],
            },
          ],
        },
        { id: "sp4-4", title: "任务3：完成新手考试", estimatedTime: "30分钟", type: "action", content: "在企业微信Shopee商家群里找到新手培训视频链接 → 观看视频 → 完成在线考试。\n\n考试可以多次尝试。边考边截图记录题目和答案。", confirmText: "新手考试已通过" },
      ],
      warnings: [
        "5天内上架50个商品是硬指标——第一天就开始做，不要拖延",
        "上架的商品不需要完美——目标是完成任务，后面再替换优化",
        "14天内完成所有任务 → 分配专属客户经理 → 有活动资源和培训",
        "每周日12点是节点——完成后次周一分配客户经理",
      ],
    },
  ],
};
