export const ENDPOINT = "https://helpinghandapi.herokuapp.com/"

export const DEFAULTSTATE = {events: [], location: [40.715280, -73.954260], currentUser: {id: null, confirm_event_info: [], donations: []}, userEvents: [], sponsor: false}

export const TESTSPONSOR = ({
  "id": 1,
  "first_name": "Bill",
  "last_name": "Gates",
  "credit": 1997010,
  "total_donations": 2990,
  "donations": [
    {
      "id": 1,
      "event_id": 1,
      "sponsor_id": 1,
      "amount_per_volunteer": 100,
      "sponsor_name": "Bill Gates"
    },
    {
      "id": 4,
      "event_id": 2,
      "sponsor_id": 1,
      "amount_per_volunteer": 55,
      "sponsor_name": "Bill Gates"
    }
  ]
})

export const GEOAPI = `AIzaSyA-kXyO4hu_HuTp2rb36ub5Adun3uY88n8`
