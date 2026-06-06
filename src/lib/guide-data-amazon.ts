/**
 * Amazon开店引导路径（5步）
 * 数据来源：docs/guide-content/amazon-step1-5-detail.md
 */

import type { GuidePath } from "./guide-types";

export const amazonGuide: GuidePath = {
  id: "amazon",
  name: "Amazon开店",
  description: "从零到开好店铺，按顺序完成5个步骤。Amazon启动成本最高、流程最长，但天花板也最高。完成后前往「运营学堂」学习选品上架。",
  totalSteps: 5,
  estimatedDuration: "3-5周",
  steps: [
    // ── 步骤1：准备全套材料 ──
    {
      id: "1",
      title: "准备全套材料",
      estimatedTime: "7-15天（主要等营业执照，其他材料1-2天可备齐）",
      completionCriteria: "企业营业执照 + 信用卡 + 纯净邮箱 + 收款账户 + 法人信息 全部准备完毕",
      preparations: [
        { text: "身份证原件（法人本人）" },
        { text: "费用：执照代办300-500元 + 信用卡（已有则免费）" },
      ],
      operations: [
        {
          id: "az1-1", title: "办理企业营业执照", estimatedTime: "7-15天", type: "action",
          content: "Amazon要求企业主体注册，不推荐个人或个体户。\n\n要求：\n- 类型：有限责任公司（一人有限公司也行，\"自然人独资\"）\n- ⚠️ 注册地址必须能收到实体信件——Amazon会寄明信片验证，虚拟地址收不到=注册失败\n- 经营范围：写\"日用百货销售\"\"互联网销售\"\"电子产品销售\"等\n- 费用：代办300-500元\n- 耗时：7-15天（含公示期）\n\n如果你在其他平台路径中已办过企业执照，直接用就行。\n\n办好后确认：在国家企业信用信息公示系统能查到完整信息。",
          confirmText: "企业营业执照已拿到且公示可查",
        },
        {
          id: "az1-2", title: "准备VISA/MasterCard信用卡", estimatedTime: "1-3天（已有则跳过）", type: "action",
          content: "Amazon从信用卡扣月费和其他费用。\n\n要求：\n- 必须是VISA或MasterCard（银联不行）\n- 账单地址最好和公司注册地址一致\n- 持卡人姓名后续要按卡面大小写一字不差地填写\n\n如果没有：去银行申请一张VISA卡，推荐招商银行或中信银行，通常1-2周下卡。",
          confirmText: "VISA/MasterCard信用卡已准备",
        },
        {
          id: "az1-3", title: "注册纯净邮箱", estimatedTime: "10分钟", type: "action",
          content: "一个全新注册的邮箱，没有用于注册过任何Amazon相关服务。不要用日常邮箱。\n\n推荐：126邮箱（国内稳定）、Gmail、Outlook/Hotmail。\n\n注册好后记录：邮箱地址+密码。后续注册、登录、申诉都要用这个邮箱。",
          confirmText: "纯净邮箱已注册",
        },
        {
          id: "az1-4", title: "开通收款账户", estimatedTime: "30分钟-1天", type: "decision",
          options: [
            {
              id: "wangyi", label: "网易支付（费率最低，推荐）",
              description: "费率0.6%（可谈到0.4%），到账最快1秒。",
              followUpOperations: [
                { id: "az1-4a", title: "注册网易支付", estimatedTime: "30分钟", type: "action", content: "访问网易支付官网 → 注册企业账户 → 实名认证（企业执照+法人身份证+银行卡）→ 认证通过后获取收款账号信息，后续在Amazon后台绑定。", confirmText: "网易支付账号已开通" },
              ],
            },
            {
              id: "lianlian", label: "连连支付（多平台通用）",
              description: "费率0.7%，如果已在其他平台开了连连可直接复用。",
              followUpOperations: [
                { id: "az1-4b", title: "注册/登录连连支付", estimatedTime: "30分钟", type: "action", content: "访问 global.lianlianpay.com → 注册账号 → 实名认证（企业执照+法人身份证+银行卡）→ 认证通过后获取收款账号信息。", confirmText: "连连支付账号已开通" },
              ],
            },
            {
              id: "other", label: "PingPong/Payoneer",
              description: "PingPong约1%+可能有汇率差，Payoneer费率较高但老牌。",
              followUpOperations: [
                { id: "az1-4c", title: "注册收款工具", estimatedTime: "30分钟", type: "action", content: "在对应平台官网注册企业账户 → 实名认证 → 获取收款账号信息。\n\n⚠️ 部分收款工具有隐藏汇率损耗，选之前问清楚\"汇率是按实时中间价还是有差价\"。", confirmText: "收款账户已开通" },
              ],
            },
          ],
        },
        {
          id: "az1-5", title: "整理法人身份证信息", estimatedTime: "5分钟", type: "action",
          content: "提前准备好注册时需要的法人信息：\n\n- 身份证原件（清晰拍照备用）\n- 姓名拼音写法（按信用卡格式，不写中间名）\n  例：张三 → ZHANG SAN\n  例：李小明 → LI XIAOMING\n- 身份证号\n- 身份证有效期\n- 签发国家：China\n\n拼音大小写和格式要和后续填写的信用卡持卡人一致。",
          confirmText: "法人身份证信息已整理",
        },
        {
          id: "az1-6", title: "建立信息备档表", estimatedTime: "10分钟", type: "action",
          content: "这是Amazon开店最重要的习惯。所有注册信息必须记录备档，后续申诉、找回密码、联系客服都要用。\n\n用Excel或备忘录记录：注册邮箱、邮箱密码、手机号、公司名称（中文+拼音）、统一社会信用代码、公司注册地址、法人姓名（中文+拼音）、身份证号、信用卡号后4位、收款账户类型、VPS IP地址（步骤2填）、注册日期、注册站点。",
          confirmText: "信息备档表已创建",
        },
      ],
      warnings: [
        "营业执照地址必须能收到明信片——虚拟地址/挂靠地址大概率收不到，注册失败且无法补救",
        "一套资料只能注册一个Amazon账号——同一执照+法人+信用卡+IP多开会被判定关联，所有店铺一起封",
        "不要花钱买招商链接——市面上的\"招商经理名额\"大概率是假的，通过GS.amazon.cn官方渠道获取",
        "Amazon启动成本是最高的——月费$39.99+VPS 300元/月+工具费+FBA备货，准备阶段就要清楚投入量级",
      ],
    },

    // ── 步骤2：购买VPS并配置环境 ──
    {
      id: "2",
      title: "购买VPS并配置环境",
      estimatedTime: "半天",
      completionCriteria: "VPS环境就绪，Chrome已安装，IP固定且纯净",
      preparations: [
        { text: "一张银行卡或支付宝（购买VPS用）" },
        { text: "步骤1创建的信息备档表" },
        { text: "费用：约300元/月（年付更便宜约200元/月）" },
      ],
      operations: [
        {
          id: "az2-1", title: "购买阿里云ECS", estimatedTime: "30分钟", type: "action",
          content: "推荐阿里云ECS（也可用腾讯云、华为云）。\n\n推荐配置：\n- 地域：华东/华南（离你最近）\n- 实例：2核CPU / 8GB内存\n- 系统：Windows Server 2022\n- 带宽：5Mbps\n- 存储：40-80GB SSD\n- 费用：约300元/月\n\n购买步骤：阿里云官网 → 云服务器ECS → 立即购买 → 选配置 → 设置登录密码 → 支付。",
          confirmText: "VPS已购买",
        },
        {
          id: "az2-2", title: "连接远程桌面", estimatedTime: "10分钟", type: "action",
          content: "Windows：按Win+R → 输入 mstsc → 回车 → 输入VPS公网IP → 输入用户名(Administrator)和密码 → 连接。\n\nMac：下载 Microsoft Remote Desktop（App Store免费）→ 添加连接 → 输入VPS公网IP和密码。\n\n连接成功后看到VPS桌面，和本地电脑一样操作。",
          confirmText: "远程桌面连接成功",
        },
        {
          id: "az2-3", title: "安装Chrome浏览器", estimatedTime: "10分钟", type: "action",
          content: "在VPS远程桌面里：\n1. 打开IE浏览器\n2. 访问 google.cn/chrome → 下载Chrome\n3. 安装并设为默认浏览器\n4. 登录你的纯净邮箱（不要登录个人Google账号）",
          confirmText: "Chrome已安装",
        },
        {
          id: "az2-4", title: "确认IP地址并验证纯净性", estimatedTime: "5分钟", type: "action",
          content: "在VPS的Chrome里访问 ip.sb 或 whatismyip.com → 记录IP地址 → 写入信息备档表。\n\n验证IP纯净性：百度搜索这个IP，看是否有其他人用它开过Amazon店。如果搜到相关记录，换一台VPS。",
          confirmText: "IP地址已记录且纯净性已确认",
        },
        {
          id: "az2-5", title: "了解VPS安全规则", estimatedTime: "5分钟", type: "action",
          content: "从现在开始必须遵守：\n\n必须在VPS上做的事：\n- 登录Amazon卖家后台和前台\n- 使用卖家精灵等运营工具\n\n绝对不要在VPS上做的事：\n- 登录个人社交媒体/邮箱\n- 浏览无关网站\n- 让其他人远程连接\n\n手机安全规则：\n- 手机可以登录Amazon卖家APP（用原生4G/5G网络）\n- ⚠️ 手机登录时绝对不要开VPN",
          confirmText: "已理解VPS安全规则",
        },
      ],
      warnings: [
        "IP关联几乎无法申诉——所有Amazon相关操作只在VPS上进行，一旦触发关联就完了",
        "VPS是持续费用——约300元/月，只要做Amazon就不能停",
        "不要用免费或共享VPS——免费VPS的IP大概率被用过，共享VPS关联风险极高",
        "VPS密码要强——被黑客入侵=Amazon账号信息泄露，用大小写+数字+特殊字符12位以上",
      ],
    },

    // ── 步骤3：注册Amazon卖家账号 ──
    {
      id: "3",
      title: "注册Amazon卖家账号",
      estimatedTime: "约1天（填写30分钟+等待视频验证预约）",
      completionCriteria: "注册申请提交成功，视频验证已预约",
      preparations: [
        { text: "步骤1准备的全套材料（执照、身份证、信用卡、邮箱、收款账户）" },
        { text: "步骤2配好的VPS环境" },
        { text: "步骤1的信息备档表" },
      ],
      operations: [
        {
          id: "az3-1", title: "选择注册站点", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "us", label: "美国站（推荐首选）", description: "流量最大（月访问25亿），Prime会员1.8亿。大多数教程和工具以美国站为基础。注册后可开通其他站点。", followUpOperations: [] },
            { id: "japan", label: "日本站", description: "复购率高，CPC低。需要日语Listing。", followUpOperations: [] },
            { id: "europe", label: "欧洲站", description: "CPC远低于美国。需要VAT税号（费用几千到几万）。", followUpOperations: [] },
          ],
        },
        {
          id: "az3-2", title: "在VPS上进入注册页面", estimatedTime: "5分钟", type: "action",
          content: "必须在VPS上操作。\n\n1. 连接VPS远程桌面\n2. 打开Chrome\n3. 访问 GS.amazon.cn（Amazon全球开店官方入口）\n4. 点击\"注册\"或\"立即开店\"\n5. 选择目标站点\n\n不要通过百度搜索进入，可能点到代注册广告。",
          confirmText: "已在VPS上打开注册页面",
        },
        {
          id: "az3-3", title: "填写注册信息", estimatedTime: "20分钟", type: "action",
          content: "逐项填写，每填一项都和备档表核对：\n\n① 邮箱验证：输入纯净邮箱 → 输入验证码\n② 公司信息：公司名称写中文（和执照一致）→ 公司拼音（空格隔开）→ 统一社会信用代码 → 注册地址写中文（和执照一致，用来收明信片）\n③ 法人信息：姓名写拼音（First name: 名, Last name: 姓）→ 身份证号 → 有效期（月/日/年）→ 签发国家China\n④ 企业受益人：法人持股超过25%勾选\"是\"\n⑤ 信用卡：卡号 → 有效期 → 持卡人姓名按卡面大小写一字不差 → 账单地址填公司注册地址\n⑥ 店铺名称：英文，可后改\n⑦ 上传文件：身份证正反面+营业执照（清晰四角完整）",
          confirmText: "所有注册信息已填写并和备档表核对",
        },
        {
          id: "az3-4", title: "提交注册并预约视频验证", estimatedTime: "5分钟", type: "action",
          content: "检查所有信息 → 点击\"提交\" → 系统引导预约视频验证 → 选一个可用时间段（通常1-3天内）→ 记录预约时间到备档表。\n\n提交后到视频验证之间，不要修改任何注册信息。",
          confirmText: "注册已提交，视频验证已预约",
        },
      ],
      warnings: [
        "所有信息必须记录——后续申诉会用到每一项，很多卖家因忘了注册信息导致申诉失败",
        "必须在VPS上操作——本地电脑注册=暴露真实IP=未来可能触发IP关联",
        "公司名称和地址写中文——Amazon中国团队寄中文明信片，写英文/拼音可能投递失败",
        "视频验证前不要修改信息——修改可能触发额外审核",
      ],
    },

    // ── 步骤4：视频验证 + 等待明信片 ──
    {
      id: "4",
      title: "视频验证 + 等待明信片",
      estimatedTime: "视频验证当天 + 明信片等待7-15天",
      completionCriteria: "视频验证通过 + 明信片验证码输入成功 + 账号状态显示\"正常\"",
      preparations: [
        { text: "步骤3记录的视频验证预约时间" },
        { text: "身份证原件（视频时展示）" },
        { text: "营业执照原件或清晰打印件" },
        { text: "Chime APP 或最新版Chrome浏览器+麦克风" },
        { text: "安静的环境" },
      ],
      operations: [
        {
          id: "az4-1", title: "准备视频验证", estimatedTime: "验证前30分钟", type: "action",
          content: "安装Amazon Chime APP（手机或电脑），或用Chrome+麦克风。确保网络稳定。\n\n物品放手边：身份证原件、营业执照、信息备档表。\n\n提前准备问题回答：\n- 计划卖什么类目？→ 说具体品类（如\"家居收纳\"），不说\"什么都卖\"\n- 月销目标？→ 合理数字（如\"月销1-2万美金\"）\n- 推广计划？→ \"先通过PPC广告获取初始流量，配合优化Listing提高转化率\"\n- 之前做过电商吗？→ 如实回答",
          confirmText: "视频验证工具和物品已准备好",
        },
        {
          id: "az4-2", title: "进行视频验证", estimatedTime: "10-20分钟", type: "action",
          content: "预约时间前5分钟打开Chime/浏览器 → 点击邮件中的视频验证链接 → 等待工作人员接入。\n\n⚠️ 只能用普通话，不接受英语或方言。\n\n验证过程：展示身份证正反面 → 可能展示营业执照 → 回答几个问题 → 全程约10-20分钟。\n\n不要紧张，这不是面试，是身份确认。回答简洁明了，确保光线充足证件字能看清。",
          confirmText: "视频验证已完成",
        },
        {
          id: "az4-3", title: "等待明信片", estimatedTime: "7-15天", type: "action",
          content: "视频验证通过后，Amazon寄明信片到公司注册地址。\n\n- 寄出时间：验证通过后1-3天\n- 到达时间：寄出后7-15天（国内邮政投递）\n- 外观：普通国际信件，写有Amazon字样\n- 内容：6位数验证码\n\n⚠️ 验证码8天内过期！收到后必须尽快输入。\n\n等待期间：提醒前台/物业/收件人注意查收来自Amazon的国际信件。不要期望快递送达，走的是邮政渠道。",
          confirmText: "已通知相关人员注意查收明信片",
        },
        {
          id: "az4-4", title: "输入明信片验证码", estimatedTime: "5分钟", type: "action",
          content: "收到明信片后：\n\n1. 在VPS上打开Chrome\n2. 登录 sellercentral.amazon.com（你注册站点的卖家中心）\n3. 系统提示输入验证码\n4. 输入明信片上的6位数验证码\n5. 点击确认\n\n验证通过后账号状态变为\"正常\"，可正常使用卖家后台所有功能。",
          confirmText: "验证码已输入，账号状态显示\"正常\"",
        },
      ],
      warnings: [
        "验证码8天过期——收到明信片后立刻输入，过期了要重新寄，又等1-2周",
        "手机登录不要开VPN——用手机原生4G/5G网络查看注册状态",
        "明信片地址=营业执照地址——改不了，办执照时就要考虑地址能否收信",
        "视频验证只能普通话——不接受英语/粤语/方言，提前练习要说的内容",
      ],
    },

    // ── 步骤5：绑定收款 + 基础设置 ──
    {
      id: "5",
      title: "绑定收款 + 基础设置",
      estimatedTime: "1-2小时",
      completionCriteria: "收款账户绑定成功 + 后台基础设置完成 + 店铺可正常运营",
      preparations: [
        { text: "步骤4验证通过的Amazon卖家账号" },
        { text: "步骤1开通的收款账户信息" },
        { text: "VPS环境" },
      ],
      operations: [
        {
          id: "az5-1", title: "绑定收款账户", estimatedTime: "15分钟", type: "action",
          content: "VPS → Chrome → 登录卖家中心 → 设置 → 账户信息 → 存款方式 → 添加存款方式。\n\n选择收款工具类型 → 输入收款账号信息 → 确认提交。\n\nAmazon结算周期：每14天结算一次（账号正常运营后）。",
          confirmText: "收款账户已绑定",
        },
        {
          id: "az5-2", title: "确认专业卖家计划", estimatedTime: "5分钟", type: "action",
          content: "卖家后台 → 设置 → 账户信息 → 查看费用计划，确认显示\"专业卖家\"。\n\n月费$39.99/月，从信用卡扣款，开通即开始计费。\n\n⚠️ 不要选\"个人卖家\"（每单额外$0.99，且无法投广告、无法使用品牌工具）。",
          confirmText: "已确认为专业卖家计划",
        },
        {
          id: "az5-3", title: "后台基础设置", estimatedTime: "30分钟", type: "action",
          content: "在VPS上登录卖家中心完成以下设置：\n\n① 入库设置（设置→配送设置→入库设置）\n- 默认分仓（Amazon按算法分到不同仓库），新手先用默认\n\n② 不可售库存自动移除（设置→FBA设置→自动移除）\n- 设置为30天后自动移除\n- 不设置的后果：不可售商品一直占仓位→累积仓储费\n\n③ 退货设置\n- FBA商品退货由Amazon处理\n- FBM商品需设置自己的退货地址\n\n④ 通知设置（设置→通知首选项）\n- 开启订单通知、绩效通知、政策变更通知",
          confirmText: "后台基础设置已完成",
        },
        {
          id: "az5-4", title: "了解品牌备案（强烈建议）", estimatedTime: "10分钟", type: "action",
          content: "品牌备案非必须但强烈建议做，解锁的功能直接影响销售转化率：\n\n- A+页面（转化率提升5-15%）\n- 品牌旗舰店、品牌故事\n- ABA数据（搜索词排名等独家数据）\n- SB品牌推广广告\n- Vine计划（官方测评，获取高质量Review）\n- 新店福利：品牌备案后一个自然年内5%佣金返还（最高返$50000）\n\n前提：需要已注册商标。\n- 中国商标：2000-4000元，TM回执约2周\n- 关键：TM回执即可备案，不必等R标（8-12个月）\n\n建议开店后就开始注册商标，拿到TM回执后立刻备案。",
          confirmText: "已了解品牌备案流程",
        },
      ],
      warnings: [
        "月费$39.99从开通即扣——不是出单才收费，尽快开始上架",
        "品牌备案的5%返佣是新店福利——仅限一个自然年内，越早备案享受越久",
        "不可售库存不设自动移除=仓储费黑洞——淡季$0.87/月，旺季$2.40，超365天暴涨约10倍",
        "2026年FBA配送费每件+$0.08——小标准件起步价$3.22，定价时要算进去",
      ],
    },
  ],
};
