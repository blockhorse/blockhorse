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
  const vestingRatio = total_vesting_fund_hive / total_vesting_shares;
  const vestingShares = hpEffective / vestingRatio;

  const usedVotingPower = (votingPower * voteWeight) / 10000;
  const rshares = vestingShares * usedVotingPower * 100;

  const rewardPerRshare = reward_balance / recent_claims;
  const voteValue = rshares * rewardPerRshare * hivePrice;

  return voteValue;
}

module.exports = { estimateVoteUSD };
