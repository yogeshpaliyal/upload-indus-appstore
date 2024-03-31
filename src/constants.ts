export enum ActionType {
    UPLOAD_AAB = "UPLOAD_AAB",
    UPLOAD_APK = "UPLOAD_APK",
    UPLOAD_APKs = "UPLOAD_APKs",
    UPDATE_METADATA = "UPDATE_METADATA",
    GET_APP_STATS = "GET_APP_STATS",
    GET_APP_DETAILS = "GET_APP_DETAILS",
    GET_APP_VERSIONS = "GET_APP_VERSIONS",
}

export interface BaseProps {
    apiKey: string
}