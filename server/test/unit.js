'use strict'

const { createUpdatedField } = require('../util/util.js')
const assert = require('assert')

const Log = require('log')
const log = new Log('info')

//Our parent block
describe('util', () => {
	/*
	 * Test createUpdatedField
	 */
	describe('Test createUpdatedField', () => {
		it('it should return a document with a property called updated', async () => {
			const oldDoc = {
				prcName: 'Birthright of Albany',
			}
			const newDoc = {
				prcName: 'Birthright of Albany 2',
			}
			const actual = createUpdatedField('userId', oldDoc, newDoc)
			const expected = {
				prcName: 'Birthright of Albany 2',
				updated: {
					prcName: {
						userId: 'userId',
						date: '2018-12-28T22:54:29.118Z', // date will change
					},
				},
			}
			assert.equal(actual.prcName, expected.prcName)
			assert.equal(
				actual.updated.prcName.userId,
				expected.updated.prcName.userId,
			)
			assert(actual.updated.prcName.date)
		})
	})
})
