import { ActionType, BaseProps } from 'src/constants'
import { IValidator } from './IValidator'
import * as core from '@actions/core'
import * as fs from 'fs'
import path from 'path'
import { findFilesToUpload, findReleaseFiles } from '../io-utils'
import { validateStringParameter } from 'src/utils'

export interface UploadApkProps extends BaseProps {
  packageName: string
  apkFile: string
}

export class UploadApk extends IValidator<UploadApkProps> {
  public type: ActionType = ActionType.UPLOAD_AAB

  public validateVariables(): UploadApkProps {
    const data = super.validateVariables()
    const packageName: string = core.getInput('packageName')
    const apkFile: string = core.getInput('apkFile')
   
    validateStringParameter('packageName', packageName);
    validateStringParameter('apkFile', apkFile);

    return {
    ...data,
      packageName,
      apkFile
    }
  }
  
  public async createAntHitRequest(props: UploadApkProps) {
    const headers = {
      Authorization: `Bearer ${props.apiKey}`
    }

    const releaseFiles = await findFilesToUpload(props.apkFile)
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
    
    const response = await axios.post(
      `https://developer-api.indusappstore.com/apis/indus-developerdashboard-service/devtools/apk/upgrade/${props.packageName}`,
      formData,
      { headers }
    )
    console.log(response.statusText)
    console.log(response.status)
    console.log(response.data)
    core.debug(response.data)
  }
}
