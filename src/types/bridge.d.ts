declare module '@ngnc/bridge' {
    interface BridgeConfig {
      key: string;
      type: string;
      currency: string;
      onSuccess?: (response: { reference: string; status: string }) => void;
      onClose?: () => void;
      onLoad?: () => void;
    }
  
    export default class Bridge {
      constructor(config: BridgeConfig);
      setup(): void;
      open(): void;
    }
  }