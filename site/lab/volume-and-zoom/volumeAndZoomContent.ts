// The Lab's Volume and zoom page: candidate controls that open a slider from an icon button.
// Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'

export const volumeAndZoomPage: LabPage = {
  id: 'lab-volume-and-zoom', kind: 'foundation', title: 'Volume and zoom', href: '/site/lab/volume-and-zoom',
  description: 'When a level needs adjusting without a slider taking up room. Candidate components, marked Lab: they aren’t part of the library yet.',
  sections: [
    { key: 'howItWorks', body: [
      'Both controls share one shape: an icon button opens a slim pop-up with a single row, a control at the start, the slider, a control or icon at the end, and the level as a percentage. Each closes 2 seconds after it was last used, and stays open while a mouse rests on it.',
    ] },
    { key: 'volume', title: 'Volume', intro: ['The trigger’s speaker shows the level, and each arrow key press moves it 5%. The crossed-out speaker at the start mutes, and moving the slider turns the sound back on. `orientation="vertical"` stands the row upright, with the speaker at the bottom.'] },
    { key: 'expand', title: 'Expanding in place', intro: ['An experiment: with `presentation="expand"`, the row slides out beside its button instead of opening a pop-up, pushing what follows along. With a mouse, as on YouTube, the speaker mutes and hovering or focusing it reveals the slider. On a touch screen, which can’t hover, tapping the speaker reveals the row with mute inside it, and Escape closes it. Upright, with `orientation="vertical"`, the slider rises above the speaker and floats over the page, so a busy toolbar doesn’t move.'] },
    { key: 'zoom', title: 'Zoom', intro: ['Zoom multiplies rather than adds, so the slider is logarithmic: 100% sits in the middle of 25% to 400%. Each arrow key press moves it about 7%, the zoom-out and zoom-in buttons halve and double it, and pressing the percentage resets it to 100%.'] },
  ],
}

// The examples' teaching labels.
export const volumeAndZoomLabels = {
  volumeA: 'Volume A',
  muteA: 'Mute A',
  volumeB: 'Volume B',
  muteB: 'Mute B',
  volumeC: 'Volume C',
  muteC: 'Mute C',
  volumeD: 'Volume D',
  muteD: 'Mute D',
  zoom: 'Zoom E',
  zoomOut: 'Step down E',
  zoomIn: 'Step up E',
  reset: 'Reset E',
}
