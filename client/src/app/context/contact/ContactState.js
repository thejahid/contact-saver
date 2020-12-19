import react, { useReducer } from 'react'
import uuid from 'uuid'
import contactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
} from '../types.js'

const ContactState = (props) => {
    const InitialState = {
        contacts: [
            {
                id: 1,
                name: 'Minhajul Islam',
                email: 'minhajul@gmail.com',
                phone: '222-222-2222',
                type: 'personal',
            },
            {
                id: 2,
                name: 'Moftab Islam',
                email: 'islam@gmail.com',
                phone: '333-222-2222',
                type: 'personal',
            },
            {
                id: 3,
                name: 'Tanvin Nahar',
                email: 'tavin@gmail.com',
                phone: '222-222-444',
                type: 'professional',
            },
        ],
    }
}
