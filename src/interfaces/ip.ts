export interface iRegisterBody {
    contract: `0x${string}`;
    tokenId: string;
}

export interface iLicenseBody {
    currency: `0x${string}`;
    mintingFee: string;
    commercialRevShare: number;
    type: 'commercial' | 'non-commercial';
}