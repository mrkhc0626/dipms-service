import { Injectable } from '@nestjs/common';
import { client } from 'src/configs';
import { iLicenseBody, iRegisterBody } from 'src/interfaces/ip';

@Injectable()
export class IpService {
  getHello(): string {
    return 'Hello World!';
  }

  async register(data: iRegisterBody) {
    const response = await client.ipAsset.register({
      nftContract: data.contract, // NFT contract address
      tokenId: data.tokenId, // NFT token ID
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`,
    );
    return response;
  }

  async registerCommercialLicense(data: iLicenseBody) {
    const commercialRemixParams = data;

    const response = await client.license.registerCommercialRemixPIL({
      ...commercialRemixParams,
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `PIL Terms registered at transaction hash ${response.txHash}, License Terms ID: ${response.licenseTermsId}`,
    );
    return response;
  }

  async registerNonCommercialLicense() {
    const nonComSocialRemixingParams = {};

    const response = await client.license.registerNonComSocialRemixingPIL({
      ...nonComSocialRemixingParams,
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `PIL Terms registered at transaction hash ${response.txHash}, License Terms ID: ${response.licenseTermsId}`,
    );
    return response;
  }
}
