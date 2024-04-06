import { ActionType, BaseProps } from 'src/constants'
import { IValidator } from './IValidator'
import * as core from '@actions/core'
import * as fs from 'fs'
import path from 'path'
import { findFilesToUpload, findReleaseFiles } from '../io-utils'
import { validateStringParameter } from 'src/utils'

export interface UploadAabProps extends BaseProps {
  packageName: string
  keyPassword: string
  signingKeyBase64: string
  keystoreAlias: string
  keystorePassword: string
  aabFile: string
}

export class UploadAAb extends IValidator<UploadAabProps> {
  public type: ActionType = ActionType.UPLOAD_AAB

  public validateVariables(): UploadAabProps {
    const data = super.validateVariables()
    const packageName: string = core.getInput('packageName')
    const aabFile: string = core.getInput('aabFile')
    const signingKeyBase64: string = core.getInput('signingKeyBase64')
    const keyPassword: string = core.getInput('keyPassword')
    const keystoreAlias: string = core.getInput('keystoreAlias')
    const keystorePassword: string = core.getInput('keystorePassword')
    validateStringParameter('packageName', packageName);
    validateStringParameter('aabFile', aabFile);
    validateStringParameter('signingKeyBase64', signingKeyBase64);
    validateStringParameter('keyPassword', keyPassword);
    validateStringParameter('keystoreAlias', keystoreAlias);
    validateStringParameter('keystorePassword', keystorePassword);

    return {
    ...data,
      packageName,
      aabFile,
      signingKeyBase64,
      keyPassword,
      keystoreAlias,
      keystorePassword
    }
  }
  
  public async createAntHitRequest(props: UploadAabProps) {
    const headers = {
      Authorization: `Bearer ${props.apiKey}`
    }

    const signingKey = path.join('signingKey.jks')
    fs.writeFileSync(signingKey, props.signingKeyBase64, 'base64')

    const releaseFiles = await findFilesToUpload(props.aabFile)
    core.debug(`Release files: ${JSON.stringify(releaseFiles)}`)
    if (
      !releaseFiles.filesToUpload ||
      !releaseFiles.filesToUpload.length ||
      releaseFiles.filesToUpload.length !== 1
    ) {
      throw new Error('No release files found')
    }

    const axios = require('axios')
    const FormData = require('form-data')
    const formData = new FormData()
    formData.append('file', fs.createReadStream(releaseFiles.filesToUpload[0]))
    formData.append('file', fs.createReadStream(signingKey))
    formData.append('keyPassword', props.keyPassword)
    formData.append('keystoreAlias', props.keystoreAlias)
    formData.append('keystorePassword', props.keystorePassword)

    const response = await axios.post(
      `https://developer-api.indusappstore.com/apis/indus-developerdashboard-service/devtools/aab/upgrade/${props.packageName}`,
      formData,
      { headers }
    )
    console.log(response.statusText)
    console.log(response.status)
    console.log(response.data)
    core.debug(response.data)
  }
}
