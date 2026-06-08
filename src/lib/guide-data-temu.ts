/**
 * Temu全托管开店引导路径（3步）
 * 数据来源：docs/guide-content/temu-step1-3-detail.md
 */

import type { GuidePath } from "./guide-types";

export const temuGuide: GuidePath = {
  id: "temu",
  name: "Temu全托管开店",
  description: "从零到开好店铺，按顺序完成3个步骤。个人身份证即可开店，3-5分钟下店。完成后前往「运营学堂」学习选品上架。",
  totalSteps: 3,
  estimatedDuration: "1-10天",
  steps: [
    // ── 步骤1：准备材料 ──
    {
      id: "1",
      title: "准备材料",
      estimatedTime: "1-3天（有身份证可当天完成；办执照另加7-10天）",
      completionCriteria: "证件就绪 + 发货设备到位",
      preparations: [
        { text: "主体证件（身份证 或 营业执照，见下方对比选择）" },
        { text: "热敏打印机（200-300元）" },
        { text: "打包耗材（纸盒/OPP袋/气泡袋，几十元）" },
        { text: "热敏纸（100x100mm规格）" },
        { text: "费用合计：纯个人店约300-400元设备费；个体户再加150元左右办照费" },
      ],
      operations: [
        {
          id: "tm1-1", title: "选择开店主体类型", estimatedTime: "10分钟", type: "decision",
          options: [
            {
              id: "personal", label: "个人店（身份证即可）",
              description: "最低门槛，适合纯试水。Temu全托管对主体类型没有功能限制，个人店和企业店卖货体验一样。唯一区别是店铺数量上限（全托管1个+半托管2个）。",
              followUpOperations: [
                { id: "tm1-2a", title: "准备身份证信息", estimatedTime: "5分钟", type: "action", content: "准备好以下信息：\n- 身份证原件（注册时需拍照上传）\n- 手机号（用于注册账号）\n- 邮箱（用于接收通知）\n- 微信App（用于实名认证扫码）", confirmText: "身份证和信息已准备好" },
              ],
            },
            {
              id: "individual", label: "个体工商户（推荐）",
              description: "门槛比企业低（一个人就能办），但店铺数量和企业一样（全托管1个+半托管3个）。办照费约150元，7-10天拿证。",
              followUpOperations: [
                { id: "tm1-2b", title: "办理个体户营业执照", estimatedTime: "7-10天", type: "action", content: "如果你在TikTok或Shopee路径中已办过营业执照，直接用那个就行，Temu对经营范围无限制。\n\n新办要点：\n- 费用：自办20-50元工本费，代办约150-400元\n- 耗时：7-10天（含公示期）\n- 经营范围：写\"日用百货销售\"\"互联网销售\"等常见范围即可\n- 代办费超过400元大概率被坑\n\n办好后：拍照备用（清晰、四角完整、无反光），等国家企业信用信息公示系统能查到。", confirmText: "营业执照已拿到" },
              ],
            },
            {
              id: "company", label: "企业（已有企业执照）",
              description: "直接用现有企业执照注册。Temu对企业经营范围无限制。",
              followUpOperations: [],
            },
          ],
        },
        {
          id: "tm1-3", title: "购买发货设备", estimatedTime: "1-2天（含快递）", type: "action",
          content: "全托管需要你自己打包发货到Temu国内仓（广东仓或义乌仓）。\n\n热敏打印机：\n- 推荐兴业360B，新品约350元/二手约180元\n- 或任何76mm宽热敏打印机，200-300元\n- 必须买热敏打印机（不是喷墨/激光），配热敏纸（不是铜板纸）\n- 热敏纸规格：100x100mm\n\n打包耗材：\n- OPP袋（50丝厚度，不低于0.38mm）\n- 气泡袋（易碎品防震）\n- 纸盒\n- 总共几十元，拼多多或1688购买",
          confirmText: "打印机和耗材已购买/已有",
        },
        {
          id: "tm1-4", title: "了解保证金规则", estimatedTime: "5分钟", type: "action",
          content: "全托管保证金1000元，不需要现在交。\n\n缴纳方式：平台会从你前1000元的货款中自动冻结。开店后出单赚到的前1000元被冻结为保证金，之后的货款正常结算。退店时退还（前提无未结罚款）。\n\n对比其他模式：\n- 全托管VMI：1000元，可从货款冻结（唯一不需要预缴的模式）\n- 全托管JIT：5000元，必须预缴\n- 半托管：10000元，必须充值",
          confirmText: "已了解保证金规则",
        },
      ],
      warnings: [
        "一个身份证/执照只能开一个全托管店铺——做砸了同一证件不能再注册新店",
        "证件信息提交后不能更换主体——不要用别人的证件注册",
        "营业执照不是必需品——Temu个人店只要身份证就能开，先试水不必花钱办照",
        "设备是一次性投入——打印机200-300元+耗材几十元，总共不到400元",
      ],
    },

    // ── 步骤2：注册开店 ──
    {
      id: "2",
      title: "注册开店",
      estimatedTime: "约10分钟操作 + 3-5分钟审核",
      completionCriteria: "收到开店成功通知，能正常登录Temu卖家后台",
      preparations: [
        { text: "步骤1选好的主体证件（身份证或营业执照照片）" },
        { text: "手机号 + 邮箱" },
        { text: "微信App（实名认证扫码）" },
        { text: "英文店铺名称（提前想好，如 GreenLeaf Store）" },
        { text: "店铺logo图片（300x300像素，可用Canva免费制作）" },
      ],
      operations: [
        { id: "tm2-1", title: "打开Temu跨境卖家中心官网", estimatedTime: "2分钟", type: "action", content: "在浏览器地址栏直接输入 seller.kuajingmaihuo.com，这是Temu跨境卖家中心的官方域名。\n\n不要百度搜索后点广告链接（代入驻服务/培训机构）。Temu注册完全免费，不需要代入驻。", confirmText: "已打开官方页面" },
        { id: "tm2-2", title: "注册账号", estimatedTime: "3分钟", type: "action", content: "点击\"注册\" → 输入手机号+验证码 → 输入邮箱+验证码 → 设置登录密码。\n\n密码建议记在手机备忘录或密码管理工具里。", confirmText: "账号注册成功" },
        { id: "tm2-3", title: "选择主体类型 + 上传证件", estimatedTime: "3分钟", type: "action", content: "根据步骤1的决定选择主体类型（个人/个体工商户/企业）。\n\n个人店：上传身份证正反面照片，系统自动识别，核对信息。\n个体户/企业：上传营业执照照片+法人身份证正反面，系统OCR识别，逐项核对。\n\n照片要求：清晰、四角完整、无反光、无遮挡。", confirmText: "证件已上传，信息全部正确" },
        { id: "tm2-4", title: "微信实名认证", estimatedTime: "1分钟", type: "action", content: "页面会出现二维码 → 打开手机微信扫码 → 按提示完成实名认证。\n\n必须是法人/身份证持有人本人的微信扫码。微信必须已实名（绑定过银行卡的都已实名）。", confirmText: "微信实名认证通过" },
        { id: "tm2-5", title: "签署协议 + 设置店铺信息", estimatedTime: "3分钟", type: "action", content: "签署仓储服务协议后，设置以下信息：\n\n① 店铺名称：必须英文，2-3个单词，首字母大写（如 Green Leaf Store）。不能用中文或拼音。\n② 店铺logo：300x300像素，简洁品牌图标，不要用个人照片。不合规会导致后续加站点失败。\n③ 主营类目：随便选，后期可以卖所有类目，不受限制。\n\n\"是否在其他平台经营\"：选\"否\"（选\"是\"会触发额外审核，没有好处）。", confirmText: "店铺信息已设置完毕" },
        { id: "tm2-6", title: "提交并等待审核", estimatedTime: "3分钟-5小时", type: "action", content: "检查所有信息无误后点击\"提交\"。\n\n审核时间：\n- 工作日：通常3-5分钟自动通过\n- 节假日/高峰期：可能需要3-5小时\n\n审核不通过常见原因：照片不清晰、信息不匹配、店铺名称含中文。按原因修改后重新提交。\n\n通过后不要急着上品，先完成步骤3的必做设置。", confirmText: "收到开店成功通知，能登录卖家后台" },
      ],
      warnings: [
        "店铺名称必须英文——最常见的驳回原因，不要写中文/拼音/中英混合",
        "\"是否在其他平台经营\"选否——选\"是\"触发额外审核，对开店结果没好处",
        "不要找代入驻——整个流程不超过10分钟，完全免费",
        "logo合规性影响后续扩展——上架后同步到90+国家站点，不合规会导致加站点失败",
      ],
    },

    // ── 步骤3：必做设置 + 绑定收款 ──
    {
      id: "3",
      title: "必做设置 + 绑定收款",
      estimatedTime: "约30分钟",
      completionCriteria: "收款账户已绑定 + 发货/退货地址已维护 + 库存回退已关闭 + 受益人模板已填写",
      preparations: [
        { text: "步骤2开通的Temu卖家后台账号" },
        { text: "收款账户信息（银行卡或第三方收款工具账号）" },
        { text: "发货地址（工厂代发或自有仓库地址）" },
        { text: "退货地址（建议用自己的办公/家庭地址）" },
      ],
      operations: [
        { id: "tm3-1", title: "维护发货地址", estimatedTime: "5分钟", type: "action", content: "卖家后台 → 店铺管理 → 地址管理 → 发货地址 → 新增地址。\n\n填写发货地址（自有仓库/工厂/1688代发供应商地址）、联系人和电话。\n\n发货地址决定发到哪个Temu仓：\n- 广东及周边 → 广东仓\n- 浙江/江苏及周边 → 义乌仓\n- 平台会自动分配最近的仓库", confirmText: "发货地址已维护" },
        { id: "tm3-2", title: "维护退货地址", estimatedTime: "3分钟", type: "action", content: "卖家后台 → 店铺管理 → 地址管理 → 退货地址 → 新增地址。\n\n建议填你自己的办公/家庭地址，不建议填工厂地址（退货件退到工厂容易丢件、弄混，你需要检查后决定是否二次销售）。", confirmText: "退货地址已维护" },
        { id: "tm3-3", title: "关闭库存回退（最重要的设置）", estimatedTime: "3分钟", type: "action", content: "卖家后台 → 店铺管理 → 仓储设置 → 找到\"库存回退\" → 关闭。\n\n库存回退是什么：仓库里商品超一定时间没卖出 → 平台自动退回给你 → 退回过程中有人下单但仓库没货 → 算你超卖 → 按申报价罚款。\n\n关闭后你手动控制库存，避免因自动退回导致的超卖罚款。这是新手最大的坑，多位老卖家反复强调。", confirmText: "库存回退已关闭" },
        {
          id: "tm3-4", title: "绑定收款账户", estimatedTime: "10分钟", type: "decision",
          options: [
            {
              id: "bank", label: "绑定银行卡（直接到账）",
              description: "个人店绑个人卡，个体户/企业绑对公账户。到账约1-3个工作日。",
              followUpOperations: [
                { id: "tm3-4a", title: "在后台绑定银行卡", estimatedTime: "5分钟", type: "action", content: "卖家后台 → 账户中心 → 收款管理 → 选择银行卡 → 填入卡号等信息。\n\n收款账户必须和注册主体一致（个人店绑个人卡，企业店绑对公账户），不一致会导致提现失败。", confirmText: "银行卡已绑定" },
              ],
            },
            {
              id: "lianlian", label: "绑定连连支付（推荐，费率0.7%）",
              description: "Temu官方推荐，费率最低，支持提现到国内银行卡。",
              followUpOperations: [
                { id: "tm3-4b", title: "注册并绑定连连支付", estimatedTime: "15分钟", type: "action", content: "1. 注册连连账号（global.lianlianpay.com）\n2. 完成实名认证（身份证+银行卡）\n3. 在连连后台获取收款账号信息\n4. 回到Temu卖家后台 → 收款管理 → 选择连连支付 → 填入收款账号\n\n收款账户必须和注册主体一致。", confirmText: "连连支付已绑定" },
              ],
            },
            {
              id: "other", label: "其他收款工具（PingPong/万里汇）",
              description: "PingPong约1%费率，万里汇约0.3-1%费率。",
              followUpOperations: [
                { id: "tm3-4c", title: "注册并绑定收款工具", estimatedTime: "15分钟", type: "action", content: "在对应收款平台注册账号 → 实名认证 → 获取收款账号信息 → 回到Temu后台绑定。", confirmText: "收款工具已绑定" },
              ],
            },
          ],
        },
        { id: "tm3-5", title: "确认保证金状态", estimatedTime: "2分钟", type: "action", content: "卖家后台 → 账户中心 → 保证金。\n\n确认全托管保证金1000元，从前1000元货款自动冻结。你现在不需要做任何操作，不需要主动充值。\n\n如果后台提示充值保证金，看清楚是哪种模式——全托管VMI可以从货款冻结，不必预缴。", confirmText: "已确认保证金状态" },
        { id: "tm3-6", title: "填写受益人模板", estimatedTime: "5分钟", type: "action", content: "卖家后台 → 账户管理 → 合规及登记验证 → 受益人模板。\n\n不填会导致：无法提现货款、商品只能加入约50个站点（填写后可加入90+站点）。\n\n填写内容：公司名称/个人名称、统一社会信用代码（个体户/企业填）、身份证号。如需盖章：A4纸打印→盖公章→拍照上传。", confirmText: "受益人模板已填写" },
        { id: "tm3-7", title: "了解欧代办理（不急着现在办）", estimatedTime: "5分钟", type: "action", content: "欧代=欧盟授权代理人，销往欧盟的商品必须有。费用99-150元，推荐通过Temu后台服务市场办理（最安全）。\n\n不需要开店时立刻办，上架第一个商品时系统会提示。\n\n第三方办理的欧代信息如果不合规（虚假地址/过期资质），商品会被批量下架且无法申诉。", confirmText: "已了解欧代办理（后续需要时再办）" },
      ],
      warnings: [
        "库存回退不关=等着被罚款——新手最大的坑，超卖按申报价赔付，开店第一天就关掉",
        "收款账户要和注册主体一致——个人店用个人卡，企业用对公账户，不一致提现失败",
        "全托管回款周期约15个工作日——加上物流时间，实际30-45天才到账，前期备货资金要有心理准备",
        "欧代通过后台办理更安全——第三方不合规的欧代会导致商品批量下架",
      ],
    },
  ],
};
