import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsServiceController } from './interactions-service.controller';
import { InteractionsServiceService } from './interactions-service.service';

describe('InteractionsServiceController', () => {
  let interactionsServiceController: InteractionsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InteractionsServiceController],
      providers: [InteractionsServiceService],
    }).compile();

    interactionsServiceController = app.get<InteractionsServiceController>(InteractionsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(interactionsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
