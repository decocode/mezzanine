// The Lab's Volume, Zoom and Expanding controls pages: candidate controls that open a slider from an
// icon button, and an experiment that slides the slider out of the button instead.
// Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'

export const volumePage: LabPage = {
  id: 'lab-volume', kind: 'component', title: 'Volume', href: '/site/lab/volume',
  description: '`VolumeControl` is a component that sets a volume from an icon button, without a slider taking up room.',
  sections: [
    { key: 'about', title: 'About Volume', body: [
      '`VolumeControl` is a component that sets a volume from an icon button, without a slider taking up room. The button’s speaker shows the level. Pressing it opens a slim pop-up with one row: a crossed-out speaker that mutes, the slider, and the level as a percentage. Moving the slider turns the sound back on. The pop-up closes 2 seconds after it was last used, and stays open while a mouse rests on it or keyboard focus is inside it. Use it in media players and toolbars, where a full slider would crowd the controls around it. Give it a `label`, such as “Volume”, and a `muteLabel`, such as “Mute”.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Volume anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'Button', description: 'The trigger: an icon button that opens the pop-up. Its speaker icon changes with the level, in four steps from muted to loud.' },
        { name: 'Popover', description: 'The pop-up, above the trigger.' },
        { name: 'Dialog', description: 'Holds the pop-up’s one row.' },
        { name: 'ToggleButton', description: 'The mute button: a crossed-out speaker at the start of the row.' },
        { name: 'Slider', description: 'The level, from 0 to 100.' },
        { name: 'Level', description: 'The level as a percentage, at the end of the row.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'Moving the slider turns the sound back on.',
      'The pop-up closes 2 seconds after it was last used, unless a mouse rests on it or keyboard focus is inside it.',
      'With `orientation="vertical"`, the row stands upright, with the speaker at the bottom and the level at the top.',
    ] }] },
    { key: 'states', table: {
      label: 'Volume states', nameColumn: 'State', descriptionColumn: 'What it looks like', namesAreCode: false,
      rows: [
        { name: 'Closed', description: 'Only the trigger shows, its speaker showing the level.' },
        { name: 'Open', description: 'The pop-up shows above the trigger.' },
        { name: 'Muted', description: 'The trigger and the mute button show the crossed-out speaker, and the level reads 0%.' },
        { name: 'Disabled', description: 'With `isDisabled`: faded, and can’t be opened.' },
      ],
    } },
    { key: 'usage', body: ['Give it a `label`, such as “Volume”, and a `muteLabel`, such as “Mute”. Pass `autoCloseAfterMs` to close it after use, as the demo does with 2 seconds.'] },
    { key: 'accessibility', body: [{ list: [
      'The button and the slider are both named by `label`, which shows in the button’s tooltip.',
      'The slider announces its level as a percentage, and each arrow key press moves it 5%.',
      'When the pop-up opens, focus goes to the slider’s handle. Shift+Tab reaches the mute button.',
      'Escape closes the pop-up and returns focus to the button.',
    ] }] },
    { key: 'props', table: {
      label: 'Volume props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'label / muteLabel', description: 'The control’s name, such as “Volume”, and the mute button’s, such as “Mute”.' },
        { name: 'value / defaultValue / onChange', description: 'The level, from 0 to 100; 100 by default.' },
        { name: 'isMuted / defaultMuted / onMutedChange', description: 'Whether the sound is muted.' },
        { name: 'orientation', description: '`horizontal` or `vertical`.' },
        { name: 'presentation', description: '`popover` or `expand`.' },
        { name: 'isDisabled', description: 'Turns the control off.' },
        { name: 'autoCloseAfterMs', description: 'How long the pop-up stays open after its last use; without it, it stays open until dismissed.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Volume CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--width-xs, --space-24', description: 'The slider’s length, flat and upright.' },
        { name: '--space-2', description: 'The gaps in the row.' },
        { name: '--color-text-muted', description: 'The level.' },
        { name: '--target-size-sm, --icon-size-sm', description: 'Lining the level up with the icon at the start.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Zoom', href: '/site/lab/zoom' },
    { label: 'Slider', href: '/slider' },
    { label: 'Toggle button', href: '/toggle-button' },
  ],
  references: [
    { label: 'React Aria: Slider', href: 'https://react-aria.adobe.com/Slider' },
  ],
}

export const zoomPage: LabPage = {
  id: 'lab-zoom', kind: 'component', title: 'Zoom', href: '/site/lab/zoom',
  description: '`ZoomControl` is a component that sets a zoom level from an icon button, without a slider taking up room.',
  sections: [
    { key: 'about', title: 'About Zoom', body: [
      '`ZoomControl` is a component that sets a zoom level from an icon button, without a slider taking up room. Pressing the button opens a slim pop-up with one row: a zoom-out button, the slider, a zoom-in button, and the level as a percentage. Zoom multiplies rather than adds, so the slider is logarithmic: 100% sits in the middle of 25% to 400%. Each arrow key press moves it about 7%, and the zoom-out and zoom-in buttons step through the stops browsers use for their own zoom: 25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300 and 400%. A tick marks 100% on the track. A drag that comes close to it snaps onto it, and a double-press of the slider’s handle returns to it. The pop-up closes 2 seconds after it was last used, and stays open while a mouse rests on it or keyboard focus is inside it. Use it for maps, images and documents. Give it a `label`, such as “Zoom”, and names for its two buttons.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Zoom anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'Button', description: ['The trigger: an icon button with a magnifier that opens the pop-up.', 'Zoom out: an icon button before the slider that steps down to the next stop.', 'Zoom in: an icon button after the slider that steps up to the next stop.'] },
        { name: 'Popover', description: 'The pop-up, above the trigger.' },
        { name: 'Dialog', description: 'Holds the pop-up’s one row.' },
        { name: 'Slider', description: 'The zoom, from 25% to 400%, with a tick at 100%.' },
        { name: 'Level', description: 'The zoom as a percentage, at the end of the row.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'The slider is logarithmic, so 100% sits in the middle.',
      'The zoom buttons step through the browser stops; the arrow keys move about 7%.',
      'A drag near 100% snaps onto it, and a double-press of the handle returns to it.',
      'The pop-up closes as Volume’s does.',
    ] }] },
    { key: 'states', body: ['Closed, Open and Disabled, as Volume.'] },
    { key: 'usage', body: ['Give it a `label`, such as “Zoom”, and names for the zoom-out and zoom-in buttons. Pass `autoCloseAfterMs` to close it after use.'] },
    { key: 'accessibility', body: [{ list: [
      'The button and the slider are both named by `label`.',
      'The slider announces the zoom as a percentage.',
      'When the pop-up opens, focus goes to the slider’s handle. Shift+Tab reaches zoom out, and Tab reaches zoom in.',
      'Escape closes the pop-up and returns focus to the button.',
    ] }] },
    { key: 'props', table: {
      label: 'Zoom props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'label', description: 'The control’s name, such as “Zoom”.' },
        { name: 'stepDownLabel / stepUpLabel', description: 'The buttons’ names, such as “Zoom out” and “Zoom in”.' },
        { name: 'value / defaultValue / onChange', description: 'The zoom as a percentage, from 25 to 400; 100 by default.' },
        { name: 'isDisabled', description: 'Turns the control off.' },
        { name: 'autoCloseAfterMs', description: 'How long the pop-up stays open after its last use.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Zoom CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--width-xs, --space-24', description: 'The slider’s length, flat and upright.' },
        { name: '--space-2', description: 'The gaps in the row.' },
        { name: '--color-text-muted', description: 'The level.' },
        { name: '--target-size-sm, --icon-size-sm', description: 'Lining the level up with the icon at the start.' },
        { name: '--color-border-control, --border-width-md, --space-4, --radius-full', description: 'The tick at 100%.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Volume', href: '/site/lab/volume' },
    { label: 'Slider', href: '/slider' },
  ],
  references: [
    { label: 'React Aria: Slider', href: 'https://react-aria.adobe.com/Slider' },
  ],
}

export const expandingControlsPage: LabPage = {
  id: 'lab-expanding-controls', kind: 'component', title: 'Expanding controls', href: '/site/lab/expanding-controls',
  description: '`VolumeControl` with `presentation="expand"` is a component that slides its slider out of its button, instead of opening a pop-up.',
  sections: [
    { key: 'about', title: 'About Expanding controls', body: [
      '`VolumeControl` with `presentation="expand"` is a component that slides its slider out of its button, instead of opening a pop-up. It’s an experiment. With a mouse, as on YouTube, the speaker mutes, and hovering over it or focusing it reveals the slider. On a touch screen, which can’t hover, tapping the speaker reveals the row with mute inside it.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', body: ['As Volume, except the row slides out of its button instead of a pop-up. With a mouse, the trigger is the mute button itself.'] },
    { key: 'behaviour', body: ['The row slides out beside its button, pushing what follows along. Upright, the slider rises above the speaker and floats over the page, so a busy toolbar doesn’t move.'] },
    { key: 'states', body: ['Collapsed and expanded; with a mouse, expanded while hovered or focused.'] },
    { key: 'usage', body: ['Use it where a pop-up would cover something people need to see, such as a video’s controls. Set `presentation="expand"`.'] },
    { key: 'accessibility', body: [{ list: [
      'The row is a group named by `label`.',
      'On a touch screen, the speaker button says whether the row is expanded, and opening the row moves focus to the slider’s handle.',
      'Escape closes the row, and focus goes back to its button.',
      'With reduced motion, the row appears without sliding.',
    ] }] },
    { key: 'props', table: {
      label: 'Expanding controls props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'presentation', description: '`expand`.' },
        { name: 'orientation', description: '`horizontal` or `vertical`. The other props are as on Volume.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Expanding controls CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--width-xs, --space-24', description: 'The slider’s length, flat and upright.' },
        { name: '--space-2', description: 'The gaps in the row.' },
        { name: '--color-text-muted', description: 'The level.' },
        { name: '--target-size-sm, --icon-size-sm', description: 'Lining the level up with the icon at the start.' },
        { name: '--motion-duration-interface, --motion-easing-enter', description: 'The row sliding out.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Volume', href: '/site/lab/volume' },
  ],
  references: [
    { label: 'React Aria: Slider', href: 'https://react-aria.adobe.com/Slider' },
  ],
}

// The Volume examples' teaching labels.
export const volumeLabels = {
  volumeA: 'Volume A',
  muteA: 'Mute A',
  volumeB: 'Volume B',
  muteB: 'Mute B',
  volumeC: 'Volume C',
  muteC: 'Mute C',
  volumeD: 'Volume D',
  muteD: 'Mute D',
}

// The Zoom example's teaching labels.
export const zoomLabels = {
  zoom: 'Zoom',
  zoomOut: 'Zoom out',
  zoomIn: 'Zoom in',
}
