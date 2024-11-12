import { Frame } from '@nativescript/core';
import { ScheduleScreen } from '../screens/ScheduleScreen';

export class AppRootComponent {
  constructor() {
    // Initialize app-level dependencies
  }

  $start() {
    const frame = new Frame();
    frame.navigate({
      create: () => new ScheduleScreen()
    });
    return frame;
  }
}