/**
 * 美区开店引导路径（5步）
 * 边界：到"店铺开通"为止，不含运营内容。
 *
 * 数据来源：docs/guide-content/us-step1-6-detail.md
 */

import type { GuidePath } from "./guide-types";

export const tiktokUsGuide: GuidePath = {
  id: "tiktok-us",
  name: "TikTok美区开店",
  description: "从零到开好店铺，按顺序完成5个步骤。完成后前往「运营学堂」学习选品上架。",
  totalSteps: 5,
  estimatedDuration: "3-5周",
  steps: [
    // ── 步骤1：办理有限公司 ──
    {
      id: "1",
      title: "办理有限公司营业执照",
      estimatedTime: "7-10天",
      completionCriteria: "拿到有限公司营业执照 + 公示系统查到完整信息",
      preparations: [
        { text: "身份证原件" },
        { text: "代办费300-800元" },
      ],
      operations: [
        { id: "u1-0", title: "确认必须办有限公司", estimatedTime: "1分钟", type: "action", content: "美区只接受有限公司，个体工商户不能入驻。\n一个人注册有限公司 = 「自然人独资有限公司」。\n注册资本建议填10-100万（认缴制，不用实际打钱）。不要填太高（如1000万），法律上你承担的责任和注册资本挂钩。\n一个自然人只能设立一家一人有限公司。\n\n⚠️ 注册地址选择（美区特别重要）：\n• 安全：独立租赁地址或真实住宅（能收信、能拍照、有水电账单）\n• 中等：集群/产业园地址（有实际办公空间但可能需要额外证明）\n• 高风险：纯虚拟挂靠地址（二审时无法提供场所照片→大概率被拒）\n\n美区TikTok注册时验证企业信息，后续二审可能要求提供经营地址证明。虚拟地址=二审失败概率大幅上升。", confirmText: "已确认需要有限公司" },
        {
          id: "u1-1", title: "选择注册方式", estimatedTime: "5分钟", type: "decision",
          options: [
            {
              id: "online", label: "自己线上办（免费）", description: "全国线上办理率已达91.7%。",
              followUpOperations: [
                {
                  id: "u1-2a", title: "选择注册地址", estimatedTime: "10分钟", type: "decision",
                  options: [
                    { id: "home", label: "住宅地址（免费）", description: "部分城市允许。", followUpOperations: [] },
                    { id: "park", label: "产业园地址（300-500元/年）", description: "推荐。合规成本低。", followUpOperations: [] },
                    { id: "ypc", label: "创业孵化器（可能免费）", description: "搜当地政策。", followUpOperations: [] },
                  ],
                },
                { id: "u1-3a", title: "线上办理", estimatedTime: "1小时", type: "action", content: "打开当地政务平台 → 企业开办 → 填写信息（名称3个备选、经营范围必含互联网销售+货物进出口、注册资本10-100万）→ 上传身份证+场所证明 → 电子签名 → 提交。审核1-3天。", confirmText: "已提交并拿到执照" },
              ],
            },
            {
              id: "agent", label: "找代办（300-800元）", description: "省心，适合大多数人。",
              followUpOperations: [
                {
                  id: "u1-2b", title: "选择注册地址", estimatedTime: "5分钟", type: "decision",
                  options: [
                    { id: "own", label: "用自己地址（代办费300-500元）", description: "你提供地址材料。", followUpOperations: [] },
                    { id: "park", label: "代办提供地址（合计400-800元/年）", description: "一条龙服务。", followUpOperations: [] },
                  ],
                },
                { id: "u1-3b", title: "找代办下单+提交材料", estimatedTime: "30分钟", type: "action", content: "淘宝/美团搜代办 → 选评分4.8+ → 确认：有限公司（自然人独资）、地址类型、总价、出照时间。\n\n发给代办：身份证照片、名称3个备选、经营范围（互联网销售+货物进出口）。", confirmText: "已下单并提交材料" },
                { id: "u1-4b", title: "等待出照", estimatedTime: "3-5天", type: "action", content: "代办处理中，等通知。", confirmText: "执照已拿到" },
              ],
            },
          ],
        },
        { id: "u1-x", title: "等待公示期", estimatedTime: "3-4天", type: "action", content: "在「国家企业信用信息公示系统」查到完整信息（名称、法人、地址、经营范围、状态「存续」）才算公示完成。", confirmText: "公示已完成" },
        { id: "u1-y", title: "拍好执照照片", estimatedTime: "5分钟", type: "action", content: "正本副本都拍，四角完整，清晰无褶皱/阴影/反光/PS。TikTok用AI审核。", confirmText: "执照照片已拍好" },
      ],
      warnings: [
        "美区不接受个体工商户，必须有限公司",
        "有限公司必须按月做账报税——建议同步找代记账（2000-5000元/年）",
        "经营范围必须含「互联网销售」和「货物进出口」",
        "代办费超过800元要警惕",
      ],
    },

    // ── 步骤2：设备与网络 ──
    {
      id: "2",
      title: "准备设备和网络环境",
      estimatedTime: "1-2天",
      completionCriteria: "电脑+紫鸟+美国IP+手机+网络 全部就绪",
      preparations: [
        { text: "电脑（已有即可）" },
        { text: "二手苹果手机（500-800元）" },
        { text: "美国IP费用（68-200元/月）" },
        { text: "手机网络环境（10-100元/月）" },
      ],
      operations: [
        { id: "u2-1", title: "确认电脑", estimatedTime: "5分钟", type: "action", content: "任何能上网的电脑都行。", confirmText: "电脑已准备好" },
        { id: "u2-2", title: "安装紫鸟浏览器", estimatedTime: "15分钟", type: "action", content: "美区建议用指纹浏览器，从注册第一刻起就在固定网络环境里。\n\n紫鸟官网下载→安装→手机号注册→登录。\n紫鸟本身免费，收费的是IP。\n\n备选：战斧浏览器（功能类似）。", confirmText: "紫鸟浏览器已安装" },
        { id: "u2-3", title: "购买美国IP", estimatedTime: "10分钟", type: "action", content: "紫鸟后台→设备管理→购买设备→选美国。\n\nIP类型：静态住宅IP（100-200元/月最安全）或阿里云（68元/月起能用）。\n\n选择州：尽量和后面填的仓库地址同州（常选加利福尼亚）。\n\n核心规则：一个IP只绑一个店铺，绑后永远不换！", confirmText: "美国IP已购买" },
        { id: "u2-4", title: "绑定IP到账号", estimatedTime: "5分钟", type: "action", content: "紫鸟→账号管理→添加账号→平台TikTok→地区美国本土→设名称→分配设备→选你的IP→确认。\n\n如果提示「该设备已绑定其他账号」→不要继续，两个店共用IP=关联封号。", confirmText: "IP已绑定到账号" },
        { id: "u2-5", title: "测试登录", estimatedTime: "5分钟", type: "action", content: "紫鸟→启动账号→在弹出的浏览器里打开 seller.tiktokglobalshop.com。\n能打开卖家后台登录页=配置成功。\n\n以后每次都通过紫鸟登录，不用普通浏览器。", confirmText: "通过紫鸟能打开卖家后台" },
        { id: "u2-6", title: "准备手机", estimatedTime: "1-2天", type: "action", content: "和东南亚相同：二手苹果→恢复出厂→语言English→地区United States→时区Los Angeles→配置网络环境→下载TikTok App。", confirmText: "手机和TikTok已就绪" },
      ],
      warnings: [
        "IP关联是美区最常见的封店原因——一个IP只绑一个店铺",
        "IP选择和店铺地址尽量同州",
        "永远通过紫鸟登录后台，不要用普通浏览器",
        "紫鸟免费，收费的是IP（68元/月起），别被忽悠",
      ],
    },

    // ── 步骤3：注册美区店铺 ──
    {
      id: "3",
      title: "注册TikTok美区店铺",
      estimatedTime: "30分钟操作 + 1-7天审核（含可能的二审）",
      completionCriteria: "审核通过（含二审），能登录卖家后台",
      preparations: [
        { text: "有限公司营业执照清晰照片" },
        { text: "法人身份证原件" },
        { text: "全新手机号 + 全新邮箱" },
        { text: "紫鸟浏览器+美国IP（步骤2配置好的）" },
      ],
      operations: [
        { id: "u3-1", title: "通过紫鸟打开入驻页面", estimatedTime: "5分钟", type: "action", content: "打开紫鸟→启动美区账号→在紫鸟浏览器里输入 seller.tiktokglobalshop.com 或百度搜官方入驻链接。\n\n从注册第一刻起就用紫鸟，不要用普通浏览器。", confirmText: "已在紫鸟里打开入驻页面" },
        { id: "u3-2", title: "注册账号", estimatedTime: "5分钟", type: "action", content: "新手机号+验证码→新邮箱+验证码→设置密码→勾选协议→注册。", confirmText: "账号注册成功" },
        { id: "u3-3", title: "填写入驻信息", estimatedTime: "5分钟", type: "action", content: "市场选 United States → 邀请码选「否」→ 企业注册地选「中国内地」→ 资质类型选「企业」→ 开启入驻。", confirmText: "入驻信息已填写" },
        { id: "u3-4", title: "上传执照+身份证+人脸认证", estimatedTime: "10分钟", type: "action", content: "上传有限公司执照照片（OCR识别后逐项核对）→ 上传身份证正反面 → 支付宝扫码人脸认证。\n\n美区审核比东南亚更严，照片质量尤其重要。", confirmText: "执照+身份证+人脸全部通过" },
        { id: "u3-5", title: "填写经营地址英文翻译", estimatedTime: "10分钟", type: "action", content: "用3个AI工具翻译地址取相同结果。\n\n关键坑点：先选省和市（下拉框），详细地址里不要再重复省市名！重复会被机审驳回。\n\n例：省选Beijing→市选Daxing→详细地址写No.118 Yongchang North Road, Yizhuang Town。不要写Beijing Daxing No.118...", confirmText: "地址已正确填写" },
        { id: "u3-6", title: "选择类目 + 设置名称 + 勾选官方账号", estimatedTime: "10分钟", type: "action", content: "推荐类目：居家日用、厨房用品、运动户外（什么都能往里套）。\n避开：美妆（全是大资本）、保健品（需FDA）、食品/液体/带电。\n\n店铺名称2-3个英文单词。\n\n必须勾选「同时创建TikTok官方账号」——不勾=没有补救机会。", confirmText: "类目+名称+官方账号全部设置好" },
        { id: "u3-7", title: "提交 + 等待审核", estimatedTime: "1-3天", type: "action", content: "检查所有信息后提交。等审核1-3天。\n\n审核通过后立即做：\n① 关闭默认包邮（不关=每单亏运费）\n② 关闭精选联盟自动添加\n③ 添加官方经理（企业微信）", confirmText: "审核通过，默认设置已关闭" },
        { id: "u3-8", title: "应对二审（如触发）", estimatedTime: "3-7天", type: "action", content: "2026年美区二审概率几乎100%，通过率60-80%。这不是你做错了。\n\n审核通过后48小时内观察是否收到「补充材料」通知。\n\n如果触发二审：\n- 常见要求：更清晰的执照/身份证、经营场所实拍照片、水电账单\n- 通过紫鸟登录后台→找到二审入口→上传材料→等3-7天\n- 通常有1-2次申诉机会\n\n48小时内没收到通知→恭喜，跳过此项。\n\n⚠️ 二审期间不要交保证金！没交保证金被拒只损失执照费300-800元。", confirmText: "二审已通过 或 未触发二审" },
      ],
      warnings: [
        "美区100%会遇到二审——不是你做错了，通过率60-80%",
        "二审期间不要交保证金——被拒+已交=10800元冻结30天+",
        "必须勾选「同时创建官方账号」——过了没有补救机会",
        "地址英文翻译不要在详细地址里重复省市名",
      ],
    },

    // ── 步骤4：绑定收款 + 缴纳保证金 ──
    {
      id: "4",
      title: "绑定收款 + 缴纳保证金",
      estimatedTime: "1-2小时",
      completionCriteria: "收款账户绑定成功 + W-8BEN已提交 + 保证金缴纳成功",
      preparations: [
        { text: "身份证（收款平台认证）" },
        { text: "国内银行卡（提现用）" },
        { text: "公司统一社会信用代码（W-8BEN用）" },
        { text: "$1500保证金（约10800元）" },
      ],
      operations: [
        {
          id: "u4-1", title: "选择收款平台", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "lianlian", label: "连连国际（推荐）", description: "费率千分之一，中文界面，TikTok卖家用的最多。", followUpOperations: [
              { id: "u4-2a", title: "注册连连国际", estimatedTime: "15分钟", type: "action", content: "lianlianglobal.com → 注册 → 中国大陆 → 跨境服务 → 出口 → 完成。", confirmText: "连连账号已注册" },
            ]},
            { id: "payoneer", label: "派安盈（Payoneer）", description: "国际平台，费率百分之一，适合多平台卖家。", followUpOperations: [
              { id: "u4-2b", title: "注册派安盈", estimatedTime: "15分钟", type: "action", content: "payoneer.com → 注册企业账户 → 填写信息 → 提交。", confirmText: "派安盈账号已注册" },
            ]},
          ],
        },
        { id: "u4-3", title: "实名认证", estimatedTime: "15-30分钟", type: "action", content: "上传有限公司执照+法人身份证+银行账户。审核通常当天通过。", confirmText: "实名认证通过" },
        { id: "u4-4", title: "申请TikTok收款账户并绑定", estimatedTime: "15分钟", type: "action", content: "收款平台→申请跨境收款账户→平台选TikTok Shop→站点选美国。\n\n获取银行信息后：卖家后台→支付信息→添加结算账号→粘贴Account Number和Routing Number→Account Type选Checking Account→确认。", confirmText: "收款账户绑定成功" },
        { id: "u4-5", title: "填写W-8BEN税务表格", estimatedTime: "15分钟", type: "action", content: "极其重要！不填=每笔收入被扣24%流水（不是利润！）。\n\n卖家后台→税务设置→填写税务表格。\n有限公司选W-8BEN-E。\n\n填写：公司英文名（和注册一致）、Country选China、地址（和注册一致）。\nForeign TIN填统一社会信用代码（执照上18位数字）。\n税收协定国家选China。\n电子签名→提交。\n\nW-8BEN有效期3年，到期前后台会提醒更新。", confirmText: "W-8BEN已提交并通过" },
        { id: "u4-6", title: "缴纳保证金", estimatedTime: "10分钟", type: "action", content: "确认：注册审核已通过 + 二审已通过或未触发 + 后台无异常提示。\n\n通过紫鸟登录后台→找到保证金入口→确认金额（$1500统一，约10800元，以后台显示为准）→选支付方式（支付宝/信用卡）→完成支付→截图保存凭证。\n\n保证金是押金不是费用：正常关店可退（30-90天），封店冻结至少90天。\n\n⚠️ 2026年新情况：多位卖家反馈，封店后90天到期资金仍未解冻，直接变为永久冻结。做好最坏打算：保证金$1500可能是沉没成本。不要在店铺稳定之前大量注册多个店铺。", confirmText: "保证金已缴纳，凭证已保存" },
      ],
      warnings: [
        "W-8BEN不填=每笔收入被扣24%流水——最容易被遗忘的致命步骤",
        "Account Type一定选Checking Account，不要选Savings Account",
        "美区新店回款周期T+31（约35-37天），出新手村后变T+8",
        "封店后保证金+在途货款全部冻结至少90天",
        "保证金金额以后台显示为准——$1500是2026年统一标准",
      ],
    },

    // ── 步骤5：物流设置 ──
    {
      id: "5",
      title: "物流设置（FBT）",
      estimatedTime: "30分钟",
      completionCriteria: "FBT物流已了解，运费模板已设置",
      preparations: [
        { text: "已完成步骤4的收款绑定和保证金" },
      ],
      operations: [
        { id: "u5-1", title: "了解FBT强制要求", estimatedTime: "10分钟", type: "action", content: "2025.12.15起美区强制使用FBT（Fulfilled by TikTok）官方物流，不能自行找货代发货。\n\nFBT模式：你把商品发到TikTok在美国的仓库，买家下单后由TikTok负责配送。\n\nFBT费用：\n- 配送费：0-4磅 $0.99-$3.99/件\n- 仓储费：前60天免费，之后按体积收费\n- 入仓方式：通过TikTok指定的头程物流商发货\n\n这意味着你需要额外准备5000-15000元的备货资金。", confirmText: "已了解FBT强制要求" },
        { id: "u5-2", title: "设置运费模板", estimatedTime: "10分钟", type: "action", content: "卖家后台→物流→运费模板→新建模板。\n\n建议设置：\n- 包邮门槛：设置满$X包邮（如满$15包邮）\n- ⚠️ 关闭全店默认包邮（步骤3应该已关闭，再确认一次）\n- 不包邮的运费：参考同类竞品的运费设置\n\n运费设置不合理=每单亏钱，这是新手最常犯的错误。", confirmText: "运费模板已设置" },
        { id: "u5-3", title: "了解FBT入仓流程（后续操作）", estimatedTime: "10分钟", type: "action", content: "FBT入仓流程概览（上架商品后才需要实际操作）：\n\n1. 在卖家后台创建入库计划\n2. 选择头程物流商（TikTok指定合作商）\n3. 将商品发到国内集货仓\n4. 集货仓→美国FBT仓库（约7-15天）\n5. 到仓后即可开始销售\n\n具体操作在上架商品后进行，现在先了解流程即可。", confirmText: "已了解FBT入仓流程" },
      ],
      warnings: [
        "2026年起强制FBT，不能自发货——\"出一单发一单\"的直邮模式已停用",
        "FBT备货卖不掉=库存积压+仓储费——不要首批备太多",
        "运费模板务必检查——关闭默认包邮是第一要务",
        "FBT前60天仓储免费——利用这个窗口期测品",
      ],
    },
  ],
};
