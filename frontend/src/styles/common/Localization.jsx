import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';


let strings = new LocalizedStrings({
    en:{
        email: "error"
    },
    ru: {
        email: "ошибка"
    }
});

export default