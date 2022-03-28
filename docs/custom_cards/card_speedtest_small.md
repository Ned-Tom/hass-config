# Small speedtest card

> :exclamation: WARNING, you need the [Speedtest.net](https://www.home-assistant.io/integrations/speedtestdotnet/) intergration to be installed!

Small Speedtest card that shows your current internet speed.

![preview](/images/card_speedtest_small_preview.png#only-light)
![preview](/images/card_speedtest_small_preview-dark.png#only-dark)

## ToDo:

- [x] Basic Card 
- [x] Theme intergration

## Configuration:

The options button always navigates to the Setting's of "HomeAssistant".

| Variable    | Default                   | Required | Notes           |
| ----------- | ------------------------- | -------- | --------------- |
| entity_up   | sensor.speedtest_upload   | no       | Upload Sensor   |
| entity_down | sensor.speedtest_download | no       | Download Sensor |
| entity_ping | sensor.speedtest_ping     | no       | Ping Sensor     |

## Sample:

```yaml
- type: 'custom:button-card'
  template: small-speedtest
  variables:
      entity_up: "sensor.speedtest_upload"
      entity_down: "sensor.speedtest_download"
      entity_ping: "sensor.speedtest_ping"
```