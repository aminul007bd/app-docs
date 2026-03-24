---
title: Donations
description: Field reference and example response for the donations export endpoint.
---

## Endpoint

`https://api.example.com/v1/exports/donations`

## Fields

:::note
All dates are in UTC timezone.
:::

| Field                   | Description                                                                                                                   |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| transactionId           | Unique transaction ID assigned by Pledge It and used across reports                                                           |
| id                      | Unique donation ID (may match transactionId)                                                                                  |
| firstName               | Donor first name                                                                                                              |
| lastName                | Donor last name                                                                                                               |
| email                   | Donor email                                                                                                                   |
| donationType            | Type of donation                                                                                                              |
| campaign                | Campaign name and unique identifier                                                                                           |
| team                    | Credited fundraising team name and identifier                                                                                 |
| fundraiser              | Credited fundraiser name and unique identifier                                                                                |
| status                  | Donation status                                                                                                               |
| fundedNeed              | Need name and unique identifier, for fund-a-need event activities (future)                                                    |
| givingPlan              | Recurring giving plan unique identifier and status (future)                                                                   |
| creationDate            | Date the donation was added                                                                                                   |
| chargeDate              | Date the donation was successfully charged                                                                                    |
| pledgeInvoiceDate       | Date a pledge will be invoiced                                                                                                |
| totalAmount             | Total donation including covered fees                                                                                         |
| intendedDonation        | Original donation amount before covered fees                                                                                  |
| feesCovered             | Amount donor added to cover fees (future - changing to whether or not the supporter covered fees, not the covered fee amount) |
| address1                | Donor street address                                                                                                          |
| address2                | Donor street address (line 2)                                                                                                 |
| city                    | Donor city                                                                                                                    |
| state                   | Donor state or province                                                                                                       |
| country                 | Donor country (2-letter ISO code)                                                                                             |
| postal                  | Donor postal code                                                                                                             |
| offlinePaymentType      | Type of offline payment (deprecated)                                                                                          |
| offlineOtherPaymentInfo | Additional payment details (deprecated)                                                                                       |
| donorNameHidden         | Indicates if donor name is hidden on public pages                                                                             |

### donationType Values

- **Flat Donation**: One-time donation
- **Offline Donation**: Offline donation entered into the system by a campaign manager
- **Pledge**: Pledge toward future fundraiser activity
- **In-Order donation**: Donation made as part of campaign registration
- **Commitment Charge**: Money charged against a fundraising commitment
- **Fund a need**: Donation created as part of a live event paddle raise or fund-a-need activity
- **Monthly Donation**: Recurring donation automatically charged every month
- **Quarterly Donation**: Recurring donation automatically charged every three months
- **Yearly Donation**: Recurring donation automatically charged every year

### status Values

These statuses only apply to donations that paid via credit card or certain digital wallet payments.

- **charged**: Donation has been successfully charged
- **failing**: Donation has failed payment and will be retried automatically
- **failed**: Donation has failed payment and will not be retried

### feesCovered Values (future)

- Yes
- No
- N/A

## Example Response

```json
{
  "limit": 50,
  "offset": 100,
  "data": [
    {
      "transactionId": "don_1001",
      "id": "don_1001",
      "firstName": "Alex",
      "lastName": "Taylor",
      "email": "alex.taylor@example.com",
      "donationType": "Flat Donation",
      "campaign": {
        "id": "cmp_2001",
        "name": "Spring Launch Campaign"
      },
      "team": {
        "id": "team_3001",
        "name": "North Region Team"
      },
      "fundraiser": {
        "id": "fr_4001",
        "name": "Jordan Lee"
      },
      "status": "charged",
      "creationDate": "2026-03-01 10:15:00",
      "chargeDate": "2026-03-01 10:15:02",
      "totalAmount": "250.00",
      "intendedDonation": "240.00",
      "feesCovered": "10.00",
      "address1": "100 Market Street",
      "address2": "Floor 2",
      "city": "Seattle",
      "state": "WA",
      "country": "US",
      "postal": "98101",
      "donorNameHidden": "No"
    },
    {
      "transactionId": "don_1002",
      "id": "don_1002",
      "firstName": "Morgan",
      "lastName": "Patel",
      "email": "morgan.patel@example.com",
      "donationType": "Offline Donation",
      "campaign": {
        "id": "cmp_2001",
        "name": "Spring Launch Campaign"
      },
      "creationDate": "2026-03-05 09:00:00",
      "totalAmount": "1000.00",
      "intendedDonation": "1000.00",
      "offlinePaymentType": "Personal Check",
      "offlineOtherPaymentInfo": "Check #2048",
      "donorNameHidden": "No"
    }
  ]
}
```