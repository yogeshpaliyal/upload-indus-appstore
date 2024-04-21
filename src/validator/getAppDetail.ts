import { ActionType, BaseProps } from 'src/constants'
import { IValidator } from './IValidator'
import * as core from '@actions/core'
import { validateStringParameter } from 'src/utils'

export interface GetAppDetailProps extends BaseProps {
  packageName: string
}

export class GetAppDetail extends IValidator<GetAppDetailProps> {
  public type: ActionType = ActionType.GET_APP_DETAILS

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
      `https://developer-api.indusappstore.com/apis/indus-developerdashboard-service/devtools/app/details/${props.packageName}`,
      { headers }
    )
    console.log(response.statusText)
    console.log(response.status)
    console.log(response.data)
    core.debug(response.data)
    core.setOutput("result", response.data)
  }
}
