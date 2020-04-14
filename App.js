/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    const formData = new FormData();

    // Emulator Throws - Stream closed
    // Real android device Throws - Could not retrieve file for uri https://facebook.github.io/react/logo-og.png
    formData.append('file', {
      name: 'test.png',
      type: 'image/png',
      uri: 'https://facebook.github.io/react/logo-og.png',
    });

    // Emulator Throws - Stream closed.
    // Real android device Throws - Could not retrieve file for uri /data/user/0/<package_name>/files/omeromer.jpg
    // formData.append('file', {
    //   uri: 'file:///data/user/0/<package_name>/cache/FileThatExists.jpg',
    //   name: 'name.jpg',
    //   type: 'image/jpg',
    // });

    // (without file://) Emulator Throws - Stream closed.
    // (without file://) Real android device Throws -  -  read failed: EBADF (Bad file descriptor)
    // formData.append('file', {
    //  uri: RNFS.DocumentDirectoryPath + '/' + 'fileThatExists.jpg',
    //   name: 'name.jpg',
    //   type: 'image/jpg',
    //   });

    // This doesnt work either... -_- you guessed it, THROWS - Could not retrieve file for uri https://facebook.github.io/react/logo-og.png

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.google.com'); // the address really doesnt matter the error occures before the network request is even made.
    xhr.send(formData);
    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        console.log('success', xhr.responseText);
      } else {
        console.log('error', xhr.responseText); // Always get here..
      }
    };

    // this doesnt work either... just throws for every thing above "Network Request Failed" before it even fires an http request.
    // const r = await fetch(uploadInfo.imageUpload.uploadUrl, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // if (r.ok) {
    //   if (active) {
    //     onAssetUploaded(uploadInfo.imageUpload.downloadUrl);
    //   }
    // } else {
    //   console.log('err yet again');
    //   console.log(await r.text());
    // }
  }, []);
  return null;
};

export default App;
