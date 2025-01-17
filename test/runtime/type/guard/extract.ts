import { TypeGuard } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Assert } from '../../assert/index'

describe('type/guard/TExtract', () => {
  it('Should extract string from number', () => {
    const T = Type.Extract(Type.String(), Type.Number())
    Assert.isEqual(TypeGuard.TNever(T), true)
  })
  it('Should extract string from string', () => {
    const T = Type.Extract(Type.String(), Type.String())
    Assert.isEqual(TypeGuard.TString(T), true)
  })
  it('Should extract string | number | boolean from string', () => {
    const T = Type.Extract(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), Type.String())
    Assert.isEqual(TypeGuard.TString(T), true)
  })
  it('Should extract string | number | boolean from string | boolean', () => {
    const T = Type.Extract(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), Type.Union([Type.String(), Type.Boolean()]))
    Assert.isEqual(TypeGuard.TUnion(T), true)
    Assert.isEqual(TypeGuard.TString(T.anyOf[0]), true)
    Assert.isEqual(TypeGuard.TBoolean(T.anyOf[1]), true)
  })
  // ------------------------------------------------------------------------
  // TemplateLiteral | TemplateLiteral
  // ------------------------------------------------------------------------
  it('Should extract TemplateLiteral | TemplateLiteral 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[1].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[2].const), true)
  })
  it('Should extract TemplateLiteral | TemplateLiteral 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[1].const), true)
  })
  it('Should extract TemplateLiteral | TemplateLiteral 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A'].includes(T.const), true)
  })
  // ------------------------------------------------------------------------
  // TemplateLiteral | Union 1
  // ------------------------------------------------------------------------
  it('Should extract TemplateLiteral | Union 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[1].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[2].const), true)
  })
  it('Should extract TemplateLiteral | Union 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.Union([Type.Literal('A'), Type.Literal('B')])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[1].const), true)
  })
  it('Should extract TemplateLiteral | Union 1', () => {
    const A = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const B = Type.Union([Type.Literal('A')])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A'].includes(T.const), true)
  })
  // ------------------------------------------------------------------------
  // Union | TemplateLiteral 1
  // ------------------------------------------------------------------------
  it('Should extract Union | TemplateLiteral 1', () => {
    const A = Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[1].const), true)
    Assert.isEqual(['A', 'B', 'C'].includes(T.anyOf[2].const), true)
  })
  it('Should extract Union | TemplateLiteral 1', () => {
    const A = Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A'), Type.Literal('B')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[0].const), true)
    Assert.isEqual(['A', 'B'].includes(T.anyOf[1].const), true)
  })
  it('Should extract Union | TemplateLiteral 1', () => {
    const A = Type.Union([Type.Literal('A'), Type.Literal('B'), Type.Literal('C')])
    const B = Type.TemplateLiteral([Type.Union([Type.Literal('A')])])
    const T = Type.Extract(A, B)
    Assert.isEqual(['A'].includes(T.const), true)
  })
})
