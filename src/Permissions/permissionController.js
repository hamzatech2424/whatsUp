import { check, request, requestMultiple, RESULTS, PERMISSIONS, checkMultiple,checkLocationAccuracy } from 'react-native-permissions';
import { Platform } from 'react-native';
class PermissionsController {
  constructor() {
    const translatePermissionResult = (result, title = '') => {
      let granted = false;
      let message = '';
      switch (result) {
        case RESULTS.BLOCKED:
          message = `You blocked ${title}`;
          break;
        case RESULTS.DENIED:
          message = `${title} permission denied`;
          break;
        case RESULTS.GRANTED:
          message = `${title} permission granted`;
          granted = true;
          break;
        case RESULTS.LIMITED:
          message = `${title} permission limited`;
          granted = true;
          break;
        case RESULTS.UNAVAILABLE:
          message = `${title} hardware unavailable or damaged`;
          granted = true;
          break;
        default:
          break;
      }
      return { granted, message };
    };

    const checkAudioPermission = () => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'android') {
          checkMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.RECORD_AUDIO])
            .then((results) => {
              let writeRes = translatePermissionResult(results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE].granted, 'write Storage');
              let readRes = translatePermissionResult(results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE].granted, 'read Storage');
              let recordRes = translatePermissionResult(results[PERMISSIONS.ANDROID.RECORD_AUDIO].granted, 'record Audio');
              if(writeRes.granted && readRes.granted && recordRes.granted){
                 resolve(`Already have All Audio permissions`);
              }else{
                reject(`${writeRes.message} ${readRes.granted} ${recordRes.message}`);
              }
            })
            .catch((err) => {
              reject('Unable to Check Audio Permission');
            });
        } else {
          check(PERMISSIONS.IOS.MICROPHONE)
            .then((result) => {
              let tResult = translatePermissionResult(result, 'Microphone');
              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              reject('Unable to Check Microphone Permission');
            });
        }
      });
    };


    const checkContactsPermission = () => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'android') {
          check(PERMISSIONS.ANDROID.READ_CONTACTS)
            .then((result) => {
              let tResult = translatePermissionResult(result, 'Contacts');
              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              reject('Unable to Check Contacts Permission');
            });
        } else {
          console.log(`Checking location permission`)
          check(PERMISSIONS.IOS.CONTACTS)
            .then((result) => {
              console.log(result);
              let tResult = translatePermissionResult(result, 'Contacts');
              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              reject('Unable to Check Contacts Permission');
            });
        }
      });
    };


    const requestAudioPermission = () => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'android') {
          requestMultiple([
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.RECORD_AUDIO
          ])
            .then((result) => {
              let t1Result = translatePermissionResult(
                result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
                'write Storage'
              );
              let t2Result = translatePermissionResult(
                result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
                'read Storage'
              );
              let t3Result = translatePermissionResult(
                result[PERMISSIONS.ANDROID.RECORD_AUDIO],
                'Audio Record'
              );

              if (t1Result.granted && t2Result.granted && t3Result.granted) {
                resolve(t1Result.message);
              } else {
                reject(`${t2Result.message}, ${t1Result.message} ${t3Result.message}`);
              }
            })
            .catch((err) => {
              reject('Unable to request Audio permissions');
            });
        } else {
          request(PERMISSIONS.IOS.MICROPHONE)
            .then((result) => {
              let tResult = translatePermissionResult(result, 'Microphone');

              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              reject('Unable to request Audio permissions');
            });
        }
      });
    };


    const requestContactsPermission = () => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'android') {
          request(PERMISSIONS.ANDROID.READ_CONTACTS)
            .then((result) => {
              console.log(`Request Contacts Permission Result`);
              console.log(result);
              let tResult = translatePermissionResult(result, 'Contacts');
              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              console.log(`CATCH Error in requesting Contacts permission`);
              console.log(err);
              reject('Unable to Request Contacts Permission');
            });
        } else {
          request(PERMISSIONS.IOS.CONTACTS)
            .then((result) => {
              console.log(`Request Contacts Permission Result`);
              console.log(result);
              let tResult = translatePermissionResult(result, 'Contacts');
              if (tResult.granted) {
                resolve(tResult.message);
              } else {
                reject(tResult.message);
              }
            })
            .catch((err) => {
              console.log(`CATCH Error in requesting Contacts permission`);
              console.log(err);
              reject('Unable to Request Contacts Permission');
            });
        }
      });
    };



    /// PERMISSION HANDLERS

    this.resolveContactsPermission = () => {
      return new Promise((resolve, reject) => {
        checkContactsPermission()
          .then((granted) => {
            resolve(granted);
          })
          .catch((err) => {
            requestContactsPermission()
              .then((plGranted) => {
                resolve(true);
              })
              .catch((err) => {
                reject(err);
              });
          });
      });
    };

    this.resolveAudioPermission = () => {
      return new Promise((resolve, reject) => {
        checkAudioPermission()
          .then((granted) => {
            resolve(granted);
          })
          .catch((err) => {
            requestAudioPermission()
              .then((plGranted) => {
                resolve(plGranted);
              })
              .catch((err) => {
                reject(err);
              });
          });
      });
    };

  }
}
const MyPermissionsController = new PermissionsController();
export default MyPermissionsController;
