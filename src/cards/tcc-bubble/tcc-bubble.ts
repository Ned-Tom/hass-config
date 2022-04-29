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
  type: 'tcc-bubble',
  name: "TCC Light Card",
  description: "Card for light or Group entity",
});

@customElement('tcc-bubble')
export class tccbubblecard extends LitElement {

}