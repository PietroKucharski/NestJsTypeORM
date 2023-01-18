import { getPhoto } from './../testing/get-photo.mock';
import { FileService } from './file.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('Teste do fileService', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const filename = 'photo-teste.jpeg';
      fileService.upload(photo, filename);
    });
  });
});
