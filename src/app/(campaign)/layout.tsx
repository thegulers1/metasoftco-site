import AttributionCapture from "@/components/site/AttributionCapture";

/** Campaigns supply their own navigation and footer; root consent/analytics remain. */
export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AttributionCapture />
    </>
  );
}
