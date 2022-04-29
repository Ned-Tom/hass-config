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
  //   await import('./tcc-room-editor');
  //   return document.createElement('tcc-room-card-editor');
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
      name: 'Room Name',
      room_icon: 'mdi:home-outline',
      room_info: 'notset',
      room_info_stuffix: '°C',
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
    infoString: "unavailable",
    infoCount: "0"
  };

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {

    switch(this.config.room_color){
      case 'red':
        this.cdata.bgColor = 'var(--google-red)'
        break;
      case 'green':
        this.cdata.bgColor = 'var(--google-green)'
        break;
      case 'yellow':
        this.cdata.bgColor = 'var(--google-yellow)'
        break;
      case 'blue':
        this.cdata.bgColor = 'var(--google-blue)'
        break;
      case 'violet':
        this.cdata.bgColor = 'var(--google-violet)'
        break;
      case 'grey':
        this.cdata.bgColor = 'var(--google-grey)'
        break;
      default:
        this.cdata.bgColor = 'var(--google-grey)'
    }

    // var this.cdata.infostring = "unavailable"

    if (typeof this.config.room_lights != "undefined") {
      // const lights_entityId = this.config.room_lights
      // const lights_num = hass.states[lights_entityId]
      // this.cdata.infoCount = this.hass.states[this.config.room_lights].state;
      // this.cdata.infoCount = "0";
      // this.cdata.infoCount = this.hass.states[this.config.room_lights] ? this.hass.states[this.config.room_lights].state : "unavailable"
      this.cdata.infoCount = this.hass.states[this.config.room_lights].state
    }else{
      this.cdata.infoCount = "notset"
    }

    switch(this.cdata.infoCount){
      case "0":
        this.cdata.infoString = "All Off"
        break;
      case "1":
        this.cdata.infoString = "1 Light On"
        break;
      case "notset":
        this.cdata.infoString = ""
        break;
      default:
        this.cdata.infoString = this.cdata.infoCount+" Lights On"
    }

    // if (typeof this.config.room_info != "undefined") {
      // this.cdata.temperture = this.hass.states[this.config.room_info].state;
      // this.cdata.temperture = 0
    // }

    return html`
      <ha-card class="tccRoom" style="background-color: ${this.cdata.bgColor};">
        <div>
          <p class="tcc-rc-name">${this.config.room_name}</p>
          <div class="txt">${this.cdata.infoString}</div>
        </div>
        <div class="tcc-rc-info" style="color: ${this.cdata.bgColor}; grid-template-columns: ${ this.config.room_info == 'notset' ? `fr` : `min-content auto` };">
          <ha-icon icon="${this.config.room_icon}"></ha-icon>
          <p>${ this.config.room_info == 'notset' ? " " : this.hass.states[this.config.room_info].state+" "+this.config.room_info_stuffix }</p>
        </div>
      </ha-card>
    `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .tccRoom{
        padding:3px 12px;
      }
      .tccRoom > div{
        margin: 8px 0; 
        color: var(--card-background-color);
      }
      .tccRoom > div > .tcc-rc-name{
        font-weight: bold;
        font-size: 16px;
        margin: 0 5px;
      }
      .tccRoom > div > .txt{
        font-size: 14px;
        margin: 0 5px;
        padding-bottom: 5px;
        height:14px;
      }
      .tccRoom > .tcc-rc-info{
        padding:8px;
        border-radius: var(--ha-card-border-radius);
        background-color: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow);
        display: grid;
        grid-template-rows: 1fr;
      }
      .tccRoom > .tcc-rc-info > ha-icon{
        text-align: center;
      }
      .tccRoom > .tcc-rc-info > p{
        margin:0;
        text-align: right;
        padding-right: 5px;
        font-size: 16px;
      }
    `    
  }
}