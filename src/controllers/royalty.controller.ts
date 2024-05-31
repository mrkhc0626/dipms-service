import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { iRoyaltyBody, iRoyaltyClaimBody, iRoyaltySnapshotBody } from 'src/interfaces/royalty';
import { RoyaltyService } from 'src/providers/royalty.service';

@Controller('royalty')
export class RoyaltyController {
  constructor(private readonly royaltyService: RoyaltyService) {}

  @Post('/collect-token')
  async collectRoyaltyToken(@Body() body: iRoyaltyBody, @Res() res: Response) {
    const { parentIpId, royaltyVaultIpId } = body;
    if (!parentIpId || !royaltyVaultIpId) {
      return res.json({ success: false, msg: 'data_missing' });
    }

    const response = await this.royaltyService.collectRoyaltyTokens(body);
    return res.json({
      success: true,
      msg: 'royalty_token_collected',
      data: response,
    });
  }

  @Post('/snapshot')
  async snapshot(@Body() body: iRoyaltySnapshotBody, @Res() res: Response) {
    const { royaltyVaultIpId } = body;
    if (!royaltyVaultIpId) {
      return res.json({ success: false, msg: 'data_missing' });
    }

    const response = await this.royaltyService.roaltySnapshot(body);
    return res.json({
      success: true,
      msg: 'royalty_token_snapshot',
      data: response,
    });
  }

  @Post('/claim')
  async claim(@Body() body: iRoyaltyClaimBody, @Res() res: Response) {
    const { snapshotIds, royaltyVaultIpId, token } = body;
    if (!(snapshotIds &&royaltyVaultIpId && token)) {
      return res.json({ success: false, msg: 'data_missing' });
    }

    const response = await this.royaltyService.claimRevenue(body);
    return res.json({
      success: true,
      msg: 'royalty_token_snapshot',
      data: response,
    });
  }
}
