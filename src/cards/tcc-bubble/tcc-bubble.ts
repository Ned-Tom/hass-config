import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registerCustomCard } from "../helpers";
import type { TCCBubbleCardConfig } from './tcc-bubble-config';
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
  type: 'tcc-bubble',
  name: "TCC Light Card",
  description: "Card for light or Group entity",
});

@customElement('tcc-bubble')
export class TCCBubbleCard extends LitElement {
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

  @state() private config!: TCCBubbleCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: TCCBubbleCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error('You need to define an entity')
      // throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'notset',
      icon: 'mdi:alert-box',
      ...config,
    };
  }

  // // https://lit.dev/docs/components/properties/#accessors-custom
  // public setConfig(config: BoilerplateCardConfig): void {
  //   // TODO Check for required fields and that they are of the proper format
  //   if (!config) {
  //     throw new Error(localize('common.invalid_configuration'));
  //   }

  //   if (config.test_gui) {
  //     getLovelace().setEditMode(true);
  //   }


  // Computed card data
  private cdata = {
    bgColor: "var(--card-background-color)",
    iconColor: "var(--primary-text-color)",
    lightName: "Bubble"
  };

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {

    if(this.hass.states[this.config.entity].state == 'on'){
      this.cdata.bgColor = '#FBE6C8';
      this.cdata.iconColor = '#FF9800';
    }else{
      this.cdata.bgColor = "var(--card-background-color)";
      this.cdata.iconColor = "var(--primary-text-color)";
    }

    if(this.config.name == 'notset'){
      this.cdata.lightName = this.hass.states[this.config.entity].attributes.friendly_name;
    }


    return html`
      <ha-card class="tccBubble">
        <div class="button" style="background-color: ${this.cdata.bgColor}; color: ${this.cdata.iconColor};">
          <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
        </div>
        <p>${this.cdata.lightName}</p>
      </ha-card>
    `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .tccBubble{
        padding:5px;
        background-color: transparent;
        box-shadow: none;
      }
      .tccBubble > .button{
        padding:8px;
        border-radius: 50%;
        box-shadow: var(--ha-card-box-shadow);
        width: 60px;
        height: 60px;
        padding: 0;
        margin: 0 auto;
        transition-property: background-color, box-shadow;
        transition-duration: 280ms;
        transition-timing-function: ease-out;
      }
      .tccBubble > p{
        width:100%; 
        text-align: center;
      }
      .tccBubble > .button > ha-icon{
        display:block; 
        text-align: center;
        line-height: 58px;
        width: 60px;
        height: 60px;
      }
    `;

  }
}