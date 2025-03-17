export class SymbolRef<_> {
  constructor(public readonly symbol: symbol) {}
}

type MaybeAsync<T> = Promise<T> | T;

type ProviderBase = {
  provide: SymbolRef<unknown>;
};

type ProviderFactory = ProviderBase & {
  useFactory: () => MaybeAsync<unknown>;
};

type ProviderClass = ProviderBase & {
  useClass: new (...args: unknown[]) => unknown;
};

type ProviderValue = ProviderBase & {
  useValue: MaybeAsync<unknown>;
};

export type Provider = ProviderValue | ProviderClass | ProviderFactory;

export class DiManager {
  readonly #providers = new Map<symbol, unknown>();

  async #addProvider<T>(provider: Provider) {
    let instance: T;

    if ('useClass' in provider) {
      instance = new provider.useClass() as T;
    } else if ('useFactory' in provider) {
      instance = (await provider.useFactory()) as T;
    } else if ('useValue' in provider) {
      instance = (await provider.useValue) as T;
    } else {
      throw new Error('Invalid provider');
    }

    this.#providers.set(provider.provide.symbol, instance);
  }

  public async addProviders(providers: Provider[]) {
    for (const provider of providers) {
      await this.#addProvider(provider);
    }
  }

  public inject<T>(provider: SymbolRef<T>) {
    const instance = this.#providers.get(provider.symbol);

    const name = provider?.symbol?.toString() || 'name' in provider ? (provider as any)?.name : 'undefined';

    if (!instance) {
      throw new Error(`Dependency not found for token: ${name}`);
    }

    return instance as T;
  }

  public reset() {
    this.#providers.clear();
  }
}

const diManager = new DiManager();

/**
 * Injects a dependency by its token
 */
const inject = <T>(provider: SymbolRef<T>) => diManager.inject(provider);

/**
 * Adds providers to the DI container
 */
const addProviders = (providers: Provider[]) => diManager.addProviders(providers);

/**
 * Mostly used for testing purposes
 */
const resetProviders = () => diManager.reset();

export { addProviders, inject, resetProviders };
