import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { registerCustomCard } from "../helpers";
// import {
//   HomeAssistant,
//   hasConfigOrEntityChanged,
//   hasAction,
//   ActionHandlerEvent,
//   handleAction,
//   LovelaceCardEditor,
//   getLovelace,
// } from 'custom-card-helpers';

registerCustomCard({
  type: 'tcc-room',
  name: "TCC Room Card",
  description: "Colorfull Room card",
});

@customElement('tcc-room')
export class tccroomcard extends LitElement {

}