import React from "react";
import {getByTestId,render} from'@testing-library/react'
import Gallery from "../Gallery";
let container = null;

describe("Gallery Component Testing", () =>{
    beforeEach( () =>{
        container = render(<Gallery/>).container;
    })
    it('should Render the Gallery Div', () =>{
        expect(getByTestId(container, 'gallery-div')).toBeTruthy();
    });
    it('should Render the Gallery header', () =>{
        expect(getByTestId(container, 'gallery-header')).toBeTruthy();
    });
    it('should Render the Gallery topic', () =>{
        expect(getByTestId(container, 'gallery-topic')).toBeTruthy();
        expect(getByTestId(container, 'gallery-topic').textContent).toBe('Gallery Page');
    });
    it('should Render the Gallery description', () =>{
        expect(getByTestId(container, 'gallery-des')).toBeTruthy();
        expect(getByTestId(container, 'gallery-des').textContent).toBe('This section contain all the latest Event Gallery');
    })
    it('should Render the Gallery tiles', () =>{
        expect(getByTestId(container, 'gallery-tiles')).toBeTruthy();
    });
})