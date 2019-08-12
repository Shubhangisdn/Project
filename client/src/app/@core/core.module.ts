import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TnFormErrorComponent } from './tn-form-error/tn-form-error.component';
import { NotificationService } from './services/notification.service';
import { TnFormErrorService } from './services/tn-form-error.service';
import { CapitalizePipe } from './../@core/pipes/capitalize.pipe';
import { RoundPipe } from './../@core/pipes/round.pipe';

import { ReCaptchaComponent } from './re-captcha/re-captcha.component';
import { TnFileUploadComponent } from './tn-file-upload/tn-file-upload.component';
import { PagerService } from './services/pagination';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/total.pipe';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    TnFormErrorComponent,
    CapitalizePipe,
    FilterPipe,
    RoundPipe,
    TruncatePipe,
    ReCaptchaComponent,
    TnFileUploadComponent
  ],
  exports: [
    TnFormErrorComponent,
    CapitalizePipe,
    RoundPipe,
    FilterPipe,
    TruncatePipe,
    ReCaptchaComponent,
    TnFileUploadComponent
  ],
  providers: [
    TnFormErrorService,
    NotificationService,
  ],
})
export class CoreModule {
  static forChild(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        TnFormErrorService,
        NotificationService,
        PagerService
        // FrontEndService
        // ElesSharedService
      ],
    };
  }
}
