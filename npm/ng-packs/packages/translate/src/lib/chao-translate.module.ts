import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChaoTranslateService } from './service/chao-translate.service';

export function HttpLoaderFactory(http: HttpClient, folder: string) {
  if (folder === undefined) {
    return new TranslateHttpLoader(http, `assets/i18n/`);
  } else {
    return new TranslateHttpLoader(http, `assets/i18n/${folder}/`);
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'zh-cn',
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, 'folder'],
      },
      useDefaultLang: true,
    }),
  ],
  exports: [TranslateModule],
  providers: [ChaoTranslateService],
})
export class ChaoTranslateModule {
  static forRoot(folder?: string): ModuleWithProviders<ChaoTranslateModule> {
    return {
      ngModule: ChaoTranslateModule,
      providers: [
        {
          provide: 'folder',
          useValue: folder,
        },
      ],
    };
  }
  static forChild(): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
    };
  }
}
