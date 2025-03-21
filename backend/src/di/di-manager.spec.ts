import assert from 'node:assert';
import { describe, it } from 'node:test';
import { SymbolRef, addProviders, inject, resetProviders } from './di-manager.ts';

class TestService {
  getValue() {
    return 'test';
  }
}

const TEST_SERVICE = new SymbolRef<TestService>(Symbol('TEST_SERVICE'));

describe('DiManager', () => {
  it('DiManager should add and inject providers correctly', async () => {
    resetProviders();
    await addProviders([
      {
        provide: TEST_SERVICE,
        useClass: TestService,
      },
    ]);

    const service = inject(TEST_SERVICE);
    assert.ok(service instanceof TestService);
    assert.strictEqual(service.getValue(), 'test');
  });

  it('DiManager should throw an error if provider is not found', () => {
    resetProviders();
    assert.throws(() => inject(TEST_SERVICE), /Dependency not found/);
  });

  it('DiManager should support useFactory providers', async () => {
    resetProviders();
    await addProviders([
      {
        provide: TEST_SERVICE,
        useFactory: () => new TestService(),
      },
    ]);

    const service = inject(TEST_SERVICE);
    assert.ok(service instanceof TestService);
    assert.strictEqual(service.getValue(), 'test');
  });

  it('DiManager should support useValue providers', async () => {
    resetProviders();
    const value = new TestService();
    await addProviders([
      {
        provide: TEST_SERVICE,
        useValue: value,
      },
    ]);

    const service = inject(TEST_SERVICE);
    assert.strictEqual(service, value);
  });

  it('DiManager should throw an error for invalid provider', async () => {
    resetProviders();
    await assert.rejects(async () => {
      await addProviders([
        {
          provide: TEST_SERVICE,
          // @ts-expect-error
          useInvalid: new TestService(),
        },
      ]);
    }, /Invalid provider/);
  });

  it('DiManager should reset providers correctly', async () => {
    resetProviders();
    await addProviders([
      {
        provide: TEST_SERVICE,
        useClass: TestService,
      },
    ]);

    resetProviders();
    assert.throws(() => inject(TEST_SERVICE), /Dependency not found/);
  });
});
