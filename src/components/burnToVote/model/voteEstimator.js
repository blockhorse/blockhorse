





function estimateVoteUSD({
  hpEffective,
  votingPower,
  voteWeight = 100,
  hivePrice,
  reward_balance,
  recent_claims,
  total_vesting_fund_hive,
  total_vesting_shares
}) {
  console.log("ESTOS SON LOS DATOS USADOS");
  console.log("hpEffective:", hpEffective);

  // Ajustamos votingPower y voteWeight para base 10000 requerida por fórmula
  const votingPowerAdj = votingPower * 100; // 100 -> 10000 para 100%
  const voteWeightAdj = voteWeight * 100;   // 100 -> 10000 para 100%

  console.log("votingPower (ajustado a base 10000):", votingPowerAdj);
  console.log("voteWeight (ajustado a base 10000):", voteWeightAdj);

  console.log("hivePrice:", hivePrice);
  console.log("reward_balance:", reward_balance);
  console.log("recent_claims:", recent_claims);
  console.log("total_vesting_fund_hive:", total_vesting_fund_hive);
  console.log("total_vesting_shares:", total_vesting_shares);

  // Convertimos hpEffective a vesting shares con factor correcto
  const vestingShares = (hpEffective * 1e6 * total_vesting_shares) / total_vesting_fund_hive;
  console.log("vestingShares:", vestingShares);

  // Ajustamos VP y peso para fórmula Hive
  const power = (votingPowerAdj * voteWeightAdj) / 10000 / 50;
  console.log("power:", power);

  // Calculamos rshares según fórmula oficial
  const rshares = (power * vestingShares) / 10000;
  console.log("rshares:", rshares);

  // Valor por rshare en reward pool
  const rewardPerRshare = reward_balance / recent_claims;
  console.log("rewardPerRshare:", rewardPerRshare);

  // Valor de voto estimado en USD
  const voteValue = rshares * rewardPerRshare * hivePrice;
  console.log("voteValue (USD):", voteValue);

  return voteValue;
}

module.exports = { estimateVoteUSD };
