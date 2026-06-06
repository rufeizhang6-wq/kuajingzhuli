export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-4 text-center" style={{ fontSize: "15px", color: "#737373" }}>
          <p>
            跨境助理 — 免费的跨境电商入门引导平台
          </p>
          <p className="leading-relaxed" style={{ fontSize: "13px" }}>
            免责声明：本站内容仅供参考，不构成投资或经营建议。跨境电商存在资金风险，请谨慎决策。
            平台政策随时可能变化，请以各平台官方最新公告为准。
            所有费率、数据均标注来源和更新日期，仅供参考。
          </p>
          <p style={{ fontSize: "13px" }}>
            © {new Date().getFullYear()} kuajingzhuli.com
          </p>
        </div>
      </div>
    </footer>
  );
}
