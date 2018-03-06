import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../shared/ngrx/reducers';
import * as fromConfig from '../../shared/ngrx/selectors/config';
import { SetConfigKeys } from '../../shared/ngrx/actions/config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Config from '../../shared/models/config.model';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty } from '../../shared/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: [ 'settings.component.scss' ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public form: FormGroup = null;
  public isConfigEmpty = true;
  private subscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(fromConfig.getConfig))
      .subscribe((config: Config) => {
        this.isConfigEmpty = isEmpty(config);

        this.form = new FormGroup({
          cashMachineId: new FormControl(config.cashMachineId || '', Validators.required),
          dbConnectionString: new FormControl(config.dbConnectionString || '',
            [ Validators.required, Validators.pattern(/https?:\/\/.+/) ]),
          dbUserName: new FormControl(config.dbUserName || '', Validators.required),
          dbPassword: new FormControl(config.dbPassword || '', Validators.required),
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.store.dispatch(new SetConfigKeys(this.form.getRawValue()));
  }
}
