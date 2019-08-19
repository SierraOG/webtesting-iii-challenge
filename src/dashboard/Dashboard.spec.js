// Test away
import React from "react";
import renderer from "react-test-renderer"; 
import { render, fireEvent } from "@testing-library/react";

import Dashboard from './Dashboard'

describe("<Dashboard />", () => {
    it("matches snapshot", () => {
        const tree = renderer.create(<Dashboard />); // generates a DOM tree
    
        // snapshots are a JSON representation of the DOM tree
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it("defaults to unlocked and opened", () => {
        const { findByText } = render(<Dashboard />);
        expect(findByText(/open/i)).toBeDefined
        expect(findByText(/unlocked/i)).toBeDefined
        expect(findByText(/closed/i)).toBeUndefined
        expect(findByText(/locked/i)).toBeUndefined
    })

})