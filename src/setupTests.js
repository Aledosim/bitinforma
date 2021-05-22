import { enableFetchMocks  } from 'jest-fetch-mock'

enableFetchMocks()
import { tickerResponse, summaryResponse } from './__tests__/fixtures.json'

beforeEach(() => {
  fetch.resetMocks()
  fetch
    .mockResponse(req => {
      if (/.*\/ticker\/.*/.test(req.url)) {
        return Promise.resolve({ body: JSON.stringify(tickerResponse) })

      } else if (/.*\/day-summary\/.*/.test(req.url)) {
        return Promise.resolve({ body: JSON.stringify(summaryResponse) })

      }
    })

})
