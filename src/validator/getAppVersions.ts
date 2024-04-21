import { ActionType, BaseProps } from 'src/constants'
import { IValidator } from './IValidator'
import * as core from '@actions/core'
import { validateStringParameter } from 'src/utils'
import { GetAppDetailProps } from './getAppDetail'


export class GetAppStats extends IValidator<GetAppDetailProps> {
  public type: ActionType = ActionType.GET_APP_VERSIONS

  public validateVariables(): GetAppDetailProps {
    const data = super.validateVariables()
    const packageName: string = core.getInput('packageName')
   
    validateStringParameter('packageName', packageName);

    return {
    ...data,
      packageName,
    }
  }
  
  public async createAntHitRequest(props: GetAppDetailProps) {
    const headers = {
      Authorization: `Bearer ${props.apiKey}`
    }


    const axios = require('axios')
    
    const response = await axios.get(
      `https://developer-api.indusappstore.com/apis/indus-developerdashboard-service/devtools/app/versions/${props.packageName}`,
      { headers }
    )
    console.log(response.statusText)
    console.log(response.status)
    console.log(response.data)
    core.debug(response.data)
    core.setOutput("result", response.data)
  }
}
