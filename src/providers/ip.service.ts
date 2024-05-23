import { Injectable } from '@nestjs/common';
import { client } from 'src/configs';
import { iRegisterBody } from 'src/interfaces/ip';

@Injectable()
export class IpService {
  getHello(): string {
    return 'Hello World!';
  }

  async register(data: iRegisterBody) {
    const response = await client.ipAsset.register({
        nftContract: data.contract, // NFT contract address
        tokenId: data.tokenId, // NFT token ID
        txOptions: { waitForTransaction: true }
      });
      
      console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`);
      return response
  }
}
