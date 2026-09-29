// One headline readout per project for the /work index. Every value is lifted from that
// project's own frontmatter metrics or write-up; nothing here is a new claim.
export const readouts: Record<string, { value: string; label: string }> = {
  'cache-wallet': { value: '7', label: 'EVM networks behind one API' },
  'cwtch-store': { value: '486k', label: 'requests in 30 days, 0.42% server errors' },
  'little-investigators': { value: 'MSc', label: 'delivered for a real client, used at a live event' },
  plainsheet: { value: '25/25', label: 'eval cases green in CI, adversarial included' },
  'billing-system': { value: '2', label: 'branches, independent invoice sequences' },
  'supplier-etl': { value: '9,968', label: 'HD images in one acquisition, 0 errors' },
  'vision-pipeline': { value: '7,975', label: 'images classified for £0 of cloud' },
  voiceprint: { value: '6/6', label: 'planted rules recovered, zero false' },
  batchward: { value: '0', label: 'core dependencies' },
  'pawtrove-and-storefronts': { value: '100', label: 'SEO score on pawtrove.shop' },
};
