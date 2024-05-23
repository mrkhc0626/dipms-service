import { Injectable } from '@nestjs/common';
import { client } from 'src/configs';
import { iAttachLicenseBody, iLicenseBody, iRegisterBody } from 'src/interfaces/ip';

@Injectable()
export class IpService {
  getHello(): string {
    return 'Hello World!';
  }

  // Register an NFT to IP Asset
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

  // Register a commercial license
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

  // Register a non-commercial license
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

  // Attach License to the IP Asset
  async attachLicenseToIp(data: iAttachLicenseBody) {
    try {
      const response = await client.license.attachLicenseTerms({
         licenseTermsId: data.licenseTermsId, 
         ipId: data.ipId,
         txOptions: { waitForTransaction: true }
      });
      
      console.log(`Attached License Terms to IPA at transaction hash ${response.txHash}.`)
    } catch(e) {
      console.log(`License Terms already attached to this IPA.`)
    }
  }
}
