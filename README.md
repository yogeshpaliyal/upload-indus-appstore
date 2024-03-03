# Upload-Indus-AppStore

Upload Android AAB file to Indus App Store.


### Inputs
| name             | description                                                                                                                             | default value |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------|
| apiKey           | API Key for Indus App Store, you can get it from Indus AppStore DevTools page                                                           |               |
| aabFilePath      | Path to the AAB file                                                                                                                    |               |
| packageName      | Package Name of the App                                                                                                                 |               |
| signingKeyBase64 | Base64 encoded signing key file (.jks), you can use [Base64 Guru](https://base64.guru/converter/encode/file) to create base64 from file |               |
| keyPassword      | Password for the signing key file                                                                                                       |               |
| keystoreAlias    | Alias for the signing key file                                                                                                          |               |
| keystorePassword | Password for the alias file                                                                                                             |               |



### Example
```yaml
  - name: Upload App to Indus App Store
    id: upload-indus-app-store
    uses: ./
    with:
      apiKey: ${{secrets.INDUS_API_KEY}}
      packageName: com.yogeshpaliyal.keypass
      aabFile: ./tempFiles/*.aab
      signingKeyBase64: ${{ secrets.SIGNING_KEY }}
      keystoreAlias: ${{ secrets.ALIAS }}
      keystorePassword: ${{ secrets.KEY_STORE_PASSWORD }}
      keyPassword: ${{ secrets.KEY_PASSWORD }}
```


### Open for Contribution
If you have any idea or want to contribute to this action, feel free to open an issue or PR.






