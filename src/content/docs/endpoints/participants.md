---
title: Participants
description: Field reference for the participants export endpoint.
---

## Endpoint

`https://api.example.com/v1/exports/participants`

## Fields

:::note
All dates are in UTC timezone.
:::

| Field                  | Description                                  |
| :--------------------- | :------------------------------------------- |
| transactionId          | Unique transaction ID assigned by Pledge It  |
| id                     | Unique participant ID                        |
| participantEventNumber | Participant event number if enabled          |
| firstName              | Participant first name                       |
| lastName               | Participant last name                        |
| email                  | Participant email                            |
| registrationDate       | Date participant registered                  |
| campaign               | Campaign name and unique identifier          |
| team                   | Team name and unique identifier              |
| fundraiserPageUrl      | URL to participant fundraising page          |
| ticketStatus           | Participant ticket status                    |
| ticketOption           | Name of ticket option                        |
| cost                   | Ticket cost excluding covered fees           |
| discountAmount         | Value of discount applied                    |
| discountCode           | Discount code used                           |
| feesCovered            | Whether supporter covered fees               |
| type                   | Fundraising role of the participant          |
| managedBy              | Name and email of managing user account      |
| registeredBy           | Name of the order buyer                      |
| sponsor                | Sponsor name and contact email               |
| ticketBundle           | Ticket bundle and purchaser information      |
| donorCount             | Number of donations credited                 |
| invitedDonorCount      | Number of invited contacts                   |
| performanceGoal        | Participant activity goal                    |
| actualPerformance      | Actual logged activity                       |
| fundraisingGoal        | Participant fundraising goal                 |
| amountRaised           | Total funds raised credited to participant   |
| estPledgeValue         | Estimated pledge value based on goal         |
| currentPledgeValue     | Current pledge value based on activity       |
| performanceUpdates     | Number of activity updates logged            |
| finishedPerformance    | Indicates if activity has been finalized     |
| stravaConnected        | Historical indicator of Strava connection    |
| activityMetric         | Activity metric selected during registration |
| address1               | Participant street address                   |
| address2               | Participant street address (line 2)          |
| city                   | Participant city                             |
| state                  | Participant state or province                |
| country                | Participant country (2-letter ISO code)      |
| postal                 | Participant postal code                      |

### ticketStatus Values

- Active
- Unclaimed
- Canceled
- Checked In

### feesCovered Values

- Yes
- No
- N/A

### type Values

- Fundraiser
- Ticket-Only
- Team Captain

## Example Response

```json
{
	"limit": 50,
	"offset": 0,
	"data": [
		{
			"transactionId": "pt_9001",
			"id": "pt_9001",
			"participantEventNumber": "A-102",
			"firstName": "Casey",
			"lastName": "Nguyen",
			"email": "casey.nguyen@example.com",
			"registrationDate": "2026-03-02 08:30:00",
			"campaign": {
				"id": "cmp_2001",
				"name": "Spring Launch Campaign"
			},
			"team": {
				"id": "team_3001",
				"name": "North Region Team"
			},
			"fundraiserPageUrl": "https://example.com/fundraisers/casey-nguyen",
			"ticketStatus": "Active",
			"ticketOption": "General Admission",
			"cost": "75.00",
			"discountAmount": "10.00",
			"discountCode": "WELCOME10",
			"feesCovered": "Yes",
			"type": "Fundraiser",
			"donorCount": 12,
			"invitedDonorCount": 30,
			"performanceGoal": "100",
			"actualPerformance": "42",
			"fundraisingGoal": "5000.00",
			"amountRaised": "2150.00",
			"estPledgeValue": "3200.00",
			"currentPledgeValue": "2150.00",
			"performanceUpdates": 6,
			"finishedPerformance": "No",
			"activityMetric": "miles",
			"address1": "500 Pine Avenue",
			"address2": "Unit 8",
			"city": "Portland",
			"state": "OR",
			"country": "US",
			"postal": "97205"
		}
	]
}
```