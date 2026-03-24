---
title: Using the API
description: Authentication, headers, query parameters, and response format for the sample export API.
---

All requests should be made to:

```text
https://api.example.com/v1/exports/{resource}
```

Where `{resource}` specifies the type of records being requested.

Supported resource values:

- `participants`
- `donations`

Example:

```text
https://api.example.com/v1/exports/participants
```

## Request Method

All API requests must be made using the **HTTP GET** method with parameters supplied via the **query string**.

## Required Headers

| Header        | Value                 |
| :------------ | :-------------------- |
| Content-Type  | application/json      |
| Accept        | application/json      |
| Authorization | ApiKey `<your-api-key>` |

## Authorization

API access is authenticated using an **API Key**. The API key must be supplied in the `Authorization` header and prefixed with `ApiKey`.

Example:

```text
Authorization: ApiKey demo-test-key
```

If the API key is missing or invalid, the server will return an authorization error.

## Query Parameters

The following parameters can be provided via the request query string.

### `format` (required)

Specifies the format of the returned dataset.

Supported values:

- `json`
- `csv`

Example:

```text
format=json
```

### `organizationId` (required)

The ID of the organization whose records should be returned.

Example:

```text
organizationId=12345
```

### `startDate`

Filters records by **creation date**, returning only records created on or after the provided date.

Example:

```text
startDate=2025-01-01
```

### `endDate`

Filters records by **creation date**, returning only records created on or before the provided date.

Example:

```text
endDate=2025-01-31
```

### `limit`

Controls the **number of records returned** in a single response. This parameter is typically used for pagination.

### `offset`

Specifies the **number of records to skip** before returning results. This allows clients to paginate through large datasets.

Example:

```text
offset=100
```

## Response Format

```json
{
  "limit": 50,
  "offset": 100,
  "data": [{ "id": "pt_001", "firstName": "Alex" }]
}
```

| Field  | Description                           |
| :----- | :------------------------------------ |
| limit  | Maximum number of records requested   |
| offset | Number of records skipped             |
| data   | Array containing the returned records |