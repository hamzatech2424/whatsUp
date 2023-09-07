import { useSelector } from "react-redux"
import {
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Contacts from 'react-native-contacts';
import ReduxDispatchController from "./reduxDispatchController";
import axios from 'axios';
import MyPermissionsController from "../Permissions/permissionController";
import { BASE_URL } from "../proxy";
import { useEffect,useState } from "react";

const NETWORK_ERROR = "Internet Error"

class ContactsController {

  static syncContacts = (contactsArray) => {
    return new Promise((resolve, reject) => {

      let sendArray = {
        contacts: contactsArray
      }

      axios
        .post(`${BASE_URL}/contacts/sync-contacts`, sendArray)
        // .post(`http://192.168.1.105:3000/contacts/sync-contacts`, sendArray)
        .then(response => {
          if (response.data.success) {
            resolve(response.data.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(err => {
          console.log(err, "Error in syncContactsApiCall");
          reject(NETWORK_ERROR);
        });
    })
  }


  static filterContactsWithPlatformContacts = (allContactsArray, platformContactsArray) => {
    let syncContactArr = []
    for (let i = 0; i < platformContactsArray.length; i++) {
      let singleContact = platformContactsArray[i]
      allContactsArray.filter((item) => {
        if (item && (item.phoneNumber != singleContact.phoneNumber)) {
          syncContactArr.push(item)
        }
      })
    }
    return syncContactArr
  }


  static getAllContactsFromPhone = (_callback = () => false) => {


    MyPermissionsController.resolveContactsPermission()
      .then((granted) => {
        console.log(granted, 'Permission');
        if (granted) {
          Contacts.getAll()
            .then(contacts => {
              if (contacts) {
                const newArray = contacts.map((item) => {
                  const { displayName, phoneNumbers } = item
                  if (phoneNumbers.length > 0 && phoneNumbers[0].number) {
                    const cellNumber = phoneNumbers[0].number

                    const newPhoneNumber =
                      cellNumber[0] == "+" ? cellNumber.slice(1).replace(/[- )(]/g, "") : cellNumber.replace(/[- )(]/g, "");

                    if (newPhoneNumber.length >= 9) {
                      return {
                        _id: `${Math.floor(Math.random() * 1233131123213)}`,
                        fullName: displayName,
                        phoneNumber: Number(newPhoneNumber.slice(-10)),
                        countryCode: Number(newPhoneNumber.slice(0, -10))
                      }
                    }
                  }
                })
                const sortedArray = newArray.sort((a, b) => a.fullName.localeCompare(b.fullName))

                ContactsController.syncContacts([...new Set(sortedArray)])
                  .then((result) => {
                    const appendOnPlatform = result.map((item) => ({ ...item, onPlatform: true }))
                    let newArr = [...appendOnPlatform.reduce((a, c) => {
                      a.set(c._id, c);
                      return a;
                    }, new Map()).values()];
                    ReduxDispatchController.Contacts.setContactsOnPlatform(newArr)
                    ReduxDispatchController.Contacts.setAllContacts(ContactsController.filterContactsWithPlatformContacts(sortedArray, newArr))
                    _callback(false)
                  })
                  .catch((err) => {
                    console.log(err)
                    _callback(false)
                  })
              }
            })
            .catch(e => {
              console.log(e, "Error")
              // Alert.alert('Contacts Permission Required go to App Permissions')
              _callback(false)
            });
        }

      })
      .catch((error) => {
        console.log(error, "Error")
        Alert.alert(error)
        _callback(false)
      })
  }

}


export default ContactsController


export const useOnPlatformContacts = () => {
  return useSelector((state) => state.ContactReducer.onPlatformContacts)

}

export const useNewInviteContacts = () => {
  return useSelector((state) => state.ContactReducer.onPlatformContacts)
}

export const useMergedContacts = () => {
  const allContacts = useSelector((state) => state.ContactReducer.allContacts)
  const platformContacts = useSelector((state) => state.ContactReducer.onPlatformContacts)
  const onlineUserArray = useSelector((state) => state.ContactReducer.onlineUsers)
  const [newState,setNewState] = useState([])

  useEffect(() => {
    if (onlineUserArray.length > 0) {
      for (let index = 0; index < onlineUserArray.length; index++) {
        const element = onlineUserArray[index];
        setNewState(platformContacts.map(contact => {
          if (contact._id == element) {
            return { ...contact, isUserOnline: true }
          } else {
            return { ...contact, isUserOnline: false }
          }
        }))
      }
    }
    else {
      setNewState(platformContacts)
      console.log(onlineUserArray, "online user ids")
    }
  }, [onlineUserArray, platformContacts])

  return [...newState, ...allContacts]
}



