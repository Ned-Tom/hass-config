# Card_Header

Header card for showing an title and back button at the top.

![Header Preview.png](Header%20Preview.png)

*Thanks for the basic desing from @dmatik*
[Source](https://github.com/dmatik/homeassistant-config/blob/master/homeassistant/config/lovelace_minimalist/templates/card_templates_custom/custom_card_header/card_header.yaml)

## ToDo:

- [x] Basic Card form @dmatik
- [x] Add aditional button to the right
- [x] Theme intergration
- [x] Option to remove background
- [x] better variables
- [ ] more customization options in the future.

## Configuration:

The options button always navigates to the Setting's of HomeAssistant.

| Variable              | Default | Required | Notes                                        |
| --------------------- | ------- | -------- | -------------------------------------------- |
| header_title          |         | no       | Text show in the center of the bar           |
| header_navigate_path  |         | no       | Path of the left button                      |
| header_back_button    | true    | no       | Visability of the left button                |
| header_options_button | true    | no       | Visability of the right button               |
| header_background     | true    | no       | When false removes the background and shadow |

## Sample:

```yaml
- type: 'custom:button-card'
  template: tcc_header
  variables:
      header_title: "Home"
      header_back_button: false
```