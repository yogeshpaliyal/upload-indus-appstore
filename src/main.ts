import * as core from '@actions/core'
import { wait } from './wait'
import * as fs from 'fs'
import path from 'path'
import { readFileSync, lstatSync } from 'fs'
const axios = require('axios')
const FormData = require('form-data')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apiKey: string = core.getInput('apiKey')
    const packageName: string = core.getInput('packageName')
    const aabFile: string = core.getInput('aabFile')
    const signingKeyBase64: string = core.getInput('signingKeyBase64')
    const keyPassword: string = core.getInput('keyPassword')
    const keystoreAlias: string = core.getInput('keystoreAlias')
    const keystorePassword: string = core.getInput('keystorePassword')

    const axios = require('axios')

    const headers = {
      Authorization: `Bearer ${apiKey}`
    }

    const signingKey = path.join('signingFile', 'signingKey.jks')
    fs.writeFileSync(signingKey, signingKeyBase64, 'base64')

    const formData = new FormData()
    formData.append('file', fs.createReadStream(aabFile))
    formData.append('file', fs.createReadStream(signingKey))
    formData.append('keyPassword', keyPassword)
    formData.append('keystoreAlias', keystoreAlias)
    formData.append('keystorePassword', keystorePassword)

    const response = await axios.post(
      `https://developer-api.indusappstore.com/apis/indus-developerdashboard-service/devtools/aab/upgrade/${packageName}`,
      formData,
      { headers }
    )

    core.debug(response.data)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
