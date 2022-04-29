import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'boilerplate-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface TCCRoomCardConfig extends LovelaceCardConfig {
  entity?: string;
  // type: string;
  name?: string;
  room_name?: string;
  icon?: string;
  room_color?: string;
  room_lights?: string;
  // show_warning?: boolean;
  // show_error?: boolean;
  // test_gui?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
