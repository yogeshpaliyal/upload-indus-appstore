# Upload-Indus-AppStore

![Upload-Indus-Appstore](https://github.com/yogeshpaliyal/upload-indus-appstore/assets/9381846/3cd8c2f6-4aa8-4f17-a28e-4af7e6239b84)


Upload Android AAB file to Indus App Store.


## Upload AAB File

####  Inputs

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| type | UPLOAD_AAB |
| apiKey           | API Key for Indus App Store, you can get it from Indus AppStore DevTools page                                                           |
| packageName      | Package Name of the App                                                                                                                 |
| aabFilePath      | Path to the AAB file                                                                                                                    |
| signingKeyBase64 | Base64 encoded signing key file (.jks), you can use [Base64 Guru](https://base64.guru/converter/encode/file) to create base64 from file |
| keyPassword      | Password for the signing key file                                                                                                       |
| keystoreAlias    | Alias for the signing key file                                                                                                          |
| keystorePassword | Password for the alias file                

#### Example

```yaml
  - name: Upload App to Indus App Store
    id: upload-indus-app-store
    uses: yogeshpaliyal/upload-indus-appstore@<Latest Version>
    with:
      type: "UPLOAD_AAB"
      apiKey: ${{secrets.INDUS_API_KEY}}
      packageName: com.yogeshpaliyal.keypass
      aabFile: ./tempFiles/*.aab
      signingKeyBase64: ${{ secrets.SIGNING_KEY }}
      keystoreAlias: ${{ secrets.ALIAS }}
      keystorePassword: ${{ secrets.KEY_STORE_PASSWORD }}
      keyPassword: ${{ secrets.KEY_PASSWORD }}
```


## Get App Details

####  Inputs

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| type | GET_APP_DETAILS |
| apiKey           | API Key for Indus App Store, you can get it from Indus AppStore DevTools page                                                           |
| packageName      | Package Name of the App                                                                                                                 |

#### Output

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| result | Get App Detail as description | 



#### Example

```yaml
  - name: Get App Details From Indus App Store
    id: upload-indus-app-store
    uses: yogeshpaliyal/upload-indus-appstore@<Latest Version>
    with:
      type: "GET_APP_DETAILS"
      apiKey: ${{secrets.INDUS_API_KEY}}
      packageName: com.yogeshpaliyal.keypass

  - name: Print Output
        id: output
        run: echo ${{ steps.upload-indus-app-store.outputs.result }}
```


## Get App Stats

####  Inputs

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| type | GET_APP_STATS |
| apiKey           | API Key for Indus App Store, you can get it from Indus AppStore DevTools page                                                           |
| packageName      | Package Name of the App                                                                                                                 |

#### Output

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| result | Get App Detail as description | 



#### Example

```yaml
  - name: Get App Stats From Indus App Store
    id: upload-indus-app-store
    uses: yogeshpaliyal/upload-indus-appstore@<Latest Version>
    with:
      type: "GET_APP_STATS"
      apiKey: ${{secrets.INDUS_API_KEY}}
      packageName: com.yogeshpaliyal.keypass

  - name: Print Output
        id: output
        run: echo ${{ steps.upload-indus-app-store.outputs.result }}
```



## Get App Versions

####  Inputs

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| type | GET_APP_STATS |
| apiKey           | API Key for Indus App Store, you can get it from Indus AppStore DevTools page                                                           |
| packageName      | Package Name of the App                                                                                                                 |

#### Output

| name             | description                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| result | Get App Detail as description | 



#### Example

```yaml
  - name: Get App Stats From Indus App Store
    id: upload-indus-app-store
    uses: yogeshpaliyal/upload-indus-appstore@<Latest Version>
    with:
      type: "GET_APP_VERSIONS"
      apiKey: ${{secrets.INDUS_API_KEY}}
      packageName: com.yogeshpaliyal.keypass

  - name: Print Output
        id: output
        run: echo ${{ steps.upload-indus-app-store.outputs.result }}
```



### Open for Contribution

If you have any idea or want to contribute to this action, feel free to open an issue or PR.






