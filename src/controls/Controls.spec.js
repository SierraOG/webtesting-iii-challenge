// Test away!
import React from "react";
import renderer from "react-test-renderer"; 
import { render, fireEvent } from "@testing-library/react";

import Controls from './Controls'

describe("<Controls />", () => {
    it("matches snapshot", () => {
        const tree = renderer.create(<Controls />); // generates a DOM tree
    
        // snapshots are a JSON representation of the DOM tree
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('locking is disabled when open', () => {
        const { getByText } = render(<Controls closed={false} locked={false}/>);

        const lockButton = getByText(/Lock Gate/i)
        expect(lockButton).toBeDisabled;
    })
    it('opening is disabled when locked', () => {
        const { getByText } = render(<Controls locked={true} closed={true}/>);

        const openButton = getByText(/Open Gate/i)
        expect(openButton).toBeDisabled;
    })
    it('should invoke a function when unlock or lock gate is clicked', () => {
        const toggleLock = jest.fn();
        
        const {getByText, queryByText} = render(<Controls 
                                                toggleLocked={toggleLock}
                                                locked={true}
                                                closed={true}
                                                />)
        fireEvent.click(getByText(/unlock gate/i));
        expect(toggleLock).toHaveBeenCalled();

        fireEvent.click(getByText(/lock gate/i));
        expect(toggleLock).toHaveBeenCalled();
    })
    it('should invoke a function when open gate is clicked', () => {
        const toggleClose = jest.fn();
        
        const {getByText, queryByText} = render(<Controls 
                                                toggleClosed={toggleClose}
                                                locked={false}
                                                closed={true}
                                                />)
        fireEvent.click(getByText(/open gate/i));
        expect(toggleClose).toHaveBeenCalled();
    })
})