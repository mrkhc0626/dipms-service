export interface iRoyaltyBody {
  parentIpId: `0x${string}`;
  royaltyVaultIpId: `0x${string}`;
}

export interface iRoyaltySnapshotBody {
  royaltyVaultIpId: `0x${string}`;
}

export interface iRoyaltyClaimBody {
  snapshotIds: string[];
  royaltyVaultIpId: `0x${string}`;
  token: `0x${string}`;
}
