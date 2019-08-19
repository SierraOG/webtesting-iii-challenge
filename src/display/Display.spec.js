// Test away!
import React from "react";
import renderer from "react-test-renderer"; 
import { toHaveClass } from '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react";

import Display from './Display'

describe("<Display />", () => {
    it("matches snapshot", () => {
        const tree = renderer.create(<Display />); // generates a DOM tree
    
        // snapshots are a JSON representation of the DOM tree
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it("displays open if open and unlocked if unlocked", () => {
        const { findByText } = render(<Display closed={false} locked={false}/>);
        expect(findByText(/open/i)).toBeDefined
        expect(findByText(/unlocked/i)).toBeDefined;
    })
    it("displays closed if closed and locked if locked", () => {
        const { findByText } = render(<Display closed={true} locked={true}/>);
        expect(findByText(/closed/i)).toBeDefined
        expect(findByText(/locked/i)).toBeDefined
    })
    it("when closed and locked both buttons should have class name red-led", () => {
        const { getByText } = render(<Display closed={true} locked={true}/>);
        expect(getByText(/closed/i).classList[1]).toEqual('red-led')
        expect(getByText(/locked/i).classList[1]).toEqual('red-led')
    })
    it("when open and unlocked both buttons should have class name green-led", () => {
        const { getByText } = render(<Display open={true} unlocked={true}/>);
        expect(getByText(/open/i).classList[1]).toEqual('green-led')
        expect(getByText(/unlocked/i).classList[1]).toEqual('green-led')
    })
})