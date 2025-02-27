import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../src/public_api';

@Component({
  selector: 'atl-fixture',
  template: `<button (click)="onTest()">Test</button>`,
  styles: [],
})
class TestComponent {
  onTest() {
    throwError(() => new Error('myerror')).subscribe();
  }
}

describe('TestComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTicks();
    jest.useRealTimers();
  });

  it('does not fail', async () => {
    await render(TestComponent);
    await userEvent.click(screen.getByText('Test'));
  });

  it('fails because of the previous one', async () => {
    await render(TestComponent);
    await userEvent.click(screen.getByText('Test'));
  });
});
