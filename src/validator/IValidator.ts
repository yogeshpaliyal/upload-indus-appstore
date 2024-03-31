import { ActionType, BaseProps } from "src/constants";
import * as core from '@actions/core'
import { validateStringParameter } from "src/utils";

export abstract class IValidator<T extends BaseProps> {
    public abstract type: ActionType
    public validateVariables(): BaseProps | T {
        const apiKey: string = core.getInput('apiKey')
        validateStringParameter('apiKey', apiKey)
        return { apiKey }
    }
    public async createAntHitRequest(parameters: T){

    }
}

