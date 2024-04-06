import * as core from '@actions/core'
import { UploadAAb } from './validator/uploadAab'
import { ActionType, BaseProps } from './constants'
import { UploadApk } from './validator/UploadApk'
import { IValidator } from './validator/IValidator'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const type: string = core.getInput('type')

    const validators: IValidator<BaseProps>[] = [
      new UploadAAb(),
      new UploadApk()
    ]
    console.log('Type is ', type)
    for (let i = 0; i < validators.length; i++) {
      const validator = validators[i]
      if (validator.type == type) {
        const props = validator.validateVariables()
        validator.createAntHitRequest(props)
        return
      }
    }

    throw new Error(`type is not valid from these type ${ActionType}`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    console.error(error)
    if (error instanceof Error) core.setFailed(error.message)
  }
}
