import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registerCustomCard } from "../../helpers";
import { actionHandler } from "../../helpers/action-handler";
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
  name: "TCC Light Bubble Card",
  description: "Card for light or Group entity",
});

@customElement('tcc-bubble')
export class TCCBubbleCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./tcc-bubble-editor');
    // return document.createElement('boilerplate-card-editor');
    return document.createElement('tcc-bubble-card-editor') as LovelaceCardEditor;
  }

  // public static getStubConfig(): Record<string, unknown> {
  //   return {};
  // }

  public static async getStubConfig(hass: HomeAssistant): Promise<TCCBubbleCardConfig> {
    const entities = Object.keys(hass.states);
    const lights = entities.filter((e) => ["light"].includes(e.split(".")[0]));
    return {
        type: `custom:tcc-bubble`,
        entity: lights[0],
    };
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
      tap_action: {
        action: "toggle",
      },
      hold_action: {
        action: "more-info",
      },
      name: 'notset',
      icon: 'mdi:lightbulb-outline',
      ...config,
    };
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {

      // Computed card data
    let cdata = {
      bgColor: "var(--card-background-color)" as string,
      iconColor: "var(--primary-text-color)" as string,
      lightName: "Bubble" as string,
      // lightName: this.hass.states[this.config.entity].attributes.friendly_name
    };

    if(this.hass.states[this.config.entity].state == 'on'){
      cdata.bgColor = '#FBE6C8';
      cdata.iconColor = '#FF9800';
    }else{
      cdata.bgColor = "var(--card-background-color)";
      cdata.iconColor = "var(--primary-text-color)";
    }

    if(this.config.name == 'notset'){
      // cdata.lightName = this.hass.states[this.config.entity].attributes.friendly_name;
      cdata.lightName = String(this.hass.states[this.config.entity].attributes.friendly_name)
    }

    // if(this.hass.states[this.config.entity].attributes.friendly_name){
    //   cdata.lightName = String(this.hass.states[this.config.entity].attributes.friendly_name)
    // }


    // return html`
    //   <ha-card class="tccBubble" @action=${this._handleAction}
    //   .actionHandler=${actionHandler({
    //       hasHold: hasAction(this._config.hold_action),
    //       hasDoubleClick: hasAction(this._config.double_tap_action),
    //   })}>
    //     <div class="button" style="background-color: ${cdata.bgColor}; color: ${cdata.iconColor};">
    //       <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
    //     </div>
    //     <p>${cdata.lightName}</p>
    //   </ha-card>
    // `;

    // return html`
    //   <ha-card class="tccBubble">
    //     <div class="button" style="background-color: ${cdata.bgColor}; color: ${cdata.iconColor};">
    //       <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
    //     </div>
    //     <p>${cdata.lightName}</p>
    //   </ha-card>
    // `;

    // return html`
    //   <ha-card class="tccBubble" @click="${(e) => console.log(e.target)}">
    //     <div class="button" style="background-color: ${cdata.bgColor}; color: ${cdata.iconColor};">
    //       <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
    //     </div>
    //     <p>${cdata.lightName}</p>
    //   </ha-card>
    // `;

    // return html`
    //   <ha-card class="tccBubble" @click="${this.toggle(this.config.entity)}">
    //     <div class="button" style="background-color: ${cdata.bgColor}; color: ${cdata.iconColor};">
    //       <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
    //     </div>
    //     <p>${cdata.lightName}</p>
    //   </ha-card>
    // `;


    return html`
      <ha-card class="tccBubble"
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
            hasHold: hasAction(this.config.hold_action),
            hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
      >
        <div class="button" style="background-color: ${cdata.bgColor}; color: ${cdata.iconColor};">
          <ha-icon id="tcc-bc-icon" icon="${this.config.icon}"></ha-icon>
        </div>
        <p>${cdata.lightName}</p>
      </ha-card>
    `;
  }



  // _toggle(state) {
  //   this.hass.callService("homeassistant", "toggle", {
  //     entity_id: state.entity_id
  //   });
  // }

  // toggle(id) {
  //   // this.hass.callService("homeassistant", "toggle", {
  //   //   entity_id: id
  //   // });
  //   console.log(id)
  // }

  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this.config!, ev.detail.action!);
    // console.log("Do somting!")
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .tccBubble{
        padding: 5px;
        background-color: transparent;
        box-shadow: none;
      }
      .tccBubble > .button{
        padding:8px;
        border-radius: 50%;
        box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
        width: 60px;
        height: 60px;
        padding: 0;
        margin: 0 auto;
        transition-property: background-color, box-shadow;
        transition-duration: 280ms;
        transition-timing-function: ease-out;
      }
      .tccBubble > p{
        width: 100%; 
        text-align: center;
        margin: 5px 0;
      }
      .tccBubble > .button > ha-icon{
        display: block; 
        text-align: center;
        line-height: 58px;
        width: 60px;
        height: 60px;
      }
    `;

  }
}