import { describe, expect, it } from 'vitest'
import { cn } from '../../src/lib/utils'

describe('@templ/ui > utils', () => {
  it('should return a string of concatenated class names when given valid class names as inputs', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).to.be.a('string')
    expect(result).to.equal('class1 class2 class3')
  })
  it('should return an empty string when given no inputs', () => {
    const result = cn()
    expect(result).to.be.a('string')
    expect(result).to.equal('')
  })
  it('should return a string of concatenated class names when given a single valid class name as input', () => {
    const result = cn('class1')
    expect(result).to.be.a('string')
    expect(result).to.equal('class1')
  })
  it('should throw an error when given invalid class names as inputs', () => {
    expect(() => cn('invalid-class')).to.throw(Error)
  })
  it('should return a string of concatenated class names when given nested arrays of invalid class names as inputs', () => {
    const result = cn(['invalid-class1', 'invalid-class2'], ['invalid-class3'])
    expect(result).to.be.a('string')
    expect(result).to.equal('invalid-class1 invalid-class2 invalid-class3')
  })
  it('should return a string of concatenated class names when given an object with keys as class names and values as non-boolean values as inputs', () => {
    const result = cn({ class1: 'value1', class2: 'value2' })
    expect(result).to.be.a('string')
    expect(result).to.equal('class1 class2')
  })
})