import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from '../core/reducers';
import * as fromConfig from '../core/reducers/config';
import { SetConfigKeys } from '../core/actions/config';
import Config from '../../../models/config.model';
import { isEmpty } from '../core/utils';
import {
  GetPrintReceiptDocxTemplate,
  GetPrintReportDocxTemplate,
  SetPrintReceiptDocxTemplate,
  SetPrintReportDocxTemplate
} from '../core/actions/print';
import { environment } from '../../environments/environment';
import {
  ToggleHomeButton,
  ToggleSettingsButton,
  ToggleSidenavButton
} from '../core/actions/layout';
import { requiredIfRelativeChangedValidator } from '../core/validators/required-if-relative-changed.validator';
import { ElectronService } from '../core/services/electron.service';

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
  public config: Config;
  public isElectron: boolean;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef,
    private electronService: ElectronService,
  ) {
    this.isElectron = this.electronService.isElectron();
  }

  ngOnInit(): void {
    this.subscription = this.store$.select(fromConfig.getConfig)
      .subscribe((config: Config) => {
        this.isConfigEmpty = isEmpty(config);
        this.config = config;

        this.form = new FormGroup({
          cashMachineId: new FormControl(config.cashMachineId || '', Validators.required),
          dbConnectionString: new FormControl(config.dbConnectionString || '',
            [ Validators.required, Validators.pattern(/https?:\/\/.+[^\/]$/) ]),
          dbUserName: new FormControl(config.dbUserName || '', Validators.required),
          dbPassword: new FormControl(config.dbPassword || '', [ requiredIfRelativeChangedValidator('dbUserName', config.dbUserName) ]),
          language: new FormControl(config.language || ''),
        });
        this.cdRef.detectChanges();
      });

    setTimeout(() => {
      this.store$.dispatch(new ToggleSidenavButton(false));
      this.store$.dispatch(new ToggleSettingsButton(false));
      this.store$.dispatch(new ToggleHomeButton(true));
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
