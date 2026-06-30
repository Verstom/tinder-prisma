import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsServiceController } from './subscriptions-service.controller';
import { SubscriptionsServiceService } from './subscriptions-service.service';

describe('SubscriptionsServiceController', () => {
  let subscriptionsServiceController: SubscriptionsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsServiceController],
      providers: [SubscriptionsServiceService],
    }).compile();

    subscriptionsServiceController = app.get<SubscriptionsServiceController>(SubscriptionsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(subscriptionsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
