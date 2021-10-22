import { Test, TestingModule } from '@nestjs/testing';
import { Heartbeat } from './heartbeat';

describe('Heartbeat', () => {
  let provider: Heartbeat;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Heartbeat],
    }).compile();

    provider = module.get<Heartbeat>(Heartbeat);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
