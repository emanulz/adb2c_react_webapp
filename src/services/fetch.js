/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const callApiWithToken = async (accessToken, apiEndpoint) => {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export const callApiPostWithToken = async (accessToken, apiEndpoint, data) => {
  const headers = new Headers()

  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)
  headers.append('Content-Type', 'application/json')

  const body = JSON.stringify(data)
  //   const fixedBody = `{"documentType":"OTHER_DOCUMENT","notes":"NOTES TO TEST","documentDate": "2022-10-20"}`

  const options = {
    method: 'POST',
    headers: headers,
    body: body,
  }

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}
