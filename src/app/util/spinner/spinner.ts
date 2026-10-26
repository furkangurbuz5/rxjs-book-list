import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'fwdl-spinner',
  templateUrl: 'spinner.html',
  styleUrl: 'spinner.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  readonly spin = input.required<boolean>();
  readonly itemType = input<string>('');
}
