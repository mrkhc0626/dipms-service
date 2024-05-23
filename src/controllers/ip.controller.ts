import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { iRegisterBody } from 'src/interfaces/ip';
import { IpService } from 'src/providers/ip.service';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Post('/register')
  async register(@Body() body: iRegisterBody, @Res() res: Response) {
    const { contract, tokenId } = body
    console.log('Contract:', contract)
    console.log('Token ID:', tokenId)
    if (!contract || !tokenId) {
        return res.json({ success: false, msg: 'data_missing' });
    }

    const response = await this.ipService.register(body)
    return res.json({ success: true, msg: 'ip_registered', data: response });
  }
}
