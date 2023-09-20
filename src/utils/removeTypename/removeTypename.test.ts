import { describe, test, expect } from 'vitest';
import { removeTypename } from './removeTypename';

describe('removeTypename', () => {
    test('should remove __typename prop from object and its nested objects and arrays', () => {
        const initialObject = {
            __typename: 'initialObject',
            prop: 'prop',
            someArray: [{
                __typename: 'item',
                item: 'item'
            }, {
                __typename: 'item2',
                item: 'item2',
                nestedObject: {
                    __typename: 'nestedObject',
                    prop: 'prop',
                }
            }],
            nestedObject1: {
                __typename: 'nestedObject1',
                prop: 'prop',
                nestedObject2: {
                    __typename: 'nestedObject2',
                    prop: 'prop',
                }
            }
        }
        const result = {
            prop: 'prop',
            someArray: [{
                item: 'item'
            }, {

                item: 'item2',
                nestedObject: {
                    prop: 'prop',
                }
            }],
            nestedObject1: {
                prop: 'prop',
                nestedObject2: {
                    prop: 'prop',
                }
            }
        }
        expect(removeTypename(initialObject)).toEqual(result)
    });
});