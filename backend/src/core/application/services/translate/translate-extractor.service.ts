import { Injectable, Logger } from '@nestjs/common';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class TranslateExtractorService {
  readonly #logger = new Logger(TranslateExtractorService.name);
  readonly #variableNameRegexp = '(([A-Z][A-Z\\d]*)(_[A-Z\\d]+)*)';

  async getKeys() {
    try {
      const core = await this.#extract('src/core');
      const app = await this.#extract('../frontend/src/app');
      const templates = await this.#extract('templates');

      return [...new Set([...templates, ...core, ...app])].sort();
    } catch (e) {
      this.#logger.warn(e);
    }

    return [];
  }

  async #extract(folder: string) {
    const dir = await readdir(folder);
    const folders = dir.filter((file) => !file.includes('.'));
    const files = dir.filter(
      (file) => file.includes('.ts') || file.includes('.html'),
    );

    const strings: string[] = [];

    const regexps: string[] = [
      //new HttpException('variableNameRegexp', HttpStatus.BAD_REQUEST);
      `new HttpException\\('${this.#variableNameRegexp}'`,
      //message: 'variableNameRegexp',
      ` message: '${this.#variableNameRegexp}'`,
      // {{ 'variableNameRegexp' | translate }}
      `'${this.#variableNameRegexp}' | translate}}`,
      // placeholder="variableNameRegexp"
      `placeholder=.${this.#variableNameRegexp}.`,
      // label="variableNameRegexp"
      `label=.${this.#variableNameRegexp}.`,
      // .translate('variableNameRegexp')
      `.translate('${this.#variableNameRegexp}')`,
      // .instant('variableNameRegexp')
      `.instant\\('${this.#variableNameRegexp}'\\)`,
      // enums like variableNameRegexp = 'variableNameRegexp',
      `\\w+ = '${this.#variableNameRegexp}'`,
      // data?.['variableNameRegexp'] || 'Next page';
      `data?\\.\\['${this.#variableNameRegexp}'\\]`,
      // anyKey: 'variableNameRegexp'
      `: '${this.#variableNameRegexp}'`,
      // ('variableNameRegexp') || ('variableNameRegexp', { data: 'data' })
      `signal\\('${this.#variableNameRegexp}'`,
      // >('variableNameRegexp') || >('variableNameRegexp', { data: 'data' })
      `>\\('${this.#variableNameRegexp}'`,
      // "variableNameRegexp"
      `"${this.#variableNameRegexp}"`,
      //{{ variableNameRegexp }}
      `{{ ${this.#variableNameRegexp} }}`,
      // {{variableNameRegexp}}
      `{{${this.#variableNameRegexp}}}`,
      // ['variableNameRegexp']
      `\\['${this.#variableNameRegexp}'\\]`,
    ];

    const regexExclude = [
      /\w_USE_CASE/,
      /\w_REPOSITORY/,
      // If is only 1 letter
      /^[A-Z]$/,
    ];

    for (const file of files) {
      const content = await readFile(join(folder, file), 'utf-8');

      const results = regexps.flatMap((regexp) =>
        this.#extractKeys(content, new RegExp(regexp, 'g')),
      );

      strings.push(...results);
    }

    for (const f of folders) {
      strings.push(...(await this.#extract(join(folder, f))));
    }

    return [...new Set(strings)]
      .filter(Boolean)
      .filter((key) => !regexExclude.some((regex) => regex.test(key)));
  }

  #extractKeys(file: string, regex: RegExp) {
    const matches = file.match(regex);

    if (!matches) {
      return [];
    }

    return matches.map((match) => match.replace(regex, '$1'));
  }
}
