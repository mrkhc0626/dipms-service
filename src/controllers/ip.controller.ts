import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  iAttachLicenseBody,
  iLicenseBody,
  iMintIPATokenBody,
  iRegisterBody,
} from 'src/interfaces/ip';
import { IpService } from 'src/providers/ip.service';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Post('/register')
  async register(@Body() body: iRegisterBody, @Res() res: Response) {
    const { contract, tokenId } = body;
    console.log('Contract:', contract);
    console.log('Token ID:', tokenId);
    if (!contract || !tokenId) {
      return res.json({ success: false, msg: 'data_missing' });
    }

    const response = await this.ipService.register(body);
    return res.json({ success: true, msg: 'ip_registered', data: response });
  }

  @Post('/register-license')
  async registerLicense(@Body() body: iLicenseBody, @Res() res: Response) {
    const { currency, mintingFee, commercialRevShare, type } = body;
    console.log('Registing Licence:', body);
    if (!type) {
      return res.json({ success: false, msg: 'type_missing' });
    }

    let response = {};
    if (type === 'commercial') {
      if (!(currency && mintingFee && commercialRevShare)) {
        return res.json({ success: false, msg: 'data_missing' });
      }
      response = await this.ipService.registerCommercialLicense(body);
    }
    if (type === 'non-commercial') {
      response = await this.ipService.registerNonCommercialLicense();
    }
    return res.json({ success: true, msg: 'license_registered' });
  }

  @Post('/attach')
  async attachLicenseToIp(
    @Body() body: iAttachLicenseBody,
    @Res() res: Response,
  ) {
    if (!body?.licenseTermsId || !body?.ipId)
      return res.json({ success: false, msg: 'data_missing' });

    await this.ipService.attachLicenseToIp(body);
    return res.json({ success: true, msg: 'ip_attached_license' });
  }

  @Post('/mint')
  async mintIPATokne(
    @Body() body: iMintIPATokenBody,
    @Res() res: Response,
  ) {
    if (!body?.licenseTermsId || !body?.licensorIpId || !body?.receiver || !body?.amount)
      return res.json({ success: false, msg: 'data_missing' });

    await this.ipService.mintIPAToken(body);
    return res.json({ success: true, msg: 'ipa_minted' });
  }
}
