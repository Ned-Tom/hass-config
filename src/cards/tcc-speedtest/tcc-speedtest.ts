import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registerCustomCard } from "../../helpers";
import type { TCCSpeedtestCardConfig } from './tcc-speedtest-config';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers';

registerCustomCard({
  type: 'tcc-speedtest',
  name: "TCC Speed test Card",
  description: "Speedtest card",
});

@customElement('tcc-speedtest')
export class TCCSpeedtestCard extends LitElement {
  // public static async getConfigElement(): Promise<LovelaceCardEditor> {
  //   await import('./tcc-weather-editor');
  //   // return document.createElement('tcc-room-card-editor');
  //   // return document.createElement(LIGHT_CARD_EDITOR_NAME) as LovelaceCardEditor;
  //   return document.createElement('tcc-room-card-editor') as LovelaceCardEditor;
  // }
  

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: TCCSpeedtestCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: TCCSpeedtestCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error('You need to define an entity')
      // throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      // name: 'Room Name',
      // room_icon: 'mdi:home-outline',
      // room_info: 'notset',
      // room_info_stuffix: '°C',
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.hass && changedProperties.has("hass")) {
        // this.updateControls();
        // this.updateBrightness();
    }
  }

  // Computed card data
  private cdata = {
    bgColor: "var(--card-background-color)",
  };

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {

    return html`
      <ha-card class="tccWeather" style="background-color: ${this.cdata.bgColor};">
        <p>Speed test Card</p>
      </ha-card>
    `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .tccWeather{
        padding:3px 12px;
      }
    `    
  }
}