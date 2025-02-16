import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, readFile, readdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { TranslateExtractorService } from './translate-extractor.service';

@Injectable()
export class TranslateFilesService {
  readonly #logger = new Logger(TranslateFilesService.name);
  #keys: string[] = [];
  readonly #languages: Record<string, { [key: string]: string }> = {};
  #languagesAvailable: string[];
  #languagesDir = 'languages';

  constructor(
    private readonly _configService: ConfigService,
    private readonly _translateExtractorService: TranslateExtractorService,
  ) {}

  public async createAll(languagesAvailable: string[]) {
    this.#languagesAvailable = languagesAvailable;

    if (this._configService.get('NODE_ENV') === 'development') {
      this.#keys = await this._translateExtractorService.getKeys();

      await this.#createTranslates();
    }

    await this.#setLanguages();

    return this.#languages;
  }

  async #createTranslates() {
    if (!(await this.#exists(this.#languagesDir))) {
      await mkdir(this.#languagesDir);
    }

    const dir = await readdir(this.#languagesDir);

    for (const language of this.#languagesAvailable) {
      const filePath = join(this.#languagesDir, `${language}.json`);

      // Create file if not exists
      if (!dir.includes(`${language}.json`)) {
        this.#logger.debug(`Create ${language}.json`);
        await writeFile(filePath, JSON.stringify(this.#getDefaultValues(), null, 2));
      }

      let file = JSON.parse(await readFile(filePath, { encoding: 'utf8' }));

      const fileKeys = Object.keys(file);

      let needToWrite = false;
      let total = 0;

      // Remove extra keys
      total = 0;
      for (const key of fileKeys) {
        if (!this.#keys.includes(key)) {
          delete file[key];

          needToWrite = true;
        }
      }

      if (total > 0) {
        this.#logger.debug(`Remove ${total} keys from ${language}.json`);
      }

      // Add missing keys
      for (const key of this.#keys) {
        if (file[key] === undefined) {
          file[key] = '';
          total++;
          needToWrite = true;
        }
      }

      if (total > 0) {
        this.#logger.debug(`Add ${total} keys to ${language}.json`);
      }

      if (JSON.stringify(Object.keys(file)) !== JSON.stringify(Object.keys(file).sort())) {
        const ordered = Object.keys(file)
          .sort()
          .reduce(
            (obj, key) => {
              obj[key] = file[key];
              return obj;
            },
            {} as { [key: string]: string },
          );

        file = ordered;

        needToWrite = true;
      }

      if (needToWrite) {
        this.#logger.debug(`(${filePath}) ${language}.json updated`);
        await writeFile(filePath, JSON.stringify(file, null, 2));

        // copy into dist
        const path = join(this.#languagesDir, '../dist/languages');
        const distFilePath = join(path, `${language}.json`);

        this.#logger.debug(`(${distFilePath}) ${language}.json updated`);
        if (!(await this.#exists(path))) {
          await mkdir(path);
        }
        await writeFile(distFilePath, JSON.stringify(file, null, 2));
      }
    }
  }

  async #setLanguages() {
    for (const language of this.#languagesAvailable) {
      this.#logger.verbose(`Load ${language}.json`);
      const filePath = join(this.#languagesDir, `${language}.json`);

      const content = await readFile(join(filePath), { encoding: 'utf8' });

      this.#languages[language] = JSON.parse(content);
    }
  }

  async #exists(path: string) {
    try {
      return !!(await stat(path));
    } catch {
      return false;
    }
  }

  #getDefaultValues() {
    const values: { [kay: string]: string } = {};

    for (const key of this.#keys) {
      values[key] = '';
    }

    return values;
  }
}
