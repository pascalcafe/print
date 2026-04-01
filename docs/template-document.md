# Documento JSON do Template

O template da etiqueta e a fonte unica da verdade do EasyPrint.

## Estrutura

```json
{
  "id": "tpl_shipping_label",
  "name": "Etiqueta de Expedicao",
  "version": 3,
  "status": "draft",
  "document": {
    "width": 100,
    "height": 50,
    "unit": "mm",
    "orientation": "landscape",
    "background": "#ffffff",
    "dpi": 203
  },
  "settings": {},
  "dataSchema": [
    {
      "key": "sku",
      "label": "SKU",
      "type": "text",
      "required": true,
      "description": "Codigo principal do item",
      "sampleValue": "ABC-123",
      "fallbackValue": "SEM-SKU",
      "formatType": "uppercase",
      "formatConfig": {}
    }
  ],
  "elements": [
    {
      "id": "el_1",
      "type": "text",
      "name": "Campo dinamico",
      "x": 12,
      "y": 12,
      "width": 36,
      "height": 10,
      "rotation": 0,
      "visible": true,
      "locked": false,
      "zIndex": 1,
      "contentMode": "dynamic",
      "text": "{{sku}}",
      "bindingKey": "sku",
      "placeholder": "SKU",
      "fontSize": 12,
      "fontFamily": "IBM Plex Sans",
      "fontWeight": 500,
      "color": "#0f172a",
      "align": "left"
    },
    {
      "id": "el_2",
      "type": "qrcode",
      "name": "QR Code",
      "x": 68,
      "y": 8,
      "width": 20,
      "height": 20,
      "rotation": 0,
      "visible": true,
      "locked": false,
      "zIndex": 2,
      "value": "https://easyprint.local/template/tpl_shipping_label",
      "errorCorrection": "M"
    }
  ],
  "metadata": {}
}
```

## Regras

- O schema e compartilhado entre frontend e backend.
- O backend valida o documento antes de persistir.
- `TemplateVersion` guarda snapshots completos desse JSON.
- Preview e editor leem o mesmo formato.
- `dataSchema` pode evoluir com fallback e formatacao sem acoplar a UI ao backend.
- `sampleValue`, `fallbackValue`, `formatType` e `description` ajudam o preview operacional do Marco 2.
- `qrcode` passa a fazer parte dos tipos de elemento suportados pelo documento.
