export async function fetchWalletSummary(userId: number) {
  const res = await fetch(`/api/wallet/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch wallet summary');
  return res.json();
}
