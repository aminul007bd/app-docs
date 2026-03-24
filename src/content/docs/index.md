---
title: App Docs
description: Sample overview content for the App Docs documentation site.
---

This is a placeholder landing page for the documentation site. Replace this text with your real product or API overview when you are ready.

## Dummy Data

- Product name: `App API`
- Environment: `Sandbox`
- Version: `v1`
- Support email: `support@example.com`
- Base URL: `https://api.example.com/v1`

## Quick Links

- [Using the API](./api-usage/)
- [Endpoints](./endpoints/)
- [Donations Endpoint](./endpoints/donations/)
- [Participants Endpoint](./endpoints/participants/)

## Notes

:::note
This page currently contains dummy content so the docs home page is valid after the previous pages were removed.
:::

## Example Request

```bash
curl -X GET "https://api.example.com/v1/participants?organizationId=12345&format=json" \
  -H "Accept: application/json" \
  -H "Authorization: ApiKey demo-key"
```