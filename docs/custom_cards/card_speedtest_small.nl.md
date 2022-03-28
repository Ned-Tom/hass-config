---
hide:
  - toc
---
# Kleine internet snelheid kaart

> :exclamation: WAARSCHUWING, je moet de [Speedtest.net](https://www.home-assistant.io/integrations/speedtestdotnet/) intergratie hebben geinstaleerd!

Kleine versie van de Internet snelheids test kaart dat je hudige internet snelheid weergeeft.

![preview](/images/card_speedtest_small_preview.png#only-light)
![preview](/images/card_speedtest_small_preview-dark.png#only-dark)

## TeDoen:

- [x] Basis Kaart 
- [x] Thema intergratie

## Instellingen:

De instellingen knop stuurt je altijd naar de installingen pagina van "HomeAssistant".

| Waarde      | Standaart                 | Nodig | Notities        |
| ----------- | ------------------------- | ----- | --------------- |
| entity_up   | sensor.speedtest_upload   | nee   | Upload Sensor   |
| entity_down | sensor.speedtest_download | nee   | Download Sensor |
| entity_ping | sensor.speedtest_ping     | nee   | Ping Sensor     |

## Voorbeeld:

```yaml
- type: 'custom:button-card'
  template: card_speedtest_small
  variables:
      entity_up: "sensor.speedtest_upload"
      entity_down: "sensor.speedtest_download"
      entity_ping: "sensor.speedtest_ping"
```