/**
 * 东南亚开店引导路径（4步）
 * 到"绑定收款账户"为止。店铺设置/选品/出单放运营学堂。
 *
 * 数据来源：docs/guide-content/sea-step1-4-detail.md
 */

import type { GuidePath } from "./guide-types";

export const tiktokSeaGuide: GuidePath = {
  id: "tiktok-sea",
  name: "TikTok东南亚开店",
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
        { text: "费用：0-800元（自己办免费，代办200-800元）" },
      ],
      operations: [
        // 1-1 选择公司类型
        {
          id: "s1-1", title: "选择公司类型", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "individual", label: "个体工商户", description: "目前只做东南亚选这个。注册简单、费用低、税务简单（可核定征收）。以后做美区需另外注册有限公司。", followUpOperations: [] },
            { id: "company", label: "有限公司（自然人独资）", description: "以后也想做美区/欧洲必须有限公司。一个人注册，告诉代办做「自然人独资」即可。多花不了多少钱，但一步到位。", followUpOperations: [] },
          ],
        },
        // 1-2 选择注册方式
        {
          id: "s1-2", title: "选择注册方式", estimatedTime: "5分钟", type: "decision",
          options: [
            {
              id: "online", label: "自己线上办（免费）", description: "全国线上办理率已达91.7%，大多数省份支持全程网办。适合有电脑、有时间的人。",
              followUpOperations: [
                {
                  id: "s1-3a", title: "选择注册地址", estimatedTime: "10分钟", type: "decision",
                  options: [
                    { id: "home", label: "用自己家的住宅地址（免费）", description: "部分城市允许住宅注册。需要房产证/租赁合同。部分城市后期可能上门核查。", followUpOperations: [] },
                    { id: "park", label: "电商产业园/集群地址（300-500元/年）", description: "没有自己办公地点的推荐选择。合规、成本低。不要选几十块的虚拟地址。", followUpOperations: [] },
                    { id: "ypc", label: "YPC/创业孵化器（可能免费）", description: "搜「你的城市 + 创业孵化器」或「YPC社区」。部分城市有3-18个月免租+补贴。", followUpOperations: [] },
                  ],
                },
                { id: "s1-4a", title: "打开线上办理平台", estimatedTime: "5分钟", type: "action", content: "各省平台不同：\n- 全国通用：zwfw.samr.gov.cn\n- 北京：北京e窗通\n- 上海：上海一窗通\n- 广东/浙江：当地政务服务网\n- 其他：百度搜「你的省份 + 企业开办 一网通办」\n\n注册/登录账号 → 找到「企业开办」入口 → 点击「立即申请」。", confirmText: "已打开线上办理平台并登录" },
                { id: "s1-5a", title: "填写注册信息", estimatedTime: "20-30分钟", type: "action", content: "① 名称：[地区]+[字号]+[行业]+[组织形式]，准备3个备选\n② 经营范围（必须包含）：互联网销售（除销售需要许可的商品）、货物进出口\n③ 经营场所：填你选好的地址\n④ 经营者/法人信息\n⑤ 注册资本（有限公司填10-100万，认缴制不用实际打钱）\n\n经营范围在系统里输入关键词会弹出标准表述，直接选择即可。", confirmText: "所有信息已填写完成" },
                { id: "s1-6a", title: "上传材料 + 电子签名", estimatedTime: "15分钟", type: "action", content: "上传：身份证正反面 + 经营场所证明（清晰、四角完整、无反光）。\n\n电子签名：通过手机APP扫码/银行U盾/支付宝认证，按页面提示操作。\n\n提交申请，保存申请编号。审核通常1-3个工作日。", confirmText: "已提交申请并收到审核通过通知" },
                { id: "s1-7a", title: "领取营业执照", estimatedTime: "当天-3天", type: "action", content: "电子版：在平台直接下载（部分省份支持）。\n纸质版：到指定地点领取或选择邮寄到家。", confirmText: "已领取营业执照" },
              ],
            },
            {
              id: "offline", label: "自己去政务大厅办（免费）", description: "线上办不通、或你更习惯当面沟通。需要跑一趟当地政务服务中心。",
              followUpOperations: [
                {
                  id: "s1-3b", title: "选择注册地址", estimatedTime: "10分钟", type: "decision",
                  options: [
                    { id: "home", label: "住宅地址（免费）", description: "需房产证/租赁合同。部分城市允许。", followUpOperations: [] },
                    { id: "park", label: "产业园地址（300-500元/年）", description: "推荐大多数人选这个。", followUpOperations: [] },
                    { id: "ypc", label: "创业孵化器（可能免费）", description: "搜当地创业扶持政策。", followUpOperations: [] },
                  ],
                },
                { id: "s1-4b", title: "准备材料并去办理", estimatedTime: "半天", type: "action", content: "打印并带上：身份证原件+复印件、经营场所证明。\n\n百度搜「你的城市 + 政务服务中心」找地址。\n到现场取号 → 找企业登记窗口 → 告诉工作人员你要办的类型 → 填申请表 → 提交。\n\n经营范围告诉工作人员必须包含「互联网销售」和「货物进出口」。", confirmText: "已去政务大厅提交并领取执照" },
              ],
            },
            {
              id: "agent", label: "找代办公司办（200-800元）", description: "你只管提供材料，代办全程处理。适合不想折腾、或需要挂靠地址的人。",
              followUpOperations: [
                {
                  id: "s1-3c", title: "选择注册地址", estimatedTime: "5分钟", type: "decision",
                  options: [
                    { id: "own", label: "用自己的地址（代办费200-400元）", description: "代办只帮你跑流程，你提供地址材料。", followUpOperations: [] },
                    { id: "park", label: "代办提供地址（合计300-800元/年）", description: "代办提供集群/产业园地址，一条龙服务。", followUpOperations: [] },
                  ],
                },
                { id: "s1-4c", title: "找代办下单", estimatedTime: "30分钟", type: "action", content: "淘宝/美团/支付宝搜「营业执照代办 + 你的城市」。\n选评分4.8以上、月销量大于100的。\n\n确认：办个体户还是有限公司、地址类型和费用、总价、出照时间。\n\n价格参考：纯代办200-400元，代办+地址300-500元/年。超过800元要警惕。", confirmText: "已联系代办并下单" },
                { id: "s1-5c", title: "提交材料给代办", estimatedTime: "10分钟", type: "action", content: "微信/旺旺发给代办：\n- 身份证正反面清晰照片\n- 名称3个备选\n- 经营范围必须包含：互联网销售、货物进出口\n- 如果是有限公司：告诉代办「自然人独资，我一个人」", confirmText: "已提交所有材料" },
                { id: "s1-6c", title: "等待出照", estimatedTime: "3-5个工作日", type: "action", content: "代办处理中。期间可能联系你补充信息或进行人脸认证。", confirmText: "执照已拿到" },
              ],
            },
          ],
        },
        // 公示期（所有分支汇合）
        { id: "s1-x", title: "等待公示期", estimatedTime: "3-4天", type: "action", content: "打开「国家企业信用信息公示系统」（百度搜即可）。\n输入公司/个体户全称，检查：\n- 名称正确\n- 法人/经营者姓名正确\n- 注册地址正确\n- 经营范围包含「互联网销售」和「货物进出口」\n- 状态显示「存续」或「在营」\n\n全部显示 = 公示完成。搜不到就再等1-2天。", confirmText: "在公示系统查到了完整信息" },
        { id: "s1-y", title: "拍好执照照片备用", estimatedTime: "5分钟", type: "action", content: "TikTok用AI审核照片，要求严格：\n- 正本和副本都拍\n- 四个角完整露出\n- 每个字清晰可见\n- 没有褶皱、阴影、反光\n- 不用美颜/滤镜/PS\n- JPG/PNG格式，不超过5MB\n\n缺角/模糊/PS痕迹/电子版截图都会被判定为虚假材料。", confirmText: "已拍好清晰的执照照片（正本+副本）" },
      ],
      warnings: [
        "一个执照可注册5个TikTok店铺，但一个违规可能全部关联封号",
        "虚拟注册地址（100-200元那种）风险极高：被工商列异→执照作废→关联店铺全封",
        "执照从办理到可使用总共约7-10天（办理3-5天 + 公示3-4天）",
        "经营范围必须包含「互联网销售」和「货物进出口」，缺了开店可能遇到问题",
      ],
    },

    // ── 步骤2：准备设备和网络 ──
    {
      id: "2",
      title: "准备设备和网络环境",
      estimatedTime: "1-2天",
      completionCriteria: "电脑能登录TikTok卖家后台 + 手机能打开TikTok App",
      preparations: [
        { text: "一台电脑（已有的即可）" },
        { text: "一台手机（二手苹果iPhone 8以上，300-800元）" },
        { text: "网络环境费用（10-100元/月）" },
      ],
      operations: [
        { id: "s2-1", title: "确认电脑", estimatedTime: "5分钟", type: "action", content: "任何能上网的电脑都行，Windows/Mac都可以，不需要高配置。\n\n用途：登录TikTok Shop卖家后台管理商品、订单、广告。\n\n重要：东南亚跨境店不需要指纹浏览器（紫鸟/战斧是本土店才需要的）。直接用Chrome/Edge登录卖家后台即可。", confirmText: "电脑已准备好" },
        { id: "s2-2", title: "准备手机", estimatedTime: "1-2天（含快递）", type: "action", content: "推荐：iPhone 8/8 Plus（闲鱼二手300-500元，性价比最高）。\n备选：iPhone X/XR（500-800元）或 Google Pixel 3/4（300-600元）。\n\n闲鱼购买选「验机保障」，确认能开机、屏幕无碎裂、电池健康度大于80%。\n\n收到后恢复出厂设置：设置→通用→还原→抹掉所有内容和设置。\n这台手机专用于TikTok，不要和日常手机混用，不要插国内SIM卡。", confirmText: "手机已准备好并恢复出厂设置" },
        { id: "s2-3", title: "配置手机设置", estimatedTime: "10分钟", type: "action", content: "iPhone操作：\n① 设置→通用→语言与地区→首选语言改为English→地区改为目标市场（Malaysia/Philippines）\n② 设置→通用→日期与时间→关闭自动设置→手动选时区（马来Kuala Lumpur/菲律宾Manila，和北京同时区）\n③ 定位服务：可选关闭或仅对TikTok关闭", confirmText: "手机语言/地区/时区已设置" },
        { id: "s2-4", title: "配置网络环境", estimatedTime: "30分钟-1小时", type: "action", content: "TikTok App在国内无法使用，需要配置网络环境让手机「看起来」在海外。\n费用：约10-100元/月。\n\n我们不推荐具体工具（涉及网络政策，变化快），请自行搜索或在跨境电商社群咨询。\n\n还需要海外区Apple ID才能下载TikTok（国内App Store搜不到）。注册方法自行搜索或闲鱼购买（几块钱）。\n\n验证：打开TikTok能正常浏览视频 = 配置成功。", confirmText: "TikTok App已安装并能正常使用" },
      ],
      warnings: [
        "跨境店不需要指纹浏览器，不要花冤枉钱",
        "手机不要插国内SIM卡——TikTok可能通过SIM卡检测位置",
        "不要在同一台手机上登录多个TikTok账号——一台设备一个账号",
      ],
    },

    // ── 步骤3：注册TikTok东南亚跨境店 ──
    {
      id: "3",
      title: "注册TikTok Shop店铺",
      estimatedTime: "30分钟 + 1-3天审核",
      completionCriteria: "收到审核通过通知，能正常登录TikTok Shop卖家后台",
      preparations: [
        { text: "步骤1的营业执照（公示系统已能查到）+ 清晰照片" },
        { text: "法人身份证原件（拍照上传+人脸认证）" },
        { text: "一个全新手机号（从未注册过TikTok）" },
        { text: "一个全新邮箱（推荐Outlook，免费注册）" },
      ],
      operations: [
        {
          id: "s3-1", title: "选择目标站点", estimatedTime: "5分钟", type: "decision",
          options: [
            { id: "malaysia", label: "马来西亚（首选）", description: "运费最低（500g仅13元）、华人占23%可用中文直播、退货率低、消费力中等。新手最不容易亏钱的站点。", followUpOperations: [] },
            { id: "philippines", label: "菲律宾（首选）", description: "人口1.2亿体量大、消费意愿强（发周薪冲动消费多）。但运费较高（500g约28元）、COD拒签率高。", followUpOperations: [] },
            { id: "other", label: "其他站点（不推荐新手）", description: "泰国（关税涨了）、越南（退货高）、新加坡（市场太小运费42元）、印尼（无跨境店）。先从马来或菲律宾开始。", followUpOperations: [] },
          ],
        },
        { id: "s3-2", title: "打开官方入驻页面", estimatedTime: "2分钟", type: "action", content: "方法1：百度搜「TikTok Shop 入驻」，找标注「官方」的链接。排在最前面的可能是广告，不要点。\n方法2：直接输入 seller.tiktokglobalshop.com\n方法3：抖音App搜「TikTok Shop官方」→ 进入官方直播间 → 小风车里的入驻链接。", confirmText: "已打开官方入驻页面" },
        { id: "s3-3", title: "注册账号", estimatedTime: "5分钟", type: "action", content: "输入新手机号（+86）→ 验证码 → 输入新邮箱 → 验证码 → 设置密码（记在手机备忘录里）→ 勾选协议 → 注册。", confirmText: "账号注册成功" },
        { id: "s3-4", title: "填写入驻信息", estimatedTime: "3分钟", type: "action", content: "① 选择市场：你决定的站点（如Malaysia）\n② 邀请码：选「否」\n③ 企业注册地：中国内地\n④ 企业资质类型：选「企业」（个体户也选这个）\n⑤ 点击「开启入驻」", confirmText: "入驻信息已填写" },
        { id: "s3-5", title: "上传营业执照", estimatedTime: "5分钟", type: "action", content: "上传执照照片 → 系统OCR自动识别信息 → 逐项检查：公司名称、统一社会信用代码、法人、地址、有效期。\n\n公司英文名称：点「翻译并填写」按钮自动翻译。\n\n照片必须清晰、四角完整、无反光。", confirmText: "执照上传完成，识别信息正确" },
        { id: "s3-6", title: "上传身份证 + 人脸认证", estimatedTime: "5分钟", type: "action", content: "上传身份证正反面 → 系统识别姓名和身份证号。\n\n人脸认证：点击「验证人脸」→「前往认证」→「用手机识别人脸」→ 屏幕出现二维码 → 打开支付宝扫码 → 按提示完成人脸识别。\n\n必须法人本人操作，确保光线充足、面部无遮挡。", confirmText: "身份证上传+人脸认证通过" },
        { id: "s3-7", title: "选择经营类目", estimatedTime: "5分钟", type: "action", content: "推荐：居家日用、厨房用品（需求大、无资质、轻小件）。\n备选：手机配件、运动户外。\n\n避开：食品/保健品（需资质）、美妆（竞争极烈）、带电产品（物流限制）、粉末/液体、大体积。\n\n跨境店类目选了不能改，想清楚再选。不确定就选「居家日用」——涵盖范围广。", confirmText: "已选择经营类目" },
        { id: "s3-8", title: "设置店铺名称 + 勾选官方账号", estimatedTime: "5分钟", type: "action", content: "店铺名称：2-3个英文单词，简短好记，一个月只能改一次。\n\n必须勾选「同时创建TikTok官方账号」！\n不勾后果：进入考核期后开不了官方号和渠道号 → 店铺被限制（最多上20个商品、每天最多出5单、限流）→ 没有补救机会。", confirmText: "名称已设置 + 已勾选创建官方账号" },
        { id: "s3-9", title: "检查并提交", estimatedTime: "3分钟", type: "action", content: "从头到尾检查：市场、执照信息、身份证、人脸、类目、店铺名称、官方账号勾选。全部确认后点击「提交入驻」。", confirmText: "已提交入驻申请" },
        { id: "s3-10", title: "等待审核", estimatedTime: "1-3个工作日", type: "action", content: "等短信/邮件通知。如果被驳回，查看原因（照片不清晰/信息不一致/类目有误），修改后重新提交。", confirmText: "审核通过" },
        { id: "s3-11", title: "审核通过后立即做4件事", estimatedTime: "15分钟", type: "action", content: "① 关闭默认包邮：卖家后台→订单→物流设置→关掉「全店包邮」。不关=每单亏运费！\n② 关闭精选联盟自动添加：联盟中心→关掉「自动添加商品」。\n③ 不要交保证金：前90天免缴$90，到第85天再交。\n④ 添加官方经理：后台右上角→帮助和支持→扫码添加企业微信。\n⑤ 了解物流要求（2026年重大变化）：2026.2.9起东南亚跨境卖家必须使用TikTok官方物流，不能自行找货代。「出一单发一单」的直邮模式已停用，需提前备货到TikTok指定仓库。", confirmText: "5件事全部完成" },
      ],
      warnings: [
        "注册时必须勾选「同时创建TikTok官方账号」——过了就没机会补",
        "审核通过后第一时间关闭默认包邮——真实案例：50单一夜每单亏运费",
        "一个手机号只能注册一个店铺",
        "经营地址英文翻译：用3个AI工具翻译取相同结果，详细地址不要重复写省市名",
        "2026年起强制官方物流，不能再零库存直邮——需要提前备货到TikTok仓库",
      ],
    },

    // ── 步骤4：绑定收款账户 ──
    {
      id: "4",
      title: "绑定收款账户",
      estimatedTime: "1-2小时",
      completionCriteria: "收款平台实名认证通过 + 已绑定到TikTok店铺后台",
      preparations: [
        { text: "身份证原件（收款平台实名认证）" },
        { text: "一张国内银行卡（储蓄卡即可）" },
        { text: "店铺里至少上架了一个商品（绑定时需填商品链接；如还没有，先跳到运营学堂上一个再回来）" },
      ],
      operations: [
        {
          id: "s4-1", title: "选择收款平台", estimatedTime: "5分钟", type: "decision",
          options: [
            {
              id: "lianlian", label: "连连国际（推荐新手首选）", description: "提现手续费约千分之一。国内用的最多，中文界面，客服快。经常有福利活动。",
              followUpOperations: [
                { id: "s4-2a", title: "注册连连国际", estimatedTime: "15分钟", type: "action", content: "搜索「连连国际」或访问 lianlianglobal.com → 注册 → 选地区：中国大陆 → 手机号+验证码+密码 → 服务类型：跨境服务 → 业务方向：出口。", confirmText: "连连账号已注册" },
              ],
            },
            {
              id: "worldfirst", label: "万里汇（WorldFirst）", description: "阿里旗下，稳定可靠。提现手续费约千分之三。",
              followUpOperations: [
                { id: "s4-2b", title: "注册万里汇", estimatedTime: "15分钟", type: "action", content: "访问 worldfirst.com.cn → 跨境电商注册 → 填写信息 → 提交。", confirmText: "万里汇账号已注册" },
              ],
            },
            {
              id: "payoneer", label: "派安盈（Payoneer）", description: "国际平台，全球通用。提现手续费约百分之一。适合多平台卖家。",
              followUpOperations: [
                { id: "s4-2c", title: "注册派安盈", estimatedTime: "15分钟", type: "action", content: "访问 payoneer.com → 注册企业账户 → 填写信息 → 提交。", confirmText: "派安盈账号已注册" },
              ],
            },
          ],
        },
        { id: "s4-3", title: "完成实名认证", estimatedTime: "15-30分钟", type: "action", content: "登录收款平台后台 → 找到「实名认证」入口。\n\n有限公司选「企业认证」，个体户选「个体户/个人认证」。\n\n上传：营业执照+法人身份证+银行卡信息。\n审核通常当天通过，最长1-2个工作日。", confirmText: "实名认证已通过" },
        { id: "s4-4", title: "申请TikTok收款账户", estimatedTime: "10分钟", type: "action", content: "收款平台后台 → 收款 → 申请跨境收款账户。\n\n选平台：TikTok Shop（跨境店和ACCU店）。\n选站点：你开店的东南亚站点。\n\n需要粘贴一个已上架商品的链接：卖家后台→产品管理→找到商品→点小眼睛图标→复制URL。\n\n如果还没上架商品，先去运营学堂上一个再回来。", confirmText: "收款账户申请通过" },
        { id: "s4-5", title: "获取银行账户信息", estimatedTime: "2分钟", type: "action", content: "申请通过后，收款平台会给你一组虚拟银行账户信息：\n- Account Number（银行账号，约17位数字）\n- Routing Number（路线号码，9位数字）\n- Bank Name（银行名称）\n- Bank Address（银行地址）\n\n在收款平台的账户详情页面可以直接复制。", confirmText: "已记录银行账户信息" },
        { id: "s4-6", title: "绑定到TikTok店铺", estimatedTime: "10分钟", type: "action", content: "卖家后台 → 我的账号 → 商家资料 → 支付信息 → 添加结算账号。\n\n填入：\n- Account Number：粘贴收款平台给的账号\n- Routing Number：粘贴9位数字\n- Account Type：选 Checking Account（不要选Savings Account！）\n- 持卡人地址：勾选「使用注册地址」即可\n\n点击确认，系统验证后显示绑定成功。", confirmText: "收款账户绑定成功" },
      ],
      warnings: [
        "回款周期：东南亚是7+8天，第一笔回款要等约20天",
        "连连现在要求先有商品链接才能绑定——先上架至少一个商品",
        "Account Type一定选Checking Account，不要选Savings Account",
        "手续费从提现金额里扣，不额外收费（提1000元到手999元）",
      ],
    },
  ],
};
