import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { TCCBubbleCardConfig } from './tcc-bubble-config';

import { customElement, property, state } from 'lit/decorators.js';

// import { formfieldDefinition } from '../../editor/formfield';
// import { selectDefinition } from '../../editor/select';
// import { switchDefinition } from '../../editor/switch';
// import { textfieldDefinition } from '../../editor/textfield';

@customElement('tcc-bubble-card-editor')
export class TCCBubbleCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
// export class TCCRoomCardEditor extends LitElement {

  @state() private _config?: TCCBubbleCardConfig;

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  private _initialized = false;

  // static elementDefinitions = {
  //   ...textfieldDefinition,
  //   ...selectDefinition,
  //   ...switchDefinition,
  //   ...formfieldDefinition,
  // };

  public setConfig(config: TCCBubbleCardConfig): void {
    this._config = config;

    // this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  protected render(): TemplateResult | void {
    // if (!this.hass || !this._helpers) {
    //   return html``;
    // }

    function selectentities(value){
      if(value.startsWith('light') || value.startsWith('group'))
      return value
    }

    // You can restrict on domain type
    // const entities = Object.keys(this.hass.states);
    const entities = Object.keys(this.hass.states).filter(selectentities);
    // console.log(entities)
    // console.log(this.hass.states)
    // const lights = entities.filter(function(value){
    //   if(value.startsWith('light') || value.startsWith('group'))
    //   return value
    // })
    // console.log(lights)


    return html`
      <!--<mwc-select
        naturalMenuWidth
        fixedMenuPosition
        label="Entity (Required)"
        .configValue=${'entity'}
        .value=${this._entity}
        @selected=${this._valueChanged}
        @closed=${(ev) => ev.stopPropagation()}
      >
        ${entities.map((entity) => {
          return html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`;
        })}
      </mwc-select>

      <div class="mdc-select mdc-select--no-label mdc-select--filled mdc-select--with-leading-icon">-->

      <select name="entity" id="entity" value=${this._entity} class="mdc-select"
      @selected=${this._valueChanged}
      @closed=${(ev) => ev.stopPropagation()}>
        ${entities.map((entity) => {
          return html`<option value=${entity}>${entity}</option>`;
        })}
      </select>

      <p>${this._entity}</p>

      <p>Some future Editor</p>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    // if (this._helpers === undefined) return;
    this._initialized = true;
  }

  // private async loadCardHelpers(): Promise<void> {
  //   this._helpers = await (window as any).loadCardHelpers();
  // }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  // static styles: CSSResultGroup = css`
  //   mwc-select,
  //   mwc-textfield {
  //     margin-bottom: 16px;
  //     display: block;
  //   }
  //   mwc-formfield {
  //     padding-bottom: 8px;
  //   }
  //   mwc-switch {
  //     --mdc-theme-secondary: var(--switch-checked-color);
  //   }
  // `;
}