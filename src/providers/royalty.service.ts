import { Injectable } from '@nestjs/common';
import { client } from 'src/configs';
import {
  iRoyaltyBody,
  iRoyaltyClaimBody,
  iRoyaltySnapshotBody,
} from 'src/interfaces/royalty';

@Injectable()
export class RoyaltyService {
  getHello(): string {
    return 'Hello World!';
  }

  // Collect Royalty Tokens
  async collectRoyaltyTokens(data: iRoyaltyBody) {
    const response = await client.royalty.collectRoyaltyTokens({
      parentIpId: data.parentIpId,
      royaltyVaultIpId: data.royaltyVaultIpId,
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Collected royalty token ${response.royaltyTokensCollected} at transaction hash ${response.txHash}`,
    );
    return response;
  }

  // Royalty Snapshot
  async roaltySnapshot(data: iRoyaltySnapshotBody) {
    const response = await client.royalty.snapshot({
      royaltyVaultIpId: data.royaltyVaultIpId,
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Took a snapshot with id ${response.snapshotId} at transaction hash ${response.txHash}`,
    );
    return response;
  }

  // Claim Revenue
  async claimRevenue(data: iRoyaltyClaimBody) {
    const response = await client.royalty.claimRevenue({
      snapshotIds: data?.snapshotIds,
      royaltyVaultIpId: data?.royaltyVaultIpId,
      token: data?.token,
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Claimed revenue token ${response.claimableToken} at transaction hash ${response.txHash}`,
    );
    return response;
  }
}
