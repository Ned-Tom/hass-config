import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registerCustomCard } from "../helpers";
import type { TCCRoomCardConfig } from './tcc-room-config';
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
  type: 'tcc-room',
  name: "TCC Room Card",
  description: "Colorfull Room card",
});

@customElement('tcc-room')
export class TCCRoomCard extends LitElement {
  // public static async getConfigElement(): Promise<LovelaceCardEditor> {
  //   await import('./editor');
  //   return document.createElement('boilerplate-card-editor');
  // }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: TCCRoomCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: TCCRoomCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error('You need to define an entity')
      // throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'Boilerplate',
      ...config,
    };
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    return html`
      <ha-card class="tccRoom">
        <div>
          <p class="tcc-rc-name">name</p>
          <div class="txt"><br/></div>
        </div>
        <div class="tcc-rc-info">
          <ha-icon id="alert" icon="mdi:alert-box"></ha-icon>
          somting
        </div>
      </ha-card>
    `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .tccRoom{
        padding:10px 16px;
      }
      .tccRoom > div{
        margin: 8px 0; 
        color: var(--card-background-color);
      }
      .tccRoom > div > .tcc-rc-name{
        font-weight: bold;
        font-size: 16px;
        margin: 0;
      }
      .tccRoom > .tcc-rc-info{
        padding:8px;
        border-radius: var(--ha-card-border-radius);
        background-color: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow);
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
    `;
    
  }
}