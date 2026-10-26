import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'fwdl-spinner',
  templateUrl: 'spinner.html',
  styleUrl: 'spinner.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  readonly spin = input.required<boolean>();
}
