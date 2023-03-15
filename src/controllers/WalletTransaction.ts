interface WalletInterface {
  id: string;
  currency: string;
  amount: number;
}

class WalletController implements WalletInterface {
  constructor(
    public id: string,
    public currency: string,
    public amount: number
  ) {}
}
