import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import * as fromRoot from '../shared/reducers';
import * as fromConfig from '../shared/reducers/config';
import { SetConfigKeys } from '../shared/actions/config';
import Config from '../../../models/config.model';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty } from '../shared/utils';
import {
  GetPrintReceiptDocxTemplate, GetPrintReportDocxTemplate, SetPrintReceiptDocxTemplate,
  SetPrintReportDocxTemplate
} from '../shared/actions/print';
import { environment } from '../../environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: [ 'settings.component.scss' ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public form: FormGroup = null;
  public isConfigEmpty = true;
  public hidePassword = true;
  public availableLanguages = environment.availableLanguages;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store$.pipe(select(fromConfig.getConfig))
      .subscribe((config: Config) => {
        this.isConfigEmpty = isEmpty(config);

        this.form = new FormGroup({
          cashMachineId: new FormControl(config.cashMachineId || '', Validators.required),
          dbConnectionString: new FormControl(config.dbConnectionString || '',
            [ Validators.required, Validators.pattern(/https?:\/\/.+/) ]),
          dbUserName: new FormControl(config.dbUserName || '', Validators.required),
          dbPassword: new FormControl(config.dbPassword || '', Validators.required),
          language: new FormControl(config.language || ''),
        });
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.store$.dispatch(new SetConfigKeys(this.form.getRawValue()));
  }

  setPrintReceiptDocxTemplate() {
    this.store$.dispatch(new SetPrintReceiptDocxTemplate());
  }

  getPrintReceiptDocxTemplate() {
    this.store$.dispatch(new GetPrintReceiptDocxTemplate());
  }

  setPrintReportDocxTemplate() {
    this.store$.dispatch(new SetPrintReportDocxTemplate());
  }

  getPrintReportDocxTemplate() {
    this.store$.dispatch(new GetPrintReportDocxTemplate());
  }
}
