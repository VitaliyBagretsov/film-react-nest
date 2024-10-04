import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;
  const usersServiceMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(usersServiceMock)
      .compile();

    filmsController = app.get<FilmsController>(FilmsController);
    filmsService = app.get<FilmsService>(FilmsService);
  });

  it('.findAll() should call FilmsService.findAll', () => {
    filmsController.findAll();
    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('.findById() should call FilmsService.findById', () => {
    filmsController.findById('78');
    expect(filmsService.findById).toHaveBeenCalledWith('78');
  });
});
