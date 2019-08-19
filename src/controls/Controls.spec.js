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
    // it('cannot be closed or opened when locked', () => {
    //     const { getByText } = render(<Controls />);

    //     // fireEvent.click(getByText(/lock gate/i));
    //     expect(getByText(/Lock Gate/i).closest('button')).toHaveAttribute('disabled');
    // })
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