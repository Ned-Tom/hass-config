---
hide:
  - toc
---
# Navigatie Card

Navigatie kaart voor het weergeven van een pagina titel, terug en instellingen knop aan de bovenkant.

| Standaard                                                                                                                   | Zonder achtergrond                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![Header Preview](../images/Header_Preview-dark.png#only-dark) ![Header Preview](../images/Header_Preview-light.png#only-light) | ![Header Preview](../images/Header_Preview-dark-nobg.png#only-dark) ![Header Preview](../images/Header_Preview-light-nobg.png#only-light) |

*Bedankt voor de basis kaard van @dmatik*
[Bron](https://github.com/dmatik/homeassistant-config/blob/master/homeassistant/config/lovelace_minimalist/templates/card_templates_custom/custom_card_header/card_header.yaml)

???+ note "TeDoen"
    - [x] Basic Card form @dmatik
    - [x] Add aditional button to the right
    - [x] Theme intergration
    - [x] Optie on achtergrond te verwijderen
    - [x] better variables
    - [ ] Meer personalisatie in de toekomst

## Configuration:

The options button always navigates to the Setting's of HomeAssistant.

| Waarde                | Standaard | Required | Notities                                           |
| --------------------- | --------- | -------- | -------------------------------------------------- |
| header_title          |           | ja       | Text in het midden van de kaart                    |
| header_navigate_path  |           | ja       | locatie link van linker / terug knop               |
| header_back_button    | true      | nee      | Zightbaarheid van de linker knop                   |
| header_options_button | true      | nee      | Zightbaarheid van de rechter knop                  |
| header_background     | true      | nee      | Waneer "true" zal de achtergrond worden verwijderd |

## Sample:

```yaml
- type: 'custom:button-card'
  template: tcc_header
  variables:
      card_header_title: "Home"
      card_header_back_button: false
```