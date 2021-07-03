import React from "react";
import {getByTestId,render} from'@testing-library/react'
import RatingPage from "../RatingPage";
let container = null;

describe("Rating Component Testing", () =>{
    beforeEach( () =>{
        container = render(<RatingPage/>).container;
    })
    it('should Render the rating-section', () =>{
        expect(getByTestId(container, 'rating-section')).toBeTruthy();
    });
    it('should Render the rating-header', () =>{
        expect(getByTestId(container, 'rating-header')).toBeTruthy();
    });
    it('should Render the rating-header-main-header', () =>{
        expect(getByTestId(container, 'rating-header-main-header')).toBeTruthy();
        expect(getByTestId(container, 'rating-header-main-header').textContent).toBe('Rating');
    });
    it('should Render the rating-header-second-header', () =>{
        expect(getByTestId(container, 'rating-header-second-header')).toBeTruthy();
        expect(getByTestId(container, 'rating-header-second-header').textContent).toBe('Information');
    });
    it('should Render the Gallery rating-cardLayout', () =>{
        expect(getByTestId(container, 'rating-cardLayout')).toBeTruthy();
    })

})