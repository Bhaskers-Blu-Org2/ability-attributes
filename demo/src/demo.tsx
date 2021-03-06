/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { DevEnv, Schema } from 'ability-attributes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button, Checkbox, PopupButton } from './schema';

DevEnv.setup();

ReactDOM.render(
    <>
        <h1>Hello world</h1>

        <button role='button' aria-labelledby='lalal'>
            Button
        </button>

        <span { ...getAccessibilityAttributes('span', Button, { label: 'Button2', disabled: true }) }>
            Button2
        </span>

        <div>
            <input
                type='checkbox'
                aria-label='Lalal'
                defaultChecked
                data-aa-class='Checkbox'
            />
            Lalal
            <input
                type='button'
                data-aa-class='Button'
                value='Piu'
            />

            <button aria-haspopup='true' data-aa-class='PopupButton'>Popup</button>
            <div { ...getAccessibilityAttributes('div', PopupButton, { disabled: true }) }>Popup2</div>
        </div>

        <div { ...getAccessibilityAttributes('div', Checkbox, { checked: true }) }>
            Ololo
        </div>
    </>,

    document.getElementById('demo')
);

function getAccessibilityAttributes<P>(tagName: string, Class: Schema.AttributeSchemaClass<P>, params: P) {
    const attrs = new Class(tagName, params).getAttributes();

    if (attrs.tabindex !== undefined) {
        attrs.tabIndex = attrs.tabindex;
        delete attrs.tabindex;
    }

    for (let attrName in attrs) {
        if (attrs[attrName] === '') {
            attrs[attrName] = attrName;
        }
    }

    return attrs;
}
